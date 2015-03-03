var fs = require("fs");

// Read author names.
var authors = JSON.parse(fs.readFileSync("../data/authors_clean.json").toString("utf-8"));

for (var i = 0; i < authors.length; i++) {
  authors[i].start_year = 0;
  authors[i].end_year = 0;
}

// Write the file.
fs.writeFileSync("../data/authors_with_year.json", JSON.stringify(authors));
