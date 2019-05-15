const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const app = express();
const cors = require("cors");
const Winston = require("Winston");
const apirouter = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { AppSchema, validate } = require("./app.model");

//REST API - Get all Currency Rates from Exchange
apirouter.get("/", async (req, res) => {
  const rates = await AppSchema.find().sort("currency");
  res.send(rates);
});

//REST API - Get Currency Rates from Exchange based on ID
module.exports = apirouter.get("/:id", async (req, res) => {
  await AppSchema.findById(req.params.id)
    .then(data => {
      if (!data) {
        reportStauts(err, "GetByID", "404", res);
      }
      res.send(data);
    })
    .catch(err => {
      reportStauts(err, "GetByID", "400", res);
    });
});

//REST API - Insert the Currency Rate for the particular Date & Time
apirouter.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //console.log(req.body.currency);
  const data = new AppSchema(req.body);
  data
    .save()
    .then(data => {
      reportStauts(null, "Insertion", "200", res);
    })
    .catch(err => {
      reportStauts(err, "Insertion", "400", res);
    });
});

//REST API - Update the Currency Rates in Exchange DB using ID (DB Id) as key Field
apirouter.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
  await AppSchema.findByIdAndUpdate(req.params.id, { AppSchema: req.body })
    .then(data => {
      reportStauts(null, "Updation", "200", res);
    })
    .catch(err => {
      reportStauts(err, "Updation", "400", res);
    });
});

// REST API - Delete the Currency Rates in Exchange DB using ID (DB Id) as key Field
apirouter.delete("/:id", async (req, res) => {
  const rate = await AppSchema.findByIdAndRemove(req.params.id)
    .then(data => {
      reportStauts(null, "Deletion", "200", res);
    })
    .catch(err => {
      reportStauts(err, "Deletion", "400", res);
    });
});

function reportStauts(err, operation, statusCode, res) {
  if (err) {
    Winston.error(`API ${operation} failed due to Error ${err}`);
    res.status(statusCode).json({
      data: `${operation} in Exchange Currency Api failed. Error : ${err}`
    });
  } else if (statusCode === 404) {
    Winston.info(
      `${operation} in Exchange Currency Api failed due to requested data not available in DB`
    );
    res.status(statusCode).json({
      data: `${operation} in Exchange Currency Api failed due to requested data not available in DB`
    });
  }
  Winston.info(`${operation} in Exchange Currency Api completed successfully`);
  res.status(statusCode).json({
    data: `${operation} in Exchange Currency Api completed successfully. ${statusCode}`
  });
}
module.exports = apirouter;
