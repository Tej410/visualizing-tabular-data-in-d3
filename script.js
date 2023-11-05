d3.csv("name-data.csv").then(
    function (data){
    
    var dimensions = ({
            width: 800,
            height: 600,
            margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    })
    
    var name = "Amanda"

    var svg = d3.select("#barchart")
                .style("width", dimensions.width)
                .style("height", dimensions.height)

    
    var xScale = d3.scaleBand()
                   .domain(data.map(function(d){return d.year;}))
                   .range([0,dimensions.width - dimensions.margin.right - dimensions.margin.left])
                   .padding([0.15])

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data.map(function(d){return d[name]}), n => +n)])
                   .range([dimensions.height - dimensions.margin.top - dimensions.margin.bottom,0]);
    
    var bars = svg.append("g")
                  .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)
                  .selectAll("bar")
                  .data(data)
                  .enter()
                  .append('rect')
                  .attr('x', function(d) { return xScale(d.year); })
                  .attr('y', function(d) { return yScale(d[name]); })
                  .attr('width', xScale.bandwidth)
                  .attr('height', function(d){return dimensions.height - dimensions.margin.top - dimensions.margin.bottom - yScale(d[name])})
                  .attr("fill", "#9ac6f5")


    var xAxis = d3.axisBottom(xScale)
                  .tickValues(xScale.domain().filter(function(d,i){ return !(i%5)})).tickSizeOuter(0)
    svg.append("g")
        .attr("transform", "translate("+ dimensions.margin.left + "," + (dimensions.height - dimensions.margin.top - dimensions.margin.bottom+dimensions.margin.bottom/4) + ")")
        .call(xAxis)
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-1em")
        .attr("dy", "0.2em")
        .attr("transform", "rotate(-65)");


    var yAxis = d3.axisLeft(yScale)
    svg.append("g")
        .attr("transform", "translate("+dimensions.margin.left+","+ dimensions.margin.top +")")
        .call(yAxis)
    
     
})