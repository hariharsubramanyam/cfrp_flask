(function() {

  var author_data = [];
  var author_names = [];

  var timeline;
  var items;

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
    items = new vis.DataSet(author_data);
    timeline = new vis.Timeline(container, items, options);
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

  var jump_handler = function() {
    $("#jumpButton").click(function() {
      var year = $("#year").val();
      try {
        year = parseInt(year);
        if (isNaN(year) || year < 1500 || year > 1900) {
          throw "fail";
        }
        var start = new Date(year, 0, 0, 0, 0, 0, 0);
        var end = new Date(year + 10, 0, 0, 0, 0, 0, 0);
        timeline.setWindow(start, end, {
          "animate": true
        });
      } catch(err) {
        alert("Please enter a year between 1500 and 1900");
      }
    });
  };

  var go_handler = function() {
    $("#goButton").click(function(e) {
      if (!validate_author()) {
        e.preventDefault();
        alert("That's not a valid author");
      }
    });
  };

  $(document).ready(function() {
    fetch_author_data(function() {
      setup_timeline();
      setup_typeahead();
      go_handler();
      jump_handler();
    });
  });
})();
