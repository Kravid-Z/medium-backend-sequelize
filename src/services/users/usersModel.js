export default (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          required: true,
        },
        lastName: {
            type: DataTypes.STRING,
            required: true,
        },
        email: {
          type: DataTypes.STRING,
          required: true,
        },
        imgProfile: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
    );
    User.associate = (models) =>{
        User.hasMany(models.Reviews)
    }
    return User;
  };
  