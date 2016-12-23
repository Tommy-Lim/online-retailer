'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    price: DataTypes.STRING,
    location: DataTypes.STRING,
    condition: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING,
    ownerID: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return product;
};
