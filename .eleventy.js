const { minify } = require('html-minifier-terser');
const jsonminify = require('jsonminify');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'site/static': './',
    'dist/css': './assets/css/',
  });

  eleventyConfig.addNunjucksShortcode(
    'postcss',
    require('./utils/postcss'),
    true,
  );
  eleventyConfig.addPairedNunjucksShortcode('jsonMinify', (data) => {
    return jsonminify(data);
  });

  eleventyConfig.addTransform('htmlmin', async (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      return await minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }

    return content;
  });

  return {
    dir: {
      input: 'site/src',
    },
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
  };
};
