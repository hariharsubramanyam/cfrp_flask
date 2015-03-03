var fs = require("fs");

// Read author names.
var authors = JSON.parse(fs.readFileSync("../data/authors_with_year.json").toString("utf-8"));

var new_authors = [];

for (var i = 0; i < authors.length; i++) {
  new_authors.push({
    "id": i + 1,
    "content": authors[i].name,
    "start": authors[i].start_year + "-01-01"
  });
}

// Write the file.
fs.writeFileSync("../data/authors_for_timeline.json", JSON.stringify(new_authors));

