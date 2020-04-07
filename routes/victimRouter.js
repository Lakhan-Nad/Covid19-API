const express = require("express");
const Victim = require("../models/victim");

const Router = express.Router();

const stateList = require("../utils/StateData");
const statusList = require("../utils/StatusData");

const geoFunction = require("../services/geoData");
const dateFunc = require("../services/dateFunc");

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
      let nearData = await Victim.find()
        .where("coordinates")
        .near({
          center: data.coordinates,
          maxDistance: 10000,
          spherical: true,
        })
        .lean();
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
      req.body.reportedDate = Date.now() - (Date.now() % (24 * 60 * 60 * 1000));
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
      res.json({
        status: "SUCCESSFULLY_DELETED",
      });
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
    let totalCount = await Victim.count();
    let dataCount = await Victim.find(
      {
        state: { $in: allState },
        status: { $in: allStatus },
      },
      { _id: 1 }
    ).count();
    let data = await Victim.find(
      {
        state: { $in: allState },
        status: { $in: allStatus },
      },
      { updatedAt: 1, _id: 1, state: 1, status: 1, age: 1, gender: 1 },
      {
        sort: { createdAt: -1 },
        limit: count,
        skip: (page - 1 > 0 ? page - 1 : 0) * count,
      }
    ).lean();
    let result = {};
    result = {
      totalCount,
      dataCount,
      count,
      page,
      data: [],
      status: "",
    };
    for (let i = 0; i < data.length; i++) {
      result.push({
        updateAt: data[i].updatedAt,
        _id: String(data[i]._id),
        state: data[i].state,
        status: data[i].status,
        age: data[i].age,
        gender: data[i].gender,
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
    let beginDate = 0;
    let endDate = Date.now();
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate =
          req.query.endDate.getTime() -
          (req.query.endDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate =
          req.query.beginDate.getTime() -
          (req.query.beginDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (beginDate > endDate) {
      res.statusCode(400);
      res.json({
        status: "INVALID_REQUEST",
      });
    }
    let result = [];
    let data = await Victim.find(
      {
        reportedDate: {
          $gte: beginDate,
          $lte: endDate,
        },
      },
      { status: 1, _id: 0, reportedDate: 1 }
    ).lean();
    let indexing = [];
    for (let i = 0; i < data.length; i++) {
      let index = indexing.indexOf(data[i].reportedDate);
      if (index > -1) {
        result[index][data[i].status]++;
      } else {
        indexing.push(data[i].reportedDate);
        index = indexing.length - 1;
        let value = {};
        value[date] = dateFunc.formatDate(Date(data[i].reportedDate));
        for (val of statusList) {
          value[val] = 0;
        }
        value[data[i].status]++;
        result.push(value);
      }
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

Router.get("/stats/date/cumulative", async (req, res, next) => {
  try {
    let beginDate = 0;
    let endDate = Date.now();
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate =
          req.query.endDate.getTime() -
          (req.query.endDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate =
          req.query.beginDate.getTime() -
          (req.query.beginDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (beginDate > endDate) {
      res.statusCode(400);
      res.json({
        status: "INVALID_REQUEST",
      });
    }
    let result = [];
    let data = await Victim.find(
      {
        reportedDate: {
          $lte: endDate,
        },
      },
      { status: 1, _id: 0, reportedDate: 1 },
      {
        sort: { reportedDate: 1 },
      }
    ).lean();
    let extra = {};
    for (val of statusList) {
      extra[val] = 0;
    }
    let indexing = [];
    for (let i = 0; i < data.length; i++) {
      let index = indexing.indexOf(data[i].reportedDate);
      if (index > -1) {
        result[index][data[i].status]++;
      } else {
        if (data[i].reportedDate < beginDate) {
          extra[date[i].status]++;
        }
        indexing.push(data[i].reportedDate);
        index = indexing.length - 1;
        let value = {};
        value[date] = dateFunc.formatDate(Date(data[i].reportedDate));
        for (val of statusList) {
          value[val] = 0;
        }
        value[data[i].status]++;
        result.push(value);
      }
    }
    if (result.length > 0) {
      for (val of statusList) {
        result[0][val] += extra[val];
      }
    }
    for (let i = 1; i < result.length; i++) {
      for (val of statusList) {
        result[i][val] += result[i - 1][val];
      }
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

Router.get("/stats/state/cumulative", async (req, res, next) => {
  try {
    let beginDate = 0;
    let endDate = Date.now();
    if (req.query.endDate) {
      req.query.endDate = new Date(req.query.endDate);
      if (req.query.endDate.getDay() == req.query.endDate.getDay())
        endDate =
          req.query.endDate.getTime() -
          (req.query.endDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (req.query.beginDate) {
      req.query.beginDate = new Date(req.query.beginDate);
      if (req.query.beginDate.getDay() == req.query.beginDate.getDay())
        beginDate =
          req.query.beginDate.getTime() -
          (req.query.beginDate.getTime() % (24 * 60 * 60 * 1000));
    }
    if (beginDate > endDate) {
      res.statusCode(400);
      res.json({
        status: "INVALID_REQUEST",
      });
    }
    let result = [];
    let data = await Victim.find(
      {
        reportedDate: {
          $gte: beginDate,
          $lte: endDate,
        },
      },
      { status: 1, _id: 0, state: 1 },
      {
        sort: { reportedDate: 1 },
      }
    ).lean();
    for (let st of stateList) {
      let obj = {};
      obj.state = st;
      for (val of statusList) {
        obj[val] = 0;
      }
      result.push(obj);
    }
    for (let i = 0; i < data.length; i++) {
      let index = stateList.indexOf(data[i].state);
      result[index][data[i].status]++;
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

module.exports = Router;
