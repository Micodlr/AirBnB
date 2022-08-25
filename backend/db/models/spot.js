"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { as: "Owner", foreignKey: "ownerId" });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Review, { foreignKey: "spotId" });
      Spot.hasMany(models.Image, {
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "spotImage",
        },
      });
    }
    //  BlogPost.hasMany(models.Image, {
    //     foreignKey: "imageableId",
    //     constraints: false,
    //     scope: {
    //       imageableType: "BlogPost",
    //     },
    //   });
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      previewImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Spot",
      scopes: {
        update: {
          attributes: {
            exclude: ["previewImage"],
          },
        },
      },
    }
  );
  return Spot;
};
