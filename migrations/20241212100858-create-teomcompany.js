'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TEOMCOMPANies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_code: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.TEXT
      },
      nick_name: {
        type: Sequelize.TEXT
      },
      company_level: {
        type: Sequelize.TINYINT
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.TINYINT
      },
      isbase: {
        type: Sequelize.TINYINT
      },
      company_type: {
        type: Sequelize.STRING
      },
      company_logo: {
        type: Sequelize.STRING
      },
      company_address: {
        type: Sequelize.STRING
      },
      company_address2: {
        type: Sequelize.STRING
      },
      company_phone: {
        type: Sequelize.STRING
      },
      company_fax: {
        type: Sequelize.STRING
      },
      company_email: {
        type: Sequelize.STRING
      },
      company_country: {
        type: Sequelize.STRING
      },
      company_state: {
        type: Sequelize.STRING
      },
      company_zipcode: {
        type: Sequelize.STRING
      },
      taxfilenumber: {
        type: Sequelize.STRING
      },
      taxlocation_code: {
        type: Sequelize.STRING
      },
      taxcountry: {
        type: Sequelize.STRING
      },
      currency_code: {
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
      vision_en: {
        type: Sequelize.STRING
      },
      vision_id: {
        type: Sequelize.STRING
      },
      vision_my: {
        type: Sequelize.STRING
      },
      vision_th: {
        type: Sequelize.STRING
      },
      mission_en: {
        type: Sequelize.STRING
      },
      mission_id: {
        type: Sequelize.STRING
      },
      mission_my: {
        type: Sequelize.STRING
      },
      mission_th: {
        type: Sequelize.STRING
      },
      created_date: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.STRING
      },
      modified_date: {
        type: Sequelize.DATE
      },
      modified_by: {
        type: Sequelize.STRING
      },
      taxoffice: {
        type: Sequelize.STRING
      },
      gmt_id: {
        type: Sequelize.INTEGER
      },
      local_name: {
        type: Sequelize.TEXT
      },
      UEN: {
        type: Sequelize.STRING
      },
      register_no: {
        type: Sequelize.STRING
      },
      company_cover: {
        type: Sequelize.STRING
      },
      company_video: {
        type: Sequelize.STRING
      },
      bu_code: {
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
    await queryInterface.dropTable('TEOMCOMPANies');
  }
};