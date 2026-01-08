/**
 * BRAJPATH TRIP PLANNING ALGORITHM
 * 
 * This is a rule-based intelligent trip planner that:
 * 1. Filters places based on user priorities
 * 2. Groups places by proximity
 * 3. Optimizes daily schedules
 * 4. Ensures budget compliance
 * 5. Considers visit times and crowd levels
 * 
 * Algorithm Flow:
 * - Input validation
 * - Priority-based place filtering
 * - Distance-based clustering
 * - Time slot allocation
 * - Budget validation and adjustment
 * - Itinerary generation
 */

const Place = require('../models/Place');
const Hotel = require('../models/Hotel');
const TransportPrice = require('../models/TransportPrice');

class TripPlannerAlgorithm {
  constructor() {
    // Time constants (in minutes)
    this.DAILY_START_TIME = 6 * 60; // 6:00 AM
    this.DAILY_END_TIME = 21 * 60; // 9:00 PM
    this.MEAL_BREAK_DURATION = 60; // 1 hour
    this.LUNCH_TIME = 13 * 60; // 1:00 PM
    this.BUFFER_TIME = 30; // 30 minutes buffer between places
    
    // Cost constants (INR)
    this.DAILY_FOOD_COST = {
      budget: 300,
      mid: 600,
      premium: 1000
    };
    this.TRANSPORT_BASE_COST_PER_KM = 15;
  }

  /**
   * Main trip planning function
   * @param {Object} params - Trip parameters
   * @returns {Object} - Complete trip itinerary
   */
  async planTrip(params) {
    const {
      numberOfDays,
      budget,
      priority, // 'temples', 'leisure', 'spiritual', 'mixed'
      groupType, // 'solo', 'family', 'elderly', 'group'
      startDate,
      city = 'Vrindavan'
    } = params;

    try {
      // Step 1: Validate inputs
      this.validateInputs(params);

      // Step 2: Fetch and filter places based on priority
      const filteredPlaces = await this.filterPlacesByPriority(priority, city, groupType);

      // Step 3: Score and rank places
      const rankedPlaces = this.rankPlaces(filteredPlaces, priority, groupType);

      // Step 4: Group places by proximity (clustering)
      const clusteredPlaces = await this.clusterPlacesByProximity(rankedPlaces, numberOfDays);

      // Step 5: Generate day-wise itinerary
      const itinerary = await this.generateItinerary(
        clusteredPlaces,
        numberOfDays,
        groupType,
        startDate
      );

      // Step 6: Find suitable accommodation
      const accommodations = await this.findAccommodation(
        budget,
        numberOfDays,
        city,
        groupType
      );

      // Step 7: Calculate costs and optimize
      const costBreakdown = await this.calculateTotalCost(
        itinerary,
        accommodations,
        numberOfDays,
        groupType
      );

      // Step 8: Budget validation and adjustment
      const finalItinerary = await this.validateAndAdjustBudget(
        itinerary,
        accommodations,
        costBreakdown,
        budget,
        numberOfDays
      );

      // Step 9: Add tips and recommendations
      const enrichedItinerary = this.addTipsAndRecommendations(
        finalItinerary,
        groupType
      );

      return {
        success: true,
        itinerary: enrichedItinerary,
        totalCost: costBreakdown.total,
        budgetUtilization: Math.round((costBreakdown.total / budget) * 100),
        metadata: {
          totalPlaces: finalItinerary.reduce((sum, day) => sum + day.places.length, 0),
          averageRating: this.calculateAverageRating(filteredPlaces),
          mustVisitCount: rankedPlaces.filter(p => p.priorityScore >= 8).length
        }
      };
    } catch (error) {
      throw new Error(`Trip planning failed: ${error.message}`);
    }
  }

  /**
   * Validate input parameters
   */
  validateInputs(params) {
    const { numberOfDays, budget, priority, groupType } = params;

    if (!numberOfDays || numberOfDays < 1 || numberOfDays > 30) {
      throw new Error('Number of days must be between 1 and 30');
    }

    if (!budget || budget < 1000) {
      throw new Error('Budget must be at least ₹1000');
    }

    const validPriorities = ['temples', 'leisure', 'spiritual', 'mixed'];
    if (!validPriorities.includes(priority)) {
      throw new Error('Invalid priority. Choose from: temples, leisure, spiritual, mixed');
    }

    const validGroupTypes = ['solo', 'family', 'elderly', 'group', 'couple'];
    if (!validGroupTypes.includes(groupType)) {
      throw new Error('Invalid group type');
    }
  }

