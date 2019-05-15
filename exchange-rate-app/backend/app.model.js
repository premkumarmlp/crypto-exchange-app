const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
let AppSchema = new Schema({
  type: "object",
  properties: {
    currency: {
      type: "string"
    },
    date: {
      type: "string"
    },
    quotes: {
      type: "array",
      items: [
        {
          type: "object",
          properties: {
            time: {
              type: "string"
            },
            price: {
              type: "string"
            }
          },
          required: ["time", "price"]
        },
        {
          type: "object",
          properties: {
            time: {
              type: "string"
            },
            price: {
              type: "string"
            }
          },
          required: ["time", "price"]
        },
        {
          type: "object",
          properties: {
            time: {
              type: "string"
            },
            price: {
              type: "string"
            }
          },
          required: ["time", "price"]
        },
        {
          type: "object",
          properties: {
            time: {
              type: "string"
            },
            price: {
              type: "string"
            }
          },
          required: ["time", "price"]
        },
        {
          type: "object",
          properties: {
            time: {
              type: "string"
            },
            price: {
              type: "string"
            }
          },
          required: ["time", "price"]
        }
      ]
    }
  },
  required: ["currency", "date", "quotes"]
});

function validateSchema(rates) {
  //console.log(rates.currency);
  const schema = {
    currency: Joi.string()
      .min(3)
      .max(3)
      .required(),
    date: Joi.string()
      .min(8)
      .max(8)
      .required(),
    quote: [
      {
        time: Joi.string()
          .min(4)
          .max(4)
          .required(),
        price: Joi.string()
          .min(4)
          .max(4)
          .required()
      }
    ]
  };

  return Joi.validate(rates, schema);
}
const exchgSchema = mongoose.model("AppSchema", AppSchema);
module.exports.validate = validateSchema;
module.exports.AppSchema = exchgSchema;
