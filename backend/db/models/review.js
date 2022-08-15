"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
      Review.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "reviewImage",
        },
      });
    }
  }
  Review.init(
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      review: DataTypes.STRING,
      stars: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
