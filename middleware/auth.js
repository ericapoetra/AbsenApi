const { verifyToken } = require("../helpers/jwt");
const { CL_tblBu_aophcis, TEOMCOMPANY, EmployeeView } = require("../models");

let authentication = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({ message: "Invalid Token" });
  }
  try {
    if (token) {
      let checkToken = verifyToken(token);
      let checkUser = await EmployeeView.findOne({
        where: { company_id: checkToken.company_id, emp_id: checkToken.emp_id },
      });
      if (checkUser) {
        req.company_id = checkToken.company_id;

        next();
      } else {
        return res.status(404).json({ message: "User Not Found" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authentication;
