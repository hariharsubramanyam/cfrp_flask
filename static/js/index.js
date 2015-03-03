(function() {
  $(document).ready(function() {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // Configuration for the Timeline
    var options = {
      "zoomMax": 315360000000,
      "zoomMin": 315360000000,
      "selectable": true,
      "align": "left"
    };
    
    $.get("./data/authors_for_timeline.json", function(data) {
      var items = new vis.DataSet(data);
      var timeline = new vis.Timeline(container, items, options);
      timeline.on("select", function(selection) {
        if (selection.items.length > 0) {
          var id = selection.items[0];
          var authorName = data[id-1].content;
          $.get("https://cfrp-api.herokuapp.com/plays?author=eq." + authorName, function(data) {
            console.log(data);
          });
        }
      });
    });
  });
})();
