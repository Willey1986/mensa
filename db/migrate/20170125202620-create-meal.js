'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Meals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATEONLY
            },
            time_of_day: {
                type: Sequelize.ENUM('M', 'A')
            },
            price_student: {
                type: Sequelize.DECIMAL(10, 2)
            },
            price_staff: {
                type: Sequelize.DECIMAL(10, 2)
            },
            price_guest: {
                type: Sequelize.DECIMAL(10, 2)
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Meals');
    }
};