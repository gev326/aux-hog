var _ = require('lodash');

var localEnvVars = {
  TITLE:      'pirs',
  SAFE_TITLE: 'pirs'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
