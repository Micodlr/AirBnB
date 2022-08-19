"use strict";
const { Model } = require("sequelize");
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageableType)}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      Image.belongsTo(models.User, { foreignKey: "userId" });
      Image.belongsTo(models.Review, {
        foreignKey: "imageableId",
        constraints: false,
      });
      Image.belongsTo(models.Spot, {
        foreignKey: "imageableId",
        constraints: false,
      });
    }
  }
  Image.init(
    {
      userId: DataTypes.INTEGER,
      imageableType: DataTypes.STRING,
      imageableId: DataTypes.INTEGER,
      url: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Image",
      defaultScope: {
        attributes: {
          exclude: ["userId", "imageableType", "updatedAt", "createdAt"],
        },
      },
    }
  );
  // eager loading
  // Image.addHook("afterFind", (findResult) => {
  //   if (!Array.isArray(findResult)) findResult = [findResult];
  //   for (const instance of findResult) {
  //     if (
  //       instance.imageableType === "reviewImage" &&
  //       instance.image !== undefined
  //     ) {
  //       instance.imageable = instance.reviewImage;
  //     } else if (
  //       instance.imageableType === "spotImage" &&
  //       instance.image !== undefined
  //     ) {
  //       instance.imageable = instance.spotImage;
  //     }
  //     // To prevent mistakes:
  //     delete instance.reviewImage;
  //     delete instance.dataValues.reviewImage;
  //     delete instance.spotImage;
  //     delete instance.dataValues.spotImage;
  //   }
  // });

  return Image;
};
