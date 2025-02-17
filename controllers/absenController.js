const { TTADATTENDANCETEMP, EmployeeView, Sequelize } = require("../models");
const moment = require("moment");
const fs = require("fs");
const csvParser = require("csv-parser");

let addAbsen = async (req, res, next) => {
  try {
    moment.locale("id");
    let countTotal = 0;
    let tempCsv = [];
    let filePath = req.file ? req.file.path : null;

    if (!filePath) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Read and process the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ separator: "," }))
        .on("data", (row) => {
          let attend_date = moment(row.checktime, "DD/MM/YYYY HH:mm:ss");
          row.attenddata = `${row.badgeno}${attend_date.format(
            "YYYYMMDDHHmmss"
          )}`;
          row.checktime = attend_date.format("YYYY/MM/DD HH:mm:ss"); // Reformat the date
          tempCsv.push(row);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // Sort tempCsv by checktime in ascending order
    tempCsv.sort((a, b) => new Date(a.checktime) - new Date(b.checktime));

    if (tempCsv.length > 0) {
      // Optimize database query by fetching all employee data for the company at once
      const employeeMap = await getEmployeeMap(req.company_id);

      // Check data in the database based on the checktime
      let checkAllData = await TTADATTENDANCETEMP.findAll({
        where: {
          company_id: req.company_id,
          attend_date: {
            [Sequelize.Op.gte]: tempCsv[0].checktime,
          },
        },
      });

      const bAttendDataSet = new Set(
        checkAllData.map((item) => item.attenddata)
      );

      // Filter out records from tempCsv that already exist in the database
      let result = tempCsv.filter(
        (item) => !bAttendDataSet.has(item.attenddata)
      );

      // If there's data to insert, process it in bulk
      if (result.length > 0) {
        let recordsToInsert = [];

        await Promise.all(
          result.map(async (row) => {
            let finalData = await createId(row, req, employeeMap);
            recordsToInsert.push(finalData);
          })
        );

        // Bulk insert all records at once
        await TTADATTENDANCETEMP.bulkCreate(recordsToInsert);
        countTotal = recordsToInsert.length;

        return res
          .status(200)
          .json({ message: "Success", inserted_date: countTotal });
      } else {
        return res.status(200).json({ message: "No new records to insert." });
      }
    } else {
      return res
        .status(400)
        .json({ message: "No data in tempCsv to process." });
    }
  } catch (error) {
    console.error("Processing Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch all employees for the company in one query and map them by badge number
let getEmployeeMap = async (companyId) => {
  const employees = await EmployeeView.findAll({
    where: { company_id: companyId },
  });

  const employeeMap = new Map();
  employees.forEach((employee) => {
    employeeMap.set(employee.emp_no, employee);
  });

  return employeeMap;
};

let createId = async (data, req, employeeMap) => {
  const finalTemp = {};

  // Fetch employee details from the map instead of querying the database
  const checkEmployee = employeeMap.get(data.badgeno);
  const remark = checkEmployee ? "" : "Employee was not registered";
  const attend_date = moment(data.checktime, "YYYY/MM/DD HH:mm:ss");

  finalTemp.attenddata = data.attenddata;
  finalTemp.machine_code = "SKF_FACEID";
  finalTemp.attendanceid = data.badgeno;
  finalTemp.attend_date = attend_date.format("YYYY-MM-DD HH:mm:ss");
  finalTemp.hour = attend_date.format("HH");
  finalTemp.minute = attend_date.format("mm");
  finalTemp.second = attend_date.format("ss");
  finalTemp.day = attend_date.format("DD");
  finalTemp.month = attend_date.format("MM");
  finalTemp.year = attend_date.format("YYYY");
  finalTemp.status = data.checktype;
  finalTemp.machineno = data.mesin;
  finalTemp.uploadstatus = 0;
  finalTemp.created_by = "Absen API";
  finalTemp.created_date = moment().format("YYYY-MM-DD HH:mm:ss");
  finalTemp.modified_by = "Absen API";
  finalTemp.modified_date = moment().format("YYYY-MM-DD HH:mm:ss");
  finalTemp.company_id = req.company_id;
  finalTemp.remark = remark;
  finalTemp.photo = null;
  finalTemp.geolocation = null;
  finalTemp.att_on = null;

  return finalTemp;
};

module.exports = { addAbsen };
