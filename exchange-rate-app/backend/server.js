const express = require("express");

const config = require("./config");
const Winston = require("Winston");
const apiRoutes = require("./exchange-rate-api");
const exchangeRoutes = require("./exchange-routes");
const env = require("dotenv");

env.load;
env.config();

const PORT = process.env.port || 5000;
const app = express();
const dburl = config.url + "/" + config.db;

app.use("/api/currency-exchange/", apiRoutes);
app.use("/api/getRates/", exchangeRoutes.router);

app.listen(PORT, function() {
  Winston.info(`Backend Server running now on Port : ${PORT}`);
});

// module.exports.dbConnection = function getDBConnection(){
//   mongoose.connect(dburl, { useNewUrlParser: true });
//   const connection = mongoose.connection;
//   connection.once("open", function() {
//     console.log("MongoDB database connection established successfully");
//   });
//   return connection;
// };
