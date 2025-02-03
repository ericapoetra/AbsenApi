'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TTADATTENDANCETEMPs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attenddata: {
        type: Sequelize.STRING
      },
      machine_code: {
        type: Sequelize.STRING
      },
      attendanceid: {
        type: Sequelize.STRING
      },
      attend_date: {
        type: Sequelize.DATE
      },
      hour: {
        type: Sequelize.INTEGER
      },
      minute: {
        type: Sequelize.INTEGER
      },
      second: {
        type: Sequelize.INTEGER
      },
      day: {
        type: Sequelize.INTEGER
      },
      month: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      machineno: {
        type: Sequelize.STRING
      },
      uploadstatus: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.STRING
      },
      created_date: {
        type: Sequelize.DATE
      },
      modified_by: {
        type: Sequelize.STRING
      },
      modified_date: {
        type: Sequelize.DATE
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      geolocation: {
        type: Sequelize.STRING
      },
      att_on: {
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
    await queryInterface.dropTable('TTADATTENDANCETEMPs');
  }
};