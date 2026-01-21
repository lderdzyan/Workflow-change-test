/** @type {import('@svgr/core').Config} */
module.exports = {
  icon: true,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            convertColors: { currentColor: true },
          },
        },
      },
      "removeDimensions",
    ],
  },
};

