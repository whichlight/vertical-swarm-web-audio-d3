var w = 600,
    h = 600,
    i = 0,
    size=5,
    numRects=50;

var rescale = h/numRects;

var dataset = [];
for (var i=0;i<numRects;i++){dataset.push(i);}

var svg = d3.select("#vertical_vis").append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("pointer-events", "all")
    .on("mousemove", animate)
    .on("mouseup", offNotes)
    .on("mousedown", onNotes);


svg.selectAll("line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("y1", 0)
    .attr("x2",w/2)
    .attr("x1", w/2)
    .attr("y2", h)
    .attr("stroke-width",2)
    .attr("stroke", "black")
    .style("opacity",1)
  .transition()
    .duration(4000)
    .attr("x2", function(d,i){return i*rescale;} )

function animate(){
    var m = d3.mouse(this)
    var base = Math.abs(m[0]-w/2);
    var mx = (m[0]<w/2) ? m[0] : w-m[0];
    svg.selectAll("line")
        .remove()

    svg.selectAll("line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("y1", 0)
    .attr("x2", function(d,i){return mx+i*(2*base/numRects);} )
    .attr("x1", w/2)
    .attr("y2", m[1])
    .attr("stroke-width",2)
    .attr("stroke", "black")
    .style("opacity",1);

    playControl(this);

}

function remap(val, i1, i2, f1, f2){
        return f1 + (val-i1)*(f2-f1)/(i2-i1);
    }

function playControl(obj){

    var m = d3.mouse(obj);
    var pitch = remap(m[1],h,0,50,440);
    var diff = Math.abs(m[0]-w/2)
    var variance = remap(diff, 0, w/2, 0, 100);
    updateNotes(pitch,variance);
}
