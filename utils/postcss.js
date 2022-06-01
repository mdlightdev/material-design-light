const path = require('path');
const fs = require('fs');
const postcss = require('postcss');

module.exports = async (cssPath) => {
  const rawFilepath = path.join(__dirname, `../site/src/_includes/` + cssPath);
  const data = fs.readFileSync(rawFilepath, 'utf8');

  return postcss([
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-custom-selectors'),
    require('postcss-nested'),
    require('cssnano')({
      preset: ['advanced', { discardUnused: false }],
    }),
  ])
    .process(data, { from: rawFilepath })
    .then((result) => result.css);
};
