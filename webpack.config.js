const path = require('path');

module.exports = {
  // other webpack config settings

  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  }
};
