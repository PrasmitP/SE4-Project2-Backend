module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    idcourse: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    department: {
      type: Sequelize.STRING,
    },
    courseNumber: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    hours: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    }
  }, { timestamps: false, });
  return Course;
};
