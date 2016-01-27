var Sequelize = require("sequelize");
var buildMap = require("../test/buildMap.js").buildMap;

var sequelize = null;
// if (process.env.DATABASE_URL) {
//   //For future deployment on heroku
//   sequelize = new Sequelize(process.env.DATABASE_URL);
// } else {
//   //If the application is executed on the local machine ... use mysql
//   sequelize = new Sequelize('trails', 'root', null);
// }

// if(process.env.CLEARDB_DATABASE_URL){
//   sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
// // } else if(process.env.DATABASE_URL){
// //   sequelize = new Sequelize(process.env.DATABASE_URL);
// } else {
//   // the application is executed on the local machine ... use mysql
//   sequelize = new Sequelize("trails", "root", "");
// }

var sequelize = new Sequelize(
  "cuatro_tacos",
  "cuatrotacos",
  "1Qaz2wsx3edc", {
    "host": "mysqlcluster6.registeredsite.com",
    "port": "3306"
  }
)


var User = sequelize.define("user", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

var Map = sequelize.define("map", {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  user_id: Sequelize.INTEGER
}, {
  timestamps: false
});

var Location = sequelize.define("location", {
  name: Sequelize.STRING,
  lat: Sequelize.FLOAT(53),
  lon: Sequelize.FLOAT(53),
  map_id: Sequelize.INTEGER
}, {
  timestamps: false
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
}, {
  timestamps: false
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

Map.hasMany(Progress, {
  foreignKey: 'map_id'
});

Progress.belongsTo(Map, {
  foreignKey: 'map_id'
});

User.sync().then(function(){
  Map.sync().then(function(){
    Location.sync().then(function(){
      Progress.sync().then(function(){
        buildMap();
      });
    });
  });
});

exports.User = User;
exports.Map = Map;
exports.Location = Location;
exports.Progress = Progress;
exports.sequelize = sequelize;
