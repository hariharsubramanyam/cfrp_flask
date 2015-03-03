(function() {

  var author_data = null;

  var fetch_author_data = function(callback) {
    $.get("./data/authors_for_timeline.json", function(data) {
      author_data = data;
      callback();
    });
  };

  var setup_timeline = function() {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // Configuration for the Timeline
    var options = {
      "zoomMax": 315360000000,
      "zoomMin": 315360000000,
      "selectable": true,
      "align": "left"
    };
    var items = new vis.DataSet(author_data);
    var timeline = new vis.Timeline(container, items, options);
    timeline.on("select", function(selection) {
      if (selection.items.length > 0) {
        var id = selection.items[0];
        var authorName = data[id-1].content;
      }
    });
  };

  var setup_typeahead = function() {
    $("#authorName").typeahead({
      source: ["alpha", "beta", "gamma"]
    });
  };

  $(document).ready(function() {
    fetch_author_data(function() {
      setup_timeline();
      setup_typeahead();
    });
  });
})();
