<!-- QuadrantChart.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as d3 from 'd3';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick(d) {
    dispatch('openModal',d);
  }

  export let chartData = [];
  export let width = 400;
  export let height = 400;
  export let theme1 = {};
  export let theme2 = {};
  export let filterOptions = [];

  let svgNode: SVGSVGElement;

  const tempImageAddress = "https://m.media-amazon.com/images/W/MEDIAX_1215821-T1/images/I/71lqY2VNReL._SY466_.jpg"

  const colors = {
       blue: "#256785",
        orange: "#f69f00",
           blueStrong: "#2567851f",
            orangeStrong: "#f69f001f",
            blueSubtle: "#2567850f",
            orangeSubtle: "#f69f000f"
          };

  const margin = { top: 70, right: 60, bottom: 50, left: 60 };

  function forceRectCollide() {
          let nodes,
            sizes = (d) => [d.width || 10, d.height || 10],
            strength = 1,
            iterations = 1,
            bounds = null;

          function force() {
            for (let k = 0; k < iterations; ++k) {
              for (let i = 0; i < nodes.length; ++i) {
                let node = nodes[i],
                  [w1, h1] = sizes(node),
                  halfW1 = w1 / 2,
                  halfH1 = h1 / 2,
                  x1 = node.x,
                  y1 = node.y;

                // Keep node within bounds
                if (bounds) {
                  if (x1 - halfW1 < bounds.x0) {
                    node.x = bounds.x0 + halfW1;
                    node.vx = Math.max(0, node.vx);
                  } else if (x1 + halfW1 > bounds.x1) {
                    node.x = bounds.x1 - halfW1;
                    node.vx = Math.min(0, node.vx);
                  }

                  if (y1 - halfH1 < bounds.y0) {
                    node.y = bounds.y0 + halfH1;
                    node.vy = Math.max(0, node.vy);
                  } else if (y1 + halfH1 > bounds.y1) {
                    node.y = bounds.y1 - halfH1;
                    node.vy = Math.min(0, node.vy);
                  }
                }

                // Check for rectangle overlaps
                for (let j = i + 1; j < nodes.length; ++j) {
                  let other = nodes[j],
                    [w2, h2] = sizes(other),
                    halfW2 = w2 / 2,
                    halfH2 = h2 / 2,
                    x2 = other.x,
                    y2 = other.y;

                  let dx = x2 - x1,
                    dy = y2 - y1,
                    overlapX = halfW1 + halfW2 - Math.abs(dx),
                    overlapY = halfH1 + halfH2 - Math.abs(dy);

                  if (overlapX > 0 && overlapY > 0) {
                    // Push away in the direction of least overlap
                    if (overlapX < overlapY) {
                      let push = overlapX * (dx < 0 ? -1 : 1) * strength;
                      node.vx -= push / 2;
                      other.vx += push / 2;
                    } else {
                      let push = overlapY * (dy < 0 ? -1 : 1) * strength;
                      node.vy -= push / 2;
                      other.vy += push / 2;
                    }
                  }
                }
              }
            }
          }

          force.initialize = function (_) {
            nodes = _;
          };

          force.size = function (_) {
            return arguments.length
              ? ((sizes = typeof _ === "function" ? _ : () => _), force)
              : sizes;
          };

          force.strength = function (_) {
            return arguments.length ? ((strength = +_), force) : strength;
          };

          force.iterations = function (_) {
            return arguments.length ? ((iterations = +_), force) : iterations;
          };

          force.bounds = function (_) {
            return arguments.length ? ((bounds = _), force) : bounds;
          };

          return force;
   }

  const getQuadrantData = (quadrantWidth, quadrantHeight, chartHeight) =>  [
       {
         name: "topLeft",
         rectTransform: `translate(${margin.left},${margin.top})`,
         labelTransform: `translate(${margin.left + quadrantWidth},${
           margin.top - 20
         })`,
         label: theme2.value.split("-")[0],
         labelFill: "#D0D0D0",
         rectFill: colors.orangeSubtle,
         markerPath: "M9,-4L1,0L9,4"
       },
       {
         name: "bottomLeft",
         rectTransform: `translate(${margin.left},${
           margin.top + quadrantHeight
         })`,
         labelTransform: `translate(${margin.left + quadrantWidth},${
           margin.top + chartHeight + 40
         })`,
         label: theme2.value.split("-")[1],
         labelFill: "#808080",
         rectFill: colors.orangeStrong,
         markerPath: "M1, -4L9,0L1,4"
       },
       {
         name: "topRight",
         rectTransform: `translate(${margin.left + quadrantWidth},${
           margin.top
         })`,
         labelTransform: `translate(${margin.left - 20},${
           margin.top + quadrantHeight
         }) rotate(-90)`,
         label: theme1.value.split("-")[0],
         labelFill: colors.orange,
         rectFill: colors.blueSubtle,
         markerPath: "M9,-4L1,0L9,4"
       },
       {
         name: "bottomRight",
         rectTransform: `translate(${margin.left + quadrantWidth},${
           margin.top + quadrantHeight
         })`,
         labelTransform: `translate(${width - margin.right + 20},${
           margin.top + quadrantHeight
         }) rotate(90)`,
         label: theme1.value.split("-")[1],
         labelFill: colors.blue,
         rectFill: colors.blueStrong,
         markerPath: "M1, -4L9,0L1,4"
       }
     ];

  onMount(() => {
console.log(width, height, chartData,filterOptions, theme1, theme2)
    drawChart();

  });

    $: {
    console.log(width, height, chartData ,filterOptions, theme1, theme2)
        drawChart();
    }

  function drawChart() {
      const svg = d3.select(svgNode);
      svg.attr("width",width).attr("height",height).style("background-color","white");
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;
      const bookWidth = Math.min(chartWidth/2,160);
      const bookHeight = Math.min(chartHeight/10,40);

      const quadrantWidth = chartWidth/2;
      const quadrantHeight = chartHeight/2;


      svg.select("#arrowStart")
        .attr("viewBox", "0 -5 10 10")
          .attr("refX", 5)
          .attr("markerWidth", 10)
          .attr("markerHeight", 10)
          .attr("orient", "auto");

      svg.select("#arrowStartPath")
       .attr("fill", "#A0A0A0")
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
          .attr("d", "M9,-4L1,0L9,4");

       svg.select("#arrowEnd")
        .attr("viewBox", "0 -5 10 10")
           .attr("refX", 5)
           .attr("markerWidth", 10)
           .attr("markerHeight", 10)
           .attr("orient", "auto");

        svg.select("#arrowEndPath")
            .attr("fill", "#A0A0A0")
            .attr("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .attr("d", "M1, -4L9,0L1,4");

        svg.select("#fade-gradient")
          .attr("x1", 0)
            .attr("x2", 1)
            .attr("y1", 0)
            .attr("y2", 0);

        svg.select("#fade-gradient-stop1")
         .attr("offset", "0%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 0);

         svg.select("#fade-gradient-stop2")
          .attr("offset", "100%")
             .attr("stop-color", "white")
             .attr("stop-opacity", 1);

         svg.select("#rightFadeMaskRect")
           .attr("width", bookWidth)
             .attr("height", bookHeight)
             .attr("fill", "white");

          svg
            .select("#rectLeft")
            .attr("x", margin.left)
            .attr("width", quadrantWidth)
            .attr("y", margin.top + quadrantHeight - 1)
            .attr("height", 2)
            .attr("fill", colors.orange);


          svg.select("#rectRight")
            .attr("x", margin.left + quadrantWidth)
            .attr("width", quadrantWidth)
            .attr("y", margin.top + quadrantHeight - 1)
            .attr("height", 2)
            .attr("fill", colors.blue);

          svg
            .select("#lineLeftRight")
            .attr("x1", width / 2)
            .attr("x2", width / 2)
            .attr("y1", margin.top)
            .attr("y2", height - margin.bottom)
            .attr("stroke", "transparent")
            .attr("stroke-width", 2)
            .attr("marker-start", "url(#arrowMarkertopLeft)")
            .attr("marker-end", "url(#arrowMarkerbottomLeft)");

          svg
            .select("#rectTop")
            .attr("x", margin.left + quadrantWidth - 1)
            .attr("height", quadrantHeight - 1)
            .attr("y", margin.top)
            .attr("width", 2)
            .attr("fill", "#D0D0D0");

          svg
             .select("#rectBottom")
            .attr("x", margin.left + quadrantWidth - 1)
            .attr("height", quadrantHeight - 8)
            .attr("y", margin.top + quadrantHeight + 1)
            .attr("width", 2)
            .attr("fill", "#808080");

          svg
            .select("#lineTopBottom")
            .attr("x1", margin.left)
            .attr("x2", width - margin.right)
            .attr("y1", margin.top + quadrantHeight)
            .attr("y2", margin.top + quadrantHeight)
            .attr("stroke-width", 2)
            .attr("stroke", "transparent")
            .attr("marker-start", "url(#arrowMarkertopRight)")
            .attr("marker-end", "url(#arrowMarkerbottomRight)");

         const quadrantData = getQuadrantData(quadrantWidth, quadrantHeight, chartHeight);

         const quadrantGroup = svg.select("#quadrantsGroup")
             .selectAll(".quadrantGroup")
             .data(quadrantData)
             .join((group) => {
               const enter = group.append("g").attr("class", "quadrantGroup");
               enter.append("rect").attr("class", "quadrantRect");
               enter.append("text").attr("class", "quadrantLabel");
               const defs = enter.append("defs");
               const marker = defs.append("marker").attr("class", "arrowMarker");
               marker.append("svg:path").attr("class", "markerPath");
               return enter;
             });

           quadrantGroup
             .select(".arrowMarker")
             .attr("id", (d) => `arrowMarker${d.name}`)
             .attr("viewBox", "0 -5 10 10")
             .attr("refX", 5)
             .attr("markerWidth", 10)
             .attr("markerHeight", 10)
             .attr("orient", "auto");

           quadrantGroup
             .select(".markerPath")
             .attr("fill", (d) => d.labelFill)
             .attr("stroke-linecap", "round")
             .attr("stroke-linejoin", "round")
             .attr("d", (d) => d.markerPath);

           quadrantGroup
             .select(".quadrantRect")
             .attr("width", quadrantWidth)
             .attr("height", quadrantHeight)
             .attr("fill", (d) => d.rectFill)
             .attr("transform", (d) => d.rectTransform);

           quadrantGroup
             .select(".quadrantLabel")
             .attr("text-anchor", "middle")
             .attr("fill", (d) => d.labelFill)
             .attr("font-size", 40)
             .text((d) => d.label)
             .attr("transform", (d) => d.labelTransform);


      const bounds = {
        x0: 0,
        y0: 0,
        x1: (quadrantWidth * 2) - bookWidth,
        y1: (quadrantHeight * 2) - bookHeight
      };

      const percentXScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, quadrantWidth * 2]);

    const percentYScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([ quadrantHeight * 2,0]);




  const nodes = chartData
  .filter((f) => filterOptions.length === 0 ? f : filterOptions.includes(f.Genre))
  .reduce((acc, entry) => {
   debugger;
    acc.push({
      title: entry.Book_Title,
      author: entry.Author,
      summary: entry.Summary,
      genre: entry.Genre,
      rating: entry["Goodreads Rank"],
      xPos: percentXScale(entry[theme1.value]),
      yPos: percentYScale(entry[theme2.value])
    });
    return acc;
  }, []);

  const bookPadding = 3;

  const simulation = d3
    .forceSimulation()
    .force("rectCollide",forceRectCollide()
        .size([bookWidth + bookPadding, bookHeight + bookPadding])
        .strength(0.8)
        .iterations(2)
        .bounds(bounds))
    .force("x",d3.forceX((d) => d.xPos))
    .force("y",d3.forceY((d) => d.yPos));

  simulation.stop();

   // nodes group (just a circle but you could add labels etc.)
    const nodesGroup = svg.select("#nodesGroup")
      .selectAll(".nodesGroup")
      .data(nodes)
      .join((group) => {
        const enter = group.append("g").attr("class", "nodesGroup");
        const maskGroup = enter.append("g").attr("class", "maskGroup");
        maskGroup.append("rect").attr("class", "bookRect");
        maskGroup.append("text").attr("class", "titleLabel");
        maskGroup.append("text").attr("class", "authorLabel");
        maskGroup.append("image").attr("class", "bookImage");
        maskGroup.append("rect").attr("class", "fadeRect");
        enter.append("rect").attr("class", "outlineRect");

        return enter;
      });

    nodesGroup.on("click",(event,d) => {
    handleClick(d)})

    nodesGroup
      .select(".fadeRect")
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("x", bookWidth * 0.85)
      .attr("height", bookHeight)
      .attr("width", bookWidth * 0.15)
      .attr("fill", "url(#fade-gradient)");

    nodesGroup.select(".maskGroup").attr("mask", "url(#right-fade-mask)");

    nodesGroup
      .select(".bookRect")
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", bookWidth)
      .attr("height", bookHeight)
      .attr("fill", "white")
      .attr("stroke-width", 0);

    nodesGroup
      .select(".outlineRect")
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("width", bookWidth)
      .attr("height", bookHeight)
      .attr("fill", "transparent")
      .attr("stroke", "#A0A0A0")
      .attr("stroke-width", 0.5);

    nodesGroup
      .select(".bookImage")
      .attr("pointer-events", "none")
      .style("filter", "grayscale(100%)")
      .attr("x", 2.5)
      .attr("y", 2.5)
      .attr("width", bookHeight - 5)
      .attr("height", bookHeight - 5)
      .attr("preserveAspectRatio", "xMidYMin slice")
      .attr("xlink:href", tempImageAddress);

    nodesGroup
      .select(".authorLabel")
      .attr("x", 5 + bookHeight)
      .attr("y", bookHeight / 2 - 6)
      .style("dominant-baseline", "middle")
      .attr("font-size", 12)
      .attr("fill", "#808080")
      .text((d) => d.author);

    nodesGroup
      .select(".titleLabel")
      .attr("x", 5 + bookHeight)
      .attr("y", bookHeight / 2 + 7)
      .style("dominant-baseline", "middle")
      .attr("font-size", 13)
      .attr("fill", "#484848")
      .attr("font-weight", 450)
      .text((d) => d.title);

    simulation.on("tick", () => {
      nodesGroup.attr(
        "transform",
        (d) => `translate(${margin.left + d.x},${margin.top + d.y})`
      );
    });

    // reset the simulation
    simulation.nodes(nodes);
    simulation.alpha(1).restart();





  }

</script>
    <svg bind:this={svgNode}>
    <defs>
    <marker id="arrowStart">
        <path id="arrowStartPath"/>
    </marker>
     <marker id="arrowEnd">
            <path id="arrowEndPath"/>
     </marker>
     <mask id="right-fade-mask">
        <linearGradient id="fade-gradient">
        <stop id="fade-gradient-stop1"/>
        <stop id="fade-gradient-stop2"/>
        </linearGradient>
        <rect id="rightFadeMaskRect"/>
     </mask>
    </defs>
     <g id="quadrantsGroup"/>
     <rect id="rectLeft"/>
     <rect id="rectRight"/>
     <line id="lineLeftRight"/>
     <rect id="rectTop"/>
     <rect id="rectBottom"/>
     <line id="lineTopBottom"/>
     <g id="nodesGroup"/>
    </svg>

