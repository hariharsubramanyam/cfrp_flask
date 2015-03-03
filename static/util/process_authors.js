var fs = require("fs");

// Read author names.
var authors = fs.readFileSync("../data/authors.txt").toString("utf-8").split("\n");

// List of names to throw away.
var forbidden = ["null", "unidentified", ""];

// Resultant json.
var authors_json = [];

authors.forEach(function(author) {
  // Skip forbidden terms.
  if (forbidden.indexOf(author) != -1) {
    return;
  }

  // The other names and image need to be filled in manually after the file is generated.
  authors_json.push({
    "name": author,
    "other_names": []
  });
});

// Write the file.
fs.writeFileSync("../data/authors.json", JSON.stringify(authors_json));
