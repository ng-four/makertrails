var _ = require("underscore");

exports.formatProgress = function(locations, progresses) {
  for (var i=0; i < locations.length; i++) {
    var progress = _.findWhere(progresses, {location_id: locations[i].id});
    locations[i].dataValues.visited = progress.visited;
  }
  return locations
}
