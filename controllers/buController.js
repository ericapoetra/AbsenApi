let { CL_tblBu_aophcis, TEOMCOMPANY, EmployeeView } = require("../models");
let { authentication } = require("../middleware/auth");
const employeeview = require("../models/employeeview");
let { generateToken } = require("../helpers/jwt");

let getToken = async (req, res, next) => {
  try {
    let { company, npk } = req.body;

    if (!company || !npk) {
      return res.status(400).json({ message: "User Not Found" });
    }
    let getCompanyCode = await CL_tblBu_aophcis.findOne({
      where: { company_short_name: company, absen_api: 1 },
    });
    if (!getCompanyCode) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    let getCompanyId = await TEOMCOMPANY.findOne({
      where: { company_code: getCompanyCode.company_code_sunfish },
    });
    if (!getCompanyId) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    let checkUser = await EmployeeView.findOne({
      where: { Emp_no: npk, company_id: getCompanyId.company_id, status: 1 },
    });

    if (checkUser) {
      let token = generateToken({
        company_id: getCompanyId.company_id,
        emp_id: checkUser.emp_id,
      });
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      return res.status(404).json({ message: "Data Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

let checkBU = async (req, res, next) => {
  try {
    let getAllBu = await CL_tblBu_aophcis.findAll({ where: { absen_api: 1 } });
    res.status(200).json({ getAllBu });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getToken, checkBU };
