function toObject(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++)
    obj[arr[i]["Alpha-2"]] = {
      Alpha2: arr[i]["Alpha-2"],
      Country: arr[i]["Country name"],
      Retail: arr[i]["Retail price"],
      Wholesale: arr[i]["Wholesale price"]
    };
  return obj;
}

var coke;
var world;

document.addEventListener("DOMContentLoaded", function() {
  
      var color = d3.scale.linear()
                    .domain([0, 1000])
                    .range(["grey", "red"]);
  
      var svg = d3.select("#map").append("svg").attr("viewBox", "0 0 1000 500");
            var projection = d3.geo.robinson().translate([500, 250]);
            var path = d3.geo.path().projection(projection);
    
    function countryFill(id){
      console.log(coke);
      console.log(coke.id);
      return "red";
    }
  
    function drawWorld(){
        var countries = topojson.feature(world, world.objects["world.geo"]).features;
        for (var i=0; i<countries.length; i++) {
          var countryID = countries[i].id;
             svg.append("path")
               .attr("fill", countryFill(countryID))
               .attr("class", "country")
               .attr("id", countryID)
               .attr("d",path(countries[i]));
        }
      
    /* svg.selectAll("country")
       .data(cokeObj)
       .enter()
         .attr("fill", function(d) {return color(d.idNAME["Wholesale price"]);});*/

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