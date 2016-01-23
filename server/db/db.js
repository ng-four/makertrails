var Sequelize = require("sequelize");

var sequelize = null;
if (process.env.DATABASE_URL) {
  //For future deployment on heroku
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  //If the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('trails', 'root', null);
}

var User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

var Map = sequelize.define("map", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

var Location = sequelize.define("location", {
  name: Sequelize.STRING,
  lat: Sequelize.FLOAT(53),
  long: Sequelize.FLOAT(53)
});

var Progress = sequelize.define("location", {
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

// User has many Maps, Map has one User
Map.belongsTo(User, {
  foreignKey: user_id
});

User.hasMany(Map, {
  foreignKey: user_id
});

//Map has many Locations, Location has one Map
Map.hasMany(Location, {
  foreignKey: map_id
});

Location.belongsTo(Map, {
  foreignKey: map_id
});

Location.belongsToMany(User, {
  through: {
    model: Progress
  }
});

User.belongsToMany(Location, {
  through: {
    model: Progress
  },
  scope: {} //what is scope??
});

User.sync();
Map.sync();
Location.sync();
Progress.sync();

exports.User = User;
exports.Map = Map;
exports.Location = Location;
exports.Progress = Progress;
exports.sequelize = sequelize;
