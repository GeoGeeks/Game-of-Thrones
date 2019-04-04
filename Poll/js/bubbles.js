
(function(){

    var width = 500;
    var height = 500;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")
        //.attr("transform", "translate(" + width / 2 +"," + height / 2 +")")

    var defs = svg.append("defs")

    var radiusScale = d3.scaleSqrt().domain([0,88]).range([0, 80])

    var simulation = d3.forceSimulation()
        .force("x", d3.forceX( width / 2).strength(0.05))
        .force("y", d3.forceY( height / 2).strength(0.05))
        .force("collide", d3.forceCollide(function(d){
            return radiusScale(d.votos)
        }))


    d3.json('https://cors-anywhere.herokuapp.com/geoapps.esri.co/RestDeDaniel/api/votos/?format=json').then(function(datapoints) {
    //d3.csv('data/votos.csv').then(function(datapoints) {
        console.log('en json',datapoints); 

        defs.selectAll(".temps-pattern")
            .data(datapoints)
            .enter().append("pattern")
            .attr("class", "temps-pattern")
            .attr("id", function(d){
                return d.temporada
            })
            .attr("height", "100%")
            .attr("width", "100%")
            .attr("patternContentUnits", "objectBoundingBox")
            .append("image")
            .attr("height", 1)
            .attr("width", 1)
            .attr("preserveAspectRatio", "none")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
            .attr("xlink:href",function(d){
                return d.ruta_imagen
            } )

        var circles = svg.selectAll(".artist")
            .data(datapoints)
            .enter().append("circle")
            .attr("r", function(d){
                console.log('radio', d.votos)
                return radiusScale(d.votos)
            })
            .attr("fill", function(d){
                //console.log('cual es la vaina',"url(#" + d.temporada + ")" )
                return "url(#" + d.temporada + ")"
            } )
            .on('click', function(d){
                console.log(d)
            })
        

        simulation.nodes(datapoints)
            .on('tick', ticked)

        function ticked() {
            circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y
                })
         }

        });
})();