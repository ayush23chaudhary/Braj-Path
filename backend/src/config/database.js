const mongoose = require('mongoose');

/**
 * Database Connection
 * Connects to MongoDB Atlas
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`🕉️  MongoDB Connected: ${conn.connection.host}`);
    console.log(`📍 Database: ${conn.connection.name}`);
    console.log(`✨ BrajPath Backend Ready - Jai Shri Krishna! 🙏\n`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
