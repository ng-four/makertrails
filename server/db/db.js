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
  description: Sequelize.TEXT,
  user_id: Sequelize.INTEGER
});

var Location = sequelize.define("location", {
  name: Sequelize.STRING,
  lat: Sequelize.FLOAT(53),
  long: Sequelize.FLOAT(53),
  map_id: Sequelize.INTEGER
});

var Progress = sequelize.define("progress", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  location_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER
});

// User has many Maps, Map has one User
Map.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Map, {
  foreignKey: 'user_id'
});

//Map has many Locations, Location has one Map
Map.hasMany(Location, {
  foreignKey: 'map_id'
});

Location.belongsTo(Map, {
  foreignKey: 'map_id'
});

Location.belongsToMany(User, {
  through: {
    model: Progress
  },
  foreignKey: 'location_id'
});

User.belongsToMany(Location, {
  through: {
    model: Progress
  },
  foreignKey: 'user_id'
});

User.sync().then(function(){
  Map.sync().then(function(){
    Location.sync().then(function(){
      Progress.sync();
    });
  });
});

exports.User = User;
exports.Map = Map;
exports.Location = Location;
exports.Progress = Progress;
exports.sequelize = sequelize;
