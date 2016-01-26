var _ = require("underscore");

exports.formatProgress = function(locations, progresses) {
  for (var i=0; i < locations.length; i++) {
    var progress = _.findWhere(progresses, {location_id: locations[i].id});
    locations[i].dataValues.visited = progress.visited;
    locations[i].dataValues.progress_id = progress.id;
  }
  return locations
}
