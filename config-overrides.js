const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    
      javascriptEnabled: true,
      modifyVars: { 
        '@base-color': '#B38F3A',
        }
    
  })
);