const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  components: './components',
  scope: './useScope',
  snippets: './snippets',
  outputPath: './dist',
  title: "Weaveroo Playroom",
  openBrowser: true,
  widths: [320, 768, 1024, 1536 ],
  storageKey: 'playroom-example-basic',
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { modules: false }],
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loaders: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                // HERE: OPTIONS
                postcssOptions: {
                  plugins: [require("tailwindcss"), require("autoprefixer")],
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "styles.css",
      }),
    ],
  }),
};
