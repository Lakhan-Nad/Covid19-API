const express = require("express");
const Victim = require("../models/victim");

const Router = express.Router();

const stateList = require("../utils/StateData");
const statusList = require("../utils/StatusData");

const geoFunction = require("../services/geoData");

let change = true;
let overallCount = {};

Router.param("vid", async (req, res, next, vid) => {
  try {
    let data = await Victim.findById(vid, { _id: 1 });
    if (data) {
      next();
    } else {
      res.status(400);
      res.json({
        message: "Invalid victim id.",
        status: "INVALID_REQUEST",
      });
    }
  } catch (err) {
    next(err);
  }
});

Router.get("/:vid", async (req, res, next) => {
  try {
    let data = await Victim.findById(req.params.vid, {
      _v: 0,
      reportedDate: 0,
    }).lean();
    if (data) {
      let nearData = await Victim.find({
        coordinates: {
          $near: {
            $maxDistance: 50000,
            $geometry: {
              coordinates: data.coordinates,
            },
          },
        },
      });
      nearCount = {};
      for (let val of statusList) {
        nearCount[val] = 0;
      }
      for (let i = 0; i < nearData.length; i++) {
        nearCount[nearData[i].status]++;
      }
      nearCount[data.status]--;
      data.nearData = nearCount;
      res.status(200);
      res.json({ data: data, status: "OK" });
    }
  } catch (err) {
    next(err);
  }
});

Router.post("/:vid", async (req, res, next) => {
  try {
    change = true;
    delete req.body.coordinates;
    delete req.body.reportedDate;
    let lastStatus = await Victim.findById(req.params.vid, {
      _id: 0,
      status: 1,
    });
    if (req.body.status && req.body.status != lastStatus) {
      req.body.reportedDate = Date.now();
    }
    if (req.body.place || req.body.state) {
      let geoData = await geoFunction(req.body.place, req.body.state);
      req.body.state = geoData.state;
      req.body.place = geoData.place;
      req.body.coordinates = [geoData.lng, geoData.lat];
    }
    let data = await Victim.findByIdAndUpdate(req.params.vid, req.body, {
      new: true,
    }).lean();
    if (data) {
      res.status(200);
      res.json({
        data: data,
        status: "SUCCESSFULLY_UPDATED",
      });
    }
  } catch (err) {
    next(err);
  }
});

Router.delete("/:vid", async (req, res, next) => {
  try {
    change = true;
    let result = await Victim.findByIdAndDelete(req.params.vid).lean();
    if (result) {
      res.status(204);
      res.send();
    }
  } catch (err) {
    next(err);
  }
});

Router.post("/", async (req, res, next) => {
  try {
    change = true;
    delete req.body.reportedDate;
    let data = new Victim(req.body);
    let geoData = await geoFunction(data.place, data.state);
    data.state = geoData.state;
    data.place = geoData.place;
    data.coordinates = [geoData.lng, geoData.lat];
    await data.save();
    if (data) {
      res.status(201);
      res.json({
        _id: String(data._id),
        status: "SUCCESSFULLY_INSERTED",
      });
    }
  } catch (err) {
    next(err);
  }
});

Router.get("/", async (req, res, next) => {
  try {
    let allState = stateList;
    let allStatus = statusList;
    let count = 10,
      page = 1;
    if (req.query.page && Number(req.body.page) == Number(req.body.page))
      page = req.query.page;
    if (req.query.count && Number(req.body.count) == Number(req.body.count))
      count = req.query.count;
    if (req.query.state && stateList.includes(req.query.state))
      allState = new Array(req.query.state);
    if (req.query.status && statusList.includes(req.query.status))
      allStatus = new Array(req.query.status);
    let totalCount = await Victim.countDocuments();
    let dataCount = await Victim.find(
      {
        state: { $in: allState },
        status: { $in: allStatus },
      },
      { _id: 1 }
    ).countDocuments();
    let data = await Victim.find(
      {
        state: { $in: allState },
        status: { $in: allStatus },
      },
      { updatedAt: 1, _id: 1, state: 1, status: 1 },
      {
        sort: { createdAt: -1 },
        limit: count,
        skip: (page - 1 > 0 ? page - 1 : 0) * count,
      }
    ).lean();
    let result = {
      totalCount,
      dataCount,
      count,
      page,
      data: [],
      status: "",
    };
    for (let i = 0; i < data.length; i++) {
      result.data.push({
        updatedAt: data[i].updatedAt,
        _id: String(data[i]._id),
        state: data[i].state,
        status: data[i].status,
      });
    }
    res.status(200);
    result.status = data.length > 0 ? "OK" : "ZERO_RESULT";
    res.json(result);
  } catch (err) {
    next(err);
  }
});

