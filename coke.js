document.addEventListener("DOMContentLoaded", function() {
      var svg = d3.select("#map").append("svg").attr("viewBox", "0 0 1000 500");
            var projection = d3.geo.robinson().translate([500, 250]);
            var path = d3.geo.path().projection(projection);
              d3.json("world.topo.json", function(world) {
                var countries = topojson.feature(world, world.objects["world.geo"]).features;
                for (var i=0; i<countries.length; i++) {
                  svg.append("path").attr("class", "country").attr("id", countries[i].id).attr("d",path(countries[i]))
                }
                  });
  

  
});