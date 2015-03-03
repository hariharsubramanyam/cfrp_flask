(function() {

  var author_data = [];
  var author_names = [];

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
        var authorName = author_data[id-1].content;
        $("#authorName").val(authorName);
        $("#goButton").click();
      }
    });
  };

  var setup_typeahead = function() {
    author_names = [];
    for (var i = 0; i < author_data.length; i++) {
      author_names.push(author_data[i].content);
    }
    $("#authorName").typeahead({
      "source": author_names 
    });
  };

  var validate_author = function() {
      var authorName = $("#authorName").val();
      return author_names.indexOf(authorName) != -1;
  };

  $(document).ready(function() {
    fetch_author_data(function() {
      setup_timeline();
      setup_typeahead();
      $("#goButton").click(function(e) {
        if (!validate_author()) {
          e.preventDefault();
          alert("That's not a valid author");
        }
      });
    });
  });
})();
