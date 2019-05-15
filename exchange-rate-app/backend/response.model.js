const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
let RespSchema = new Schema({
  currency: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 3
  },
  date: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 8
  },
  buyTime: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  },
  buyPrice: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  },
  sellTime: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  },
  sellPrice: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  },
  profit: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 4
  }
});

const respSchema = mongoose.model("RespSchema", RespSchema);

module.exports.respSchema = respSchema;
