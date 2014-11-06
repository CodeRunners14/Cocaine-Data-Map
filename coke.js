var coke;
var world;
var selector = "retail";
var countries;

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

document.addEventListener("DOMContentLoaded", function() {
  
    document.getElementById("retail-btn").addEventListener("click", function(){
      selector = "retail";
      colorRefresh();
});
    document.getElementById("wholesale-btn").addEventListener("click", function(){
      selector = "wholesale";
      colorRefresh();
});
  
    var colorR = d3.scale.linear()
                    .domain([0, 1133])
                    .range(["#FFC0C0", "red"]);
  
    var colorW = d3.scale.linear()
                    .domain([0, 160000])
                    .range(["#ADD8E6", "blue"]);
  
    var svg = d3.select("#map").append("svg").attr("viewBox", "0 0 1000 500");
            var projection = d3.geo.robinson().translate([500, 250]);
            var path = d3.geo.path().projection(projection);
    
    function countryFill(id){
      if(coke[id]){
        if(selector === "retail"){
          return colorR(coke[id].retail*5);
        }
        if(selector === "wholesale"){
          return colorW(coke[id].wholesale*5);
        }
      }      
      else{
        return "#d3d3d3";
      }
    }
  
    function drawWorld(){
        countries = topojson.feature(world, world.objects["world.geo"]).features;
        for (var i=0; i<countries.length; i++) {
          var countryID = countries[i].id;
             svg.append("path")
               .attr("class", "country")
               .attr("id", countryID)
               .attr("d",path(countries[i]))
               .attr("fill", countryFill(countryID));
        }
     }
    
    function colorRefresh(){
          d3.selectAll(".country")
            .data(countries)
              .attr("fill", function(d){
                return countryFill(d.id);
              });
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