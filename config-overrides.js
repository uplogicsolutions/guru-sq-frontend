const { override, addLessLoader, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    javascriptEnabled: true,
    modifyVars: {
      '@base-color': '#B38F3A',
      '@border-radius-base': '0px',
      '@input-bg-disabled': '#FFFFFF',
      '@input-color-disabled': '#B38F3A',
      '@input-color': '#B38F3A',
      '@picker-select-menu-item-selected-disabled-color':'#B38F3A',
    }
  }),
  addPostcssPlugins([
    require('tailwindcss'),
    require('autoprefixer'),
  ]),
);