'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CL_tblBu_aophcis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_code_sunfish: {
        type: Sequelize.STRING
      },
      bu_code: {
        type: Sequelize.STRING
      },
      company_code_sap: {
        type: Sequelize.STRING
      },
      pr_online: {
        type: Sequelize.INTEGER
      },
      dashboard_time: {
        type: Sequelize.INTEGER
      },
      rekimasi: {
        type: Sequelize.INTEGER
      },
      company_short_name: {
        type: Sequelize.STRING
      },
      ovt_massleave: {
        type: Sequelize.STRING
      },
      shiftcode_off: {
        type: Sequelize.STRING
      },
      absen_api: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('CL_tblBu_aophcis');
  }
};