'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmployeeViews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emp_id: {
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      middle_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      taxno: {
        type: Sequelize.STRING
      },
      geocoord: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      req_status: {
        type: Sequelize.STRING
      },
      lastreqno: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      birthplace: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      maritalstatus: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      zipcode: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      emp_no: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      is_main: {
        type: Sequelize.BOOLEAN
      },
      empcompany_status: {
        type: Sequelize.STRING
      },
      grade_code: {
        type: Sequelize.STRING
      },
      employ_code: {
        type: Sequelize.STRING
      },
      cost_code: {
        type: Sequelize.STRING
      },
      spv_parent: {
        type: Sequelize.STRING
      },
      spv_pos: {
        type: Sequelize.STRING
      },
      spv_path: {
        type: Sequelize.STRING
      },
      spv_level: {
        type: Sequelize.INTEGER
      },
      mgr_parent: {
        type: Sequelize.STRING
      },
      mgr_pos: {
        type: Sequelize.STRING
      },
      mgr_path: {
        type: Sequelize.STRING
      },
      mgr_level: {
        type: Sequelize.INTEGER
      },
      pos_parent: {
        type: Sequelize.STRING
      },
      pos_path: {
        type: Sequelize.STRING
      },
      pospath_level: {
        type: Sequelize.INTEGER
      },
      position_id: {
        type: Sequelize.INTEGER
      },
      pos_code: {
        type: Sequelize.STRING
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      pos_name_en: {
        type: Sequelize.STRING
      },
      pos_name_id: {
        type: Sequelize.STRING
      },
      pos_name_my: {
        type: Sequelize.STRING
      },
      pos_name_th: {
        type: Sequelize.STRING
      },
      jobstatuscode: {
        type: Sequelize.STRING
      },
      job_status_code: {
        type: Sequelize.STRING
      },
      pos_level: {
        type: Sequelize.INTEGER
      },
      parent_path: {
        type: Sequelize.STRING
      },
      pos_flag: {
        type: Sequelize.STRING
      },
      dept_id: {
        type: Sequelize.INTEGER
      },
      dorder: {
        type: Sequelize.INTEGER
      },
      jobtitle_code: {
        type: Sequelize.STRING
      },
      report_topos: {
        type: Sequelize.STRING
      },
      clevel: {
        type: Sequelize.INTEGER
      },
      corder: {
        type: Sequelize.INTEGER
      },
      changeflag: {
        type: Sequelize.BOOLEAN
      },
      report_postype: {
        type: Sequelize.STRING
      },
      dept_code: {
        type: Sequelize.STRING
      },
      grade_order: {
        type: Sequelize.INTEGER
      },
      grade_category: {
        type: Sequelize.STRING
      },
      worklocation_code: {
        type: Sequelize.STRING
      },
      businessarea_code: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmployeeViews');
  }
};