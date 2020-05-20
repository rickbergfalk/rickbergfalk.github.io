const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // https://www.11ty.dev/docs/copy/
  // By setting these as template formats they get copied to the build
  // css is not yet a recognized template extension in Eleventy
  eleventyConfig.setTemplateFormats(["md", "njk", "css", "jpg", "png"]);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("dateonly", function (value) {
    const d = new Date(value);
    return d.toISOString().slice(0, 10);
  });
};
