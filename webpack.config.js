const HtmlWebpackPlugin = require("html-webpack-plugin");
const { join } = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const config = {
    entry: join(process.cwd(), "src", "index.tsx"),
    output: {
      filename: "index.bundle.js",
      path: join(process.cwd(), "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", "..."],
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(ts|tsx)$/i,
          exclude: /node_modules/i,
          use: "babel-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(process.cwd(), "public", "index.html"),
        meta: {
          viewport: "width=device-width, initial-scale=1",
        },
      }),
      new Dotenv(),
    ],
  };

  if (env.NODE_ENV.toLowerCase() === "development") {
    config.mode = "development";
    config.devServer = {
      port: 4000,
      open: true,
      hot: true,
    };
    config.devtool = "inline-source-map";
  }

  if (env.NODE_ENV.toLowerCase() === "production") {
    config.mode = "production";
  }

  return config;
};
