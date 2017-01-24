'use strict';
module.exports = function (sequelize, DataTypes) {
    var Meal = sequelize.define('Meal', {
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        name: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        time_of_day: DataTypes.ENUM('noon', 'evening'),
        price_student: DataTypes.DECIMAL(10, 2),
        price_staff: DataTypes.DECIMAL(10, 2),
        price_guest: DataTypes.DECIMAL(10, 2)

    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Meal;
};
