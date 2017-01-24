'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Meals', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            name: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATEONLY
            },
            time_of_day: {
                type: Sequelize.ENUM('noon', 'evening')
            },
            price_student: {
                type: Sequelize.DECIMAL(10, 2)
            },
            price_staff: {
                type: Sequelize.DECIMAL(10, 2)
            },
            price_guest: {
                type: Sequelize.DECIMAL(10, 2)
            }
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Meals');
    }
};
