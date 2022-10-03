const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias['framer-motion'] = path.join(__dirname, `node_modules/framer-motion/dist/framer-motion`);
  return config;
};
