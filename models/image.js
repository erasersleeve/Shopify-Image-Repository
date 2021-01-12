


// Creating our Image model
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    // The email cannot be null, and must be a proper email before creation
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    tag: {
      type: DataTypes.STRING

    }

  });


  return Image;
};
