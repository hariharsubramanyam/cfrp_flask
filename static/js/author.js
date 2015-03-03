(function() {
  $(document).ready(function() {
    console.log($("#name").attr("data-name"));
    $.ajax({
      "type": "POST",
      "url": "./performances",
      "data": {
        "name": $("#name").attr("data-name")
      },
      "success": function(data) {
        data = JSON.parse(data);
        $("#perf").text(data.num_performances);
      }
    });
  });
})();
