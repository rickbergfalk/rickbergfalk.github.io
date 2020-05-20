var ghpages = require("gh-pages");

ghpages.publish(
  "docs",
  {
    branch: "master",
    repo: "git@github.com:rickbergfalk/rickbergfalk.github.io.git",
  },
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
