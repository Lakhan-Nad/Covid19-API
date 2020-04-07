const mongoose = require("mongoose");

const StateList = require("../utils/StateData");
const StatusList = require("../utils/StatusData");

const victimSchema = new mongoose.Schema(
  {
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "others",
    },
    state: {
      type: String,
      enum: StateList,
      default: "Delhi",
    },
    place: {
      type: String,
      default: "",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      index: "2dsphere",
    },
    occupation: {
      type: String,
      default: "",
    },
    testCenter: String,
    symptoms: {
      type: [String],
      default: [],
    },
    travelHistory: [
      {
        country: {
          type: String,
          default: "India",
        },
        place: {
          type: String,
          default: "",
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
      },
    ],
    status: {
      type: String,
      enum: StatusList,
      default: "affected",
    },
    reportedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Victim = mongoose.model("victim", victimSchema);

module.exports = Victim;
