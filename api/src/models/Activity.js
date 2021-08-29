const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // return sequelize.define('activity', { // si no hago un return aca, va a ser undefined
    sequelize.define('Activity', {
        name: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        }, 
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM('summer', 'fall', 'winter', 'spring')
        }
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
      }
    // {
    //     timestamps: false
    // }
    )
}