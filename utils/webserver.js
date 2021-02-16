/**
 * This strikes me as unncessary complexity, but I'll keep it around
 * and maybe try using it once I get going. For now, though, it's not listed
 * as a script in package.json
 */

var WebpackDevServer = require("webpack-dev-server"),
  webpack = require("webpack"),
  config = require("../webpack.config.js"),
  path = require("path");

var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      "webpack-dev-server/client?http://localhost:" + env.PORT,
      "webpack/hot/dev-server",
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

delete config.chromeExtensionBoilerplate;

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname, "../build"),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  disableHostCheck: true,
});

server.listen(8000);
