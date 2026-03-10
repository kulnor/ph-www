module.exports = function (eleventyConfig) {
    // Pass-through copy for assets
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/docs");
    eleventyConfig.addPassthroughCopy("src/assets/css/main.css");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};