  /**
   * Filter places based on user priority
   */
  async filterPlacesByPriority(priority, city, groupType) {
    let query = { 'location.city': city };

    // Priority-based filtering
    switch (priority) {
      case 'temples':
        query.type = { $in: ['temple'] };
        query.priorityScore = { $gte: 5 };
        break;
      case 'spiritual':
        query.category = 'spiritual';
        query.priorityScore = { $gte: 4 };
        break;
      case 'leisure':
        query.type = { $in: ['garden', 'viewpoint', 'ghat'] };
        break;
      case 'mixed':
        // Include all types but prioritize higher scores
        query.priorityScore = { $gte: 3 };
        break;
    }

    // Accessibility filters for elderly
    if (groupType === 'elderly') {
      query['accessibility.elderlyFriendly'] = true;
    }

    const places = await Place.find(query)
      .sort({ priorityScore: -1, rating: -1 })
      .lean();

    return places;
  }

  /**
   * Rank places based on multiple factors
   */
  rankPlaces(places, priority, groupType) {
    return places.map(place => {
      let score = place.priorityScore * 10; // Base score

      // Boost for must-visit places
      if (place.priorityScore >= 8) {
        score += 30;
      }

      // Rating boost
      score += place.rating * 5;

      // Time efficiency boost (shorter visits get slight boost for fitting more)
      if (place.avgVisitTime <= 60) {
        score += 5;
      }

      // Group type specific scoring
      if (groupType === 'family' && place.accessibility.parking) {
        score += 10;
      }

      if (groupType === 'elderly' && place.accessibility.elderlyFriendly) {
        score += 15;
      }

      // Crowd level consideration
      if (place.crowdLevel === 'low') {
        score += 5;
      } else if (place.crowdLevel === 'high') {
        score -= 5;
      }

      return {
        ...place,
        calculatedScore: score
      };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }

  /**
   * Cluster places by proximity using simple distance-based grouping
   */
  async clusterPlacesByProximity(places, numberOfDays) {
    const clusters = [];
    const placesPerDay = Math.ceil(places.length / numberOfDays);
    
    // Start with the highest-scored place
    const visited = new Set();
    
    for (let day = 0; day < numberOfDays; day++) {
      const dayCluster = [];
      
      // Find starting place for the day (unvisited, highest score)
      let currentPlace = null;
      for (const place of places) {
        if (!visited.has(place._id.toString())) {
          currentPlace = place;
          break;
        }
      }

      if (!currentPlace) break;

      dayCluster.push(currentPlace);
      visited.add(currentPlace._id.toString());

      // Add nearby places to the same day
      while (dayCluster.length < placesPerDay) {
        const nearestPlace = this.findNearestUnvisitedPlace(
          currentPlace,
          places,
          visited
        );

        if (!nearestPlace) break;

        dayCluster.push(nearestPlace);
        visited.add(nearestPlace._id.toString());
        currentPlace = nearestPlace;
      }

      clusters.push(dayCluster);
    }

    return clusters;
  }

  /**
   * Find nearest unvisited place
   */
  findNearestUnvisitedPlace(currentPlace, allPlaces, visited) {
    let nearest = null;
    let minDistance = Infinity;

    for (const place of allPlaces) {
      if (visited.has(place._id.toString())) continue;

      const distance = this.calculateDistance(
        currentPlace.location.coordinates,
        place.location.coordinates
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = place;
      }
    }

    return nearest;
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  calculateDistance(coords1, coords2) {
    const [lon1, lat1] = coords1;
    const [lon2, lat2] = coords2;

    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
      Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Generate day-wise itinerary with time slots
   */
  async generateItinerary(clusteredPlaces, numberOfDays, groupType, startDate) {
    const itinerary = [];
    const baseDate = startDate ? new Date(startDate) : new Date();

    for (let dayIndex = 0; dayIndex < clusteredPlaces.length; dayIndex++) {
      const dayPlaces = clusteredPlaces[dayIndex];
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + dayIndex);

      let currentTime = this.DAILY_START_TIME;
      const scheduledPlaces = [];
      let dailyDistance = 0;

      for (let i = 0; i < dayPlaces.length; i++) {
        const place = dayPlaces[i];
        
        // Check if we have enough time left in the day
        const requiredTime = place.avgVisitTime + this.BUFFER_TIME;
        
        // Add lunch break around 1 PM
        if (currentTime < this.LUNCH_TIME && 
            currentTime + requiredTime > this.LUNCH_TIME) {
          currentTime = this.LUNCH_TIME + this.MEAL_BREAK_DURATION;
        }

        // Check if place fits in remaining time
        if (currentTime + requiredTime > this.DAILY_END_TIME) {
          break; // Move remaining places to next day if possible
        }

        // Calculate travel time from previous place
        let travelTime = 0;
        let travelDistance = 0;
        if (i > 0) {
          travelDistance = this.calculateDistance(
            dayPlaces[i - 1].location.coordinates,
            place.location.coordinates
          );
          travelTime = Math.ceil(travelDistance * 4); // ~4 min per km
          currentTime += travelTime;
        }

        dailyDistance += travelDistance;

        const startTime = this.formatTime(currentTime);
        currentTime += place.avgVisitTime;
        const endTime = this.formatTime(currentTime);

        scheduledPlaces.push({
          placeId: place._id,
          placeName: place.name,
          name: place.name, // alias for frontend compatibility
          description: place.description,
          visitTime: {
            start: startTime,
            end: endTime
          },
          startTime: startTime, // alias for frontend
          endTime: endTime, // alias for frontend
          duration: place.avgVisitTime,
          entryFee: place.entryFee.amount,
          notes: this.generatePlaceNotes(place, groupType),
          orderInDay: i + 1,
          location: place.location,
          city: place.location.city,
          type: place.type,
          rating: place.rating,
          images: place.images || [],
          religiousSignificance: place.religiousSignificance,
          facilities: place.facilities || [],
          accessibility: place.accessibility,
          bestTime: place.bestTime,
          crowdLevel: place.crowdLevel,
          travelTimeToNext: i < dayPlaces.length - 1 ? 
            `${Math.ceil(this.calculateDistance(place.location.coordinates, dayPlaces[i + 1].location.coordinates) * 4)} mins` : null
        });

        currentTime += this.BUFFER_TIME;
      }

      itinerary.push({
        day: dayIndex + 1,
        date: currentDate,
        places: scheduledPlaces,
        dailyDistance: Math.round(dailyDistance * 10) / 10,
        transportDetails: [],
        dailyBudget: {
          accommodation: 0,
          transport: 0,
          food: 0,
          entry: 0,
          total: 0
        }
      });
    }

    return itinerary;
  }

  /**
   * Format time in minutes to HH:MM
   */
  formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  /**
   * Generate contextual notes for places
   */
  generatePlaceNotes(place, groupType) {
    const notes = [];

    if (place.bestTime && place.bestTime !== 'anytime') {
      notes.push(`Best visited during ${place.bestTime}`);
    }

    if (place.crowdLevel === 'high') {
      notes.push('Expect crowds, arrive early');
    }

    if (groupType === 'elderly' && place.accessibility.elderlyFriendly) {
      notes.push('Elderly-friendly access available');
    }

    if (place.entryFee.amount > 0) {
      notes.push(`Entry fee: ₹${place.entryFee.amount}`);
    }

    return notes.join('. ');
  }

  /**
   * Find suitable accommodation based on budget
   */
  async findAccommodation(totalBudget, numberOfDays, city, groupType) {
    const budgetPerDay = totalBudget / numberOfDays;
    const accommodationBudget = budgetPerDay * 0.4; // 40% of daily budget

    let category;
    if (accommodationBudget < 1000) {
      category = ['budget', 'dharamshala'];
    } else if (accommodationBudget < 3000) {
      category = ['budget', 'mid'];
    } else {
      category = ['mid', 'premium'];
    }

    const hotels = await Hotel.find({
      'location.city': city,
      category: { $in: category },
      verified: true,
      'priceRange.min': { $lte: accommodationBudget * 1.2 }
    })
      .sort({ localPriceBadge: -1, rating: -1 })
      .limit(3)
      .lean();

    return hotels;
  }

  /**
   * Calculate total trip cost
   */
  async calculateTotalCost(itinerary, accommodations, numberOfDays, groupType) {
    let totalAccommodation = 0;
    let totalTransport = 0;
    let totalFood = 0;
    let totalEntry = 0;

    // Accommodation cost
    if (accommodations.length > 0) {
      const selectedHotel = accommodations[0];
      totalAccommodation = selectedHotel.priceRange.min * numberOfDays;
    }

    // Calculate costs for each day
    for (const day of itinerary) {
      // Entry fees
      const dayEntry = day.places.reduce((sum, place) => sum + (place.entryFee || 0), 0);
      totalEntry += dayEntry;
      day.dailyBudget.entry = dayEntry;

      // Transport cost (based on distance)
      const dayTransport = Math.ceil(day.dailyDistance * this.TRANSPORT_BASE_COST_PER_KM);
      totalTransport += dayTransport;
      day.dailyBudget.transport = dayTransport;

      // Food cost
      const category = accommodations.length > 0 ? accommodations[0].category : 'budget';
      const dailyFood = this.DAILY_FOOD_COST[category === 'dharamshala' ? 'budget' : category];
      totalFood += dailyFood;
      day.dailyBudget.food = dailyFood;

      // Accommodation
      if (accommodations.length > 0) {
        day.dailyBudget.accommodation = accommodations[0].priceRange.min;
        day.accommodation = {
          hotelId: accommodations[0]._id,
          hotelName: accommodations[0].name,
          estimatedCost: accommodations[0].priceRange.min
        };
      }

      day.dailyBudget.total = 
        day.dailyBudget.entry +
        day.dailyBudget.transport +
        day.dailyBudget.food +
        day.dailyBudget.accommodation;
    }

    return {
      accommodation: totalAccommodation,
      transport: totalTransport,
      food: totalFood,
      entry: totalEntry,
      miscellaneous: Math.ceil((totalAccommodation + totalTransport + totalFood + totalEntry) * 0.1),
      total: totalAccommodation + totalTransport + totalFood + totalEntry + 
             Math.ceil((totalAccommodation + totalTransport + totalFood + totalEntry) * 0.1)
    };
  }

  /**
   * Validate budget and adjust if needed
   */
  async validateAndAdjustBudget(itinerary, accommodations, costBreakdown, budget, numberOfDays) {
    // If within budget, return as is
    if (costBreakdown.total <= budget) {
      return itinerary;
    }

    // Budget exceeded - need to optimize
    const exceedPercentage = ((costBreakdown.total - budget) / budget) * 100;

    if (exceedPercentage > 50) {
      throw new Error('Budget too low for requested trip. Please increase budget or reduce days.');
    }

    // Try to reduce: Remove lower priority places, suggest budget accommodation
    const adjustedItinerary = itinerary.map(day => {
      // Keep only top priority places if over budget
      const topPlaces = day.places
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, Math.ceil(day.places.length * 0.75));

      return {
        ...day,
        places: topPlaces
      };
    });

    return adjustedItinerary;
  }

  /**
   * Add travel tips and recommendations
   */
  addTipsAndRecommendations(itinerary, groupType) {
    return itinerary.map(day => {
      const tips = [
        'Start early to avoid crowds',
        'Carry water and snacks',
        'Dress modestly for temple visits',
        'Keep prasadam pocket for temple offerings'
      ];

      if (groupType === 'elderly') {
        tips.push('Take frequent rest breaks');
        tips.push('Arrange wheelchair if needed');
      }

      if (groupType === 'family') {
        tips.push('Keep children close in crowded areas');
      }

      if (day.places.some(p => p.type === 'temple')) {
        tips.push('Remove footwear before entering temples');
        tips.push('Attend evening aarti for divine experience');
      }

      return {
        ...day,
        tips
      };
    });
  }

  /**
   * Calculate average rating of places
   */
  calculateAverageRating(places) {
    if (places.length === 0) return 0;
    const sum = places.reduce((acc, place) => acc + (place.rating || 0), 0);
    return Math.round((sum / places.length) * 10) / 10;
  }
}

module.exports = new TripPlannerAlgorithm();
