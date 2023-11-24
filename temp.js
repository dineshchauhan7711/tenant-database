
// /** Switche to db on same connection pool
//  * @return new connection
//  */
// const switchDB = async (dbName, dbSchema) => {
//   console.log('dbSchema :>> ', dbSchema);
//   const mongoose = await connectDB()
//   if (mongoose.connection.readyState === 1) {
//     const db = mongoose.connection.useDb(dbName, { useCache: true })
//     // // Prevent from schema re-registration
//     if (!Object.keys(db.models).length) {
//       dbSchema.forEach((schema, modelName) => {
//         db.model(modelName, schema)
//       })
//     }
//     return db
//   }
//   throw new Error('err')
// };


// /**
//  * @return model from mongoose
//  */
// const getDBModel = async (db, modelName) => {
//   return db.model(modelName)
// };




// ==========================================================




// const switchDB = async (dbName) => {
//   const mongoose = await connectDB()
//   if (mongoose.connection.readyState === 1) {
//     console.log("OKKKK");
//     const db = mongoose.connection.useDb(dbName, { useCache: true })
//     return db
//   }
//   throw new Error('err')
// };


// /**
//  * @return model from mongoose
//  */
// const getDBModel = async (db, dbSchema) => {
//   let model_name;
//   if (!Object.keys(db.models).length) {
//     dbSchema.forEach((schema, modelName) => {
//       model_name = modelName
//       db.model(modelName, schema)
//     });
//     return db.model(model_name)
//   }
// };


/**
 * @return model from mongoose
 */
// const getDBModel = async (db, dbSchema) => {
//     let model_name;
//     if (!Object.keys(db.models).length) {
//       dbSchema.forEach((schema, modelName) => {
//         model_name = modelName
//         db.model(modelName, schema)
//       });
//       return db.model(model_name)
//     }
//   };
  