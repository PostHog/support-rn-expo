module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable the modern JSX transform
      ['@babel/plugin-transform-react-jsx', {
        runtime: 'automatic'
      }]
    ],
  };
}; 