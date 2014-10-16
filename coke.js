function toObject(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++)
    obj[arr[i]["Alpha-2"]] = {
      alpha2: arr[i]["Alpha-2"],
      country: arr[i]["Country name"],
      retail: arr[i]["Retail price"],
      wholesale: arr[i]["Wholesale price"]
    };
  return obj;
}

var coke;
var world;
var selector = "wholesale";

document.addEventListener("DOMContentLoaded", function() {
  
    document.getElementById("retail-btn").addEventListener("click", function(){
      selector = "retail";
      drawWorld();
});
    document.getElementById("wholesale-btn").addEventListener("click", function(){
      selector = "wholesale";
      drawWorld();
});
  
    var color = d3.scale.linear()
                    .domain([0, 1133])
                    .range(["grey", "red"]);
  
    var svg = d3.select("#map").append("svg").attr("viewBox", "0 0 1000 500");
            var projection = d3.geo.robinson().translate([500, 250]);
            var path = d3.geo.path().projection(projection);
    
    function countryFill(id){
      if(coke[id]){
        if(selector === "retail"){
          return color(coke[id].retail*5);
        }
        if(selector === "wholesale"){
          return color(coke[id].wholesale*5);
        }
      }      
    }
  
    function drawWorld(){
        var countries = topojson.feature(world, world.objects["world.geo"]).features;
        for (var i=0; i<countries.length; i++) {
          var countryID = countries[i].id;
             svg.append("path")
               .attr("class", "country")
               .attr("id", countryID)
               .attr("d",path(countries[i]))
               .attr("fill", countryFill(countryID));
        }
     }
  
     d3.json("world.topo.json", function (worldy) {
        world = worldy;
        if (coke) {
          drawWorld();
        }
      });

      d3.json("cocaineprices.json", function(cokey) {
        coke = toObject(cokey);
        if (world) {
          drawWorld();
        }
      });
});