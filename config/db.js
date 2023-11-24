const mongoose = require('mongoose');
const config = require('../config/config');

//Models
const models = require('../models/models');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

function connectDB() {
  return new Promise((resolve, reject) => {
    const mongoURL = `${config.server.DB_URL}`
    mongoose
      .connect(mongoURL, mongoOptions)
      .then(async(conn) => {
        console.log('connected')
        resolve(conn)
      })
      .catch((error) => reject(error))
  })
};

// Switch database connection
const switchDB = async (dbName) => {
  let DB = {};
  const mongoose = await connectDB()
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, { useCache: true });
    for (const i in models) {
      models[i].forEach((schema, modelName) => {
            DB[i] = db.model(modelName, schema)
          });
    };
    return DB
  };
  throw new Error('err')
};

// Default database
let dbInstance={}
async function init() {
  try {
    dbInstance = await switchDB(config.server.default_db_name);
  } catch (error) {
    console.error('Error during initialization database:', error);
  }
};

// Call the async function to initiate the connection and switching process
init();

// Export a function to retrieve the dbInstance when needed
const getDBInstance = () => {
  return dbInstance;
};

module.exports = {
  connectDB,
  switchDB,
  getDBInstance
};

