let { TTADATTENDANCETEMP, EmployeeView } = require("../models");
let moment = require("moment");
const fs = require("fs"); // Use fs.promises for async file operations
const csvParser = require("csv-parser");

let addAbsen = async (req, res, next) => {
  try {
    let results = [];
    let filePath = null;
    let ip;

    if (req.file) {
      filePath = req.file.path;
    }

    ip = req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0]
      : req.connection.remoteAddress || req.socket.remoteAddress;

    if (filePath) {
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser({ separator: "," }))
          .on("data", (data) => results.push(data))
          .on("end", resolve)
          .on("error", reject);
      });
    } else {
      results.push(req.body) || [];
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "No data to process" });
    }

    let data = await createId(results, req);

    const employeeRecords = await EmployeeView.findAll({
      where: { company_id: req.company_id },
    });

    const employeeMap = employeeRecords.reduce((acc, employee) => {
      acc[employee.emp_no] = employee;
      return acc;
    }, {});

    const promises = data.map((item) => {
      let checkEmployee = employeeMap[item.attendanceid];
      let remark = checkEmployee ? "" : "Employee was not registered";
      item.remark = remark;

      return TTADATTENDANCETEMP.findOrCreate({
        where: { attenddata: item.attenddata },
        defaults: {
          attenddata: item.attenddata,
          machine_code: item.machine_code,
          attendanceid: item.attendanceid,
          status: item.status,
          company_id: req.company_id,
          remark: item.remark,
        },
      }).catch((error) => {
        console.error("DB Insert Error:", error);
      });
    });

    res.status(200).json({ message: "Data processed successfully", data });
  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ message: error.message });
  }
};

let createId = async (data, req) => {
  let final = [];

  for (let i = 0; i < data.length; i++) {
    moment.locale("id");
    let finalTemp = {};

    data[i] = cleanObjectKeys(data[i]);

    const checkEmployee = await EmployeeView.findOne({
      where: { emp_no: data[i].badgeno, company_id: req.company_id },
    });

    let remark = "";

    if (!checkEmployee) {
      remark = "Employee was not registered";
    }

    const attend_date = data[i].checktime;
    const date = attend_date.split(" ")[0].split("/")[0];
    const month = attend_date.split(" ")[0].split("/")[1];
    const year = attend_date.split(" ")[0].split("/")[2];
    const hour = attend_date.split(" ")[1].split(":")[0];
    const minute = attend_date.split(" ")[1].split(":")[1];
    const second = attend_date.split(" ")[1].split(":")[2];

    const generatedId = `${data[i].badgeno}${year}${month}${date}${hour}${minute}${second}`;

    finalTemp.attenddata = generatedId;
    finalTemp.machine_code = data[i].sensor_id;
    finalTemp.attendanceid = data[i].badgeno;
    finalTemp.attend_date = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    finalTemp.hour = hour;
    finalTemp.minute = minute;
    finalTemp.second = second;
    finalTemp.day = date;
    finalTemp.month = month;
    finalTemp.year = year;
    finalTemp.status = data[i].checktype;
    finalTemp.machineno = data[i].sensor_id;
    finalTemp.uploadstatus = 1;
    finalTemp.created_by = "Absen API";
    finalTemp.created_date = moment()
      .locale("id")
      .format("YYYY-MM-DD hh:mm:ss");
    finalTemp.modified_by = "Absen API";
    finalTemp.modified_date = moment()
      .locale("id")
      .format("YYYY-MM-DD hh:mm:ss");
    finalTemp.company_id = req.company_id;
    finalTemp.remark = remark;
    finalTemp.photo = null;
    finalTemp.geolocation = null;
    finalTemp.att_in = null;

    final.push(finalTemp);
  }

  return final;
};

const cleanObjectKeys = (obj) => {
  const cleanedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const cleanedKey = key.replace(/^\ufeff/, "");
      cleanedObj[cleanedKey] = obj[key];
    }
  }
  return cleanedObj;
};

module.exports = { addAbsen };
