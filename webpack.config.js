var path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin,
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  fileExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "eot",
    "otf",
    "svg",
    "ttf",
    "woff",
    "woff2",
  ];

module.exports = {
  entry: {
    popup: path.join(__dirname, "src", "popup.entrypoint.js"),
    options: path.join(__dirname, "src", "options.entrypoint.js"),
    background: path.join(__dirname, "src", "background.entrypoint.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        // react js(x) files
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        // regular files, listed above
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./package.json",
          to: "./manifest.json",

          transform(content) {
            // manifest.json merges description and version from package.json
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                manifest_version: 2,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "html_templates", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "html_templates", "options.html"),
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        "src",
        "html_templates",
        "background.html"
      ),
      filename: "background.html",
      chunks: ["background"],
    }),
  ],
};
