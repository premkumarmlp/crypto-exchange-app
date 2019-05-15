const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const date = require("date-and-time");

const dbConfig = require("./config");

const respSchema = require("./response.model");

const Winston = require("Winston");

app.use(bodyParser.urlencoded({ extended: true }));

function stringToDate(bDate, format) {
  const uDate =
    bDate.substring(bDate.length, bDate.length - 2) +
    "-" +
    bDate.substring(bDate.length - 2, bDate.length - 4) +
    "-" +
    bDate.substring(bDate.length - 4, 0);
  return date.format(date.parse(uDate, "DD-MM-YYYY"), format);
}

function getProfit(sprice, bprice) {
  return (sprice - bprice).toFixed(2);
}

function throwErrorMsg(curr, bTime, date) {
  Winston.error(
    `No data available for the given currency ${curr} , time ${bTime} and Date ${date}.`
  );
  respSchema.buyTime = "Invalid Data. ";
}

router.get("/:currency/:date/:time", (req, res) => {
  let bTime = req.params.time;

  MongoClient.connect(
    dbConfig.url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) return Winston.error(`Couldn't Connect to MongoDB: ${err}`);
      Winston.info(`Connected to MongoDB :  ${dbConfig.url}`);
      const db = client.db(dbConfig.db);
      db.collection(dbConfig.collection)
        .find({ currency: req.params.currency, date: req.params.date })
        .toArray((err, docs) => {
          let buyPrice = 0;
          let buyTime = 0.0;
          let bestSellTime = 0;
          let bestSellPrice = 0.0;
          if (docs.length === 0) {
            throwErrorMsg(req.params.currency, bTime, req.params.date);
            return res.send(respSchema);
          }

          //Logic to get the Best Sell Time and Profit
          for (const quote of docs[0].quotes) {
            if (quote.time == bTime) {
              buyPrice = parseFloat(quote.price);
              buyTime = parseInt(quote.time);
              bestSellTime = parseInt(quote.time);
              bestSellPrice = parseFloat(quote.price);
            } else if (
              buyTime > 0 &&
              buyPrice > 0 &&
              parseFloat(quote.price) > bestSellPrice
            ) {
              bestSellPrice = parseFloat(quote.price);
              bestSellTime = parseInt(quote.time);
            }
          }

          client.close();

          respSchema.currency = req.params.currency;
          respSchema.date = stringToDate(req.params.date, "DD-MMM-YY");
          respSchema.buyTime = buyTime;
          respSchema.buyPrice = buyPrice;
          respSchema.sellTime = bestSellTime;
          respSchema.sellPrice = bestSellPrice;
          respSchema.profit = getProfit(bestSellPrice, buyPrice);
          res.send(respSchema);
        });
    }
  );
});

module.exports.getProfit = getProfit;
module.exports.router = router;
//module.exports = stringToDate;