Router.get("/stats/date", async (req, res, next) => {
  try {
    let allState = stateList;
    let beginDate = new Date(0);
    let endDate = new Date(Date.now());
    if (req.query.state && stateList.includes(req.query.state)) {
      allState = [req.query.state];
    }
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate = req.query.endDate;
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate = req.query.beginDate;
    }
    let result = await Victim.aggregate()
      .match({
        reportedDate: {
          $gte: beginDate,
          $lte: endDate,
        },
        state: { $in: allState },
      })
      .group({
        _id: "$reportedDate",
        active: {
          $sum: {
            $cond: { if: { $in: ["$status", ["active"]] }, then: 1, else: 0 },
          },
        },
        recovered: {
          $sum: {
            $cond: {
              if: { $in: ["$status", ["recovered"]] },
              then: 1,
              else: 0,
            },
          },
        },
        died: {
          $sum: {
            $cond: { if: { $in: ["$status", ["died"]] }, then: 1, else: 0 },
          },
        },
      })
      .project({
        _id: 0,
        date: "$_id",
        active: 1,
        recovered: 1,
        died: 1,
      });
    res.status(200);
    res.json({
      data: result,
      status: result.length > 0 ? "OK" : "ZERO_RESULT",
    });
  } catch (err) {
    next(err);
  }
});

Router.get("/stats/date/cumulative", async (req, res, next) => {
  try {
    let allState = stateList;
    let beginDate = new Date(0);
    let endDate = new Date(Date.now());
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate = req.query.endDate;
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate = req.query.beginDate;
    }
    if (req.query.state && stateList.includes(req.query.state)) {
      allState = [req.query.state];
    }
    let result = await Victim.aggregate()
      .match({
        reportedDate: {
          $lte: endDate,
        },
        state: { $in: allState },
      })
      .sort({ reportedDate: 1 })
      .group({
        _id: "$reportedDate",
        active: {
          $sum: {
            $cond: { if: { $in: ["$status", ["active"]] }, then: 1, else: 0 },
          },
        },
        recovered: {
          $sum: {
            $cond: {
              if: { $in: ["$status", ["recovered"]] },
              then: 1,
              else: 0,
            },
          },
        },
        died: {
          $sum: {
            $cond: { if: { $in: ["$status", ["died"]] }, then: 1, else: 0 },
          },
        },
      })
      .group({
        _id: 0,
        dates: { $push: "$_id" },
        atotals: { $push: "$active" },
        rtotals: { $push: "$recovered" },
        dtotals: { $push: "$died" },
      })
      .unwind({
        path: "$dates",
        includeArrayIndex: "index",
      })
      .project({
        date: "$dates",
        active: { $sum: { $slice: ["$atotals", { $add: ["$index", 1] }] } },
        recovered: { $sum: { $slice: ["$rtotals", { $add: ["$index", 1] }] } },
        died: { $sum: { $slice: ["$dtotals", { $add: ["$index", 1] }] } },
      })
      .match({
        date: { $gte: beginDate },
      });
    res.status(200);
    res.json({
      data: result,
      status: result.length > 0 ? "OK" : "ZERO_RESULT",
    });
  } catch (err) {
    next(err);
  }
});

Router.get("/stats/state/cumulative", async (req, res, next) => {
  try {
    let beginDate = new Date(0);
    let endDate = new Date(Date.now());
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate = req.query.endDate;
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate = req.query.beginDate;
    }
    let data = await Victim.aggregate()
      .match({
        reportedDate: {
          $lte: endDate,
        },
      })
      .group({
        _id: "$state",
        active: {
          $sum: {
            $cond: { if: { $in: ["$status", ["active"]] }, then: 1, else: 0 },
          },
        },
        recovered: {
          $sum: {
            $cond: {
              if: { $in: ["$status", ["recovered"]] },
              then: 1,
              else: 0,
            },
          },
        },
        died: {
          $sum: {
            $cond: { if: { $in: ["$status", ["died"]] }, then: 1, else: 0 },
          },
        },
      });
    let result = [];
    for (val of stateList) {
      let temp = {};
      temp.state = val;
      temp.active = 0;
      temp.recovered = 0;
      temp.died = 0;
      result.push(temp);
    }
    for (x of data) {
      let index = stateList.indexOf(x._id);
      result[index].active = x.active;
      result[index].recovered = x.recovered;
      result[index].died = x.died;
    }
    res.status(200);
    res.json({
      data: result,
      status: result.length > 0 ? "OK" : "ZERO_RESULT",
    });
  } catch (err) {
    next(err);
  }
});

Router.get("/stats/total", async (req, res, next) => {
  try {
    if (change) {
      change = false;
      for (val of statusList) {
        overallCount[val] = 0;
      }
      let data = await Victim.find({}, { status: 1 }).lean();
      for (let i = 0; i < data.length; i++) {
        overallCount[data[i].status]++;
      }
    }
    res.json({ data: overallCount, status: "OK" });
  } catch (err) {}
});

Router.get("/stats/map", async (req, res, next) => {
  try {
    let result = await Victim.aggregate().project({
      _id: 0,
      status: 1,
      lng: { $arrayElemAt: ["$coordinates", 0] },
      lat: { $arrayElemAt: ["$coordinates", 1] },
    });
    res.json({
      data: result,
      status: "OK",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
