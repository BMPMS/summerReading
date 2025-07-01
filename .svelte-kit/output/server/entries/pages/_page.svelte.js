import "clsx";
import { f as bind_props, c as pop, p as push, h as ensure_array_like, i as attr, e as escape_html, j as attr_style } from "../../chunks/index.js";
import "papaparse";
import * as d3 from "d3";
import { h as fallback } from "../../chunks/utils.js";
function QuadrantChart($$payload, $$props) {
  push();
  let chartData = fallback($$props["chartData"], () => [], true);
  let width = fallback($$props["width"], 400);
  let height = fallback($$props["height"], 400);
  const themeX = { value: "short-long", label: "shorter-longer" };
  const themeY = {
    value: "conceptual-technical",
    label: "conceptual-technical"
  };
  let svgNode;
  const colors = {
    blue: "#256785",
    orange: "#f69f00",
    blueStrong: "#2567851f",
    orangeStrong: "#f69f001f",
    blueSubtle: "#2567850f",
    orangeSubtle: "#f69f000f"
  };
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const axisFontSize = 30;
  function forceRectCollide() {
    let nodes, sizes = (d) => [d.width || 10, d.height || 10], strength = 1, iterations = 1, bounds = null;
    function force() {
      for (let k = 0; k < iterations; ++k) {
        for (let i = 0; i < nodes.length; ++i) {
          let node = nodes[i], [w1, h1] = sizes(node), halfW1 = w1 / 2, halfH1 = h1 / 2, x1 = node.x, y1 = node.y;
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
          for (let j = i + 1; j < nodes.length; ++j) {
            let other = nodes[j], [w2, h2] = sizes(other), halfW2 = w2 / 2, halfH2 = h2 / 2, x2 = other.x, y2 = other.y;
            let dx = x2 - x1, dy = y2 - y1, overlapX = halfW1 + halfW2 - Math.abs(dx), overlapY = halfH1 + halfH2 - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                let push2 = overlapX * (dx < 0 ? -1 : 1) * strength;
                node.vx -= push2 / 2;
                other.vx += push2 / 2;
              } else {
                let push2 = overlapY * (dy < 0 ? -1 : 1) * strength;
                node.vy -= push2 / 2;
                other.vy += push2 / 2;
              }
            }
          }
        }
      }
    }
    force.initialize = function(_) {
      nodes = _;
    };
    force.size = function(_) {
      return arguments.length ? (sizes = typeof _ === "function" ? _ : () => _, force) : sizes;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };
    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };
    force.bounds = function(_) {
      return arguments.length ? (bounds = _, force) : bounds;
    };
    return force;
  }
  const getQuadrantData = (quadrantWidth, quadrantHeight, chartHeight) => [
    {
      name: "topLeft",
      rectTransform: `translate(${margin.left},${margin.top})`,
      labelTransform: `translate(${margin.left + quadrantWidth},${margin.top - 20})`,
      label: themeY.label.split("-")[0],
      labelFill: "#9a9a9a",
      rectFill: colors.orangeSubtle,
      markerPath: "M9,-4L1,0L9,4"
    },
    {
      name: "bottomLeft",
      rectTransform: `translate(${margin.left},${margin.top + quadrantHeight})`,
      labelTransform: `translate(${margin.left + quadrantWidth},${margin.top + chartHeight + 40})`,
      label: themeY.label.split("-")[1],
      labelFill: "#6b6b6b",
      rectFill: colors.orangeStrong,
      markerPath: "M1, -4L9,0L1,4"
    },
    {
      name: "topRight",
      rectTransform: `translate(${margin.left + quadrantWidth},${margin.top})`,
      labelTransform: `translate(${margin.left - 20},${margin.top + quadrantHeight}) rotate(-90)`,
      label: themeX.label.split("-")[0],
      labelFill: colors.orange,
      rectFill: colors.blueSubtle,
      markerPath: "M9,-4L1,0L9,4"
    },
    {
      name: "bottomRight",
      rectTransform: `translate(${margin.left + quadrantWidth},${margin.top + quadrantHeight})`,
      labelTransform: `translate(${width - margin.right + 20},${margin.top + quadrantHeight}) rotate(90)`,
      label: themeX.label.split("-")[1],
      labelFill: colors.blue,
      rectFill: colors.blueStrong,
      markerPath: "M1, -4L9,0L1,4"
    }
  ];
  function drawChart() {
    const svg = d3.select(svgNode);
    svg.attr("width", width).attr("height", height).style("background-color", "white");
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const bookWidth = Math.max(80, chartWidth / 8);
    const bookHeight = Math.max(chartHeight / 12, 20);
    const bookFontSize = bookHeight / 3;
    const quadrantWidth = chartWidth / 2;
    const quadrantHeight = chartHeight / 2;
    svg.select("#arrowStart").attr("viewBox", "0 -5 10 10").attr("refX", 5).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto");
    svg.select("#arrowStartPath").attr("fill", "#A0A0A0").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").attr("d", "M9,-4L1,0L9,4");
    svg.select("#arrowEnd").attr("viewBox", "0 -5 10 10").attr("refX", 5).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto");
    svg.select("#arrowEndPath").attr("fill", "#A0A0A0").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").attr("d", "M1, -4L9,0L1,4");
    svg.select("#fade-gradient").attr("x1", 0).attr("x2", 1).attr("y1", 0).attr("y2", 0);
    svg.select("#fade-gradient-stop1").attr("offset", "0%").attr("stop-color", "white").attr("stop-opacity", 0);
    svg.select("#fade-gradient-stop2").attr("offset", "100%").attr("stop-color", "white").attr("stop-opacity", 1);
    svg.select("#rightFadeMaskRect").attr("width", bookWidth).attr("height", bookHeight).attr("fill", "white");
    svg.select("#rectLeft").attr("x", margin.left).attr("width", quadrantWidth).attr("y", margin.top + quadrantHeight - 1).attr("height", 2).attr("fill", colors.orange);
    svg.select("#rectRight").attr("x", margin.left + quadrantWidth).attr("width", quadrantWidth).attr("y", margin.top + quadrantHeight - 1).attr("height", 2).attr("fill", colors.blue);
    svg.select("#lineLeftRight").attr("x1", width / 2).attr("x2", width / 2).attr("y1", margin.top).attr("y2", height - margin.bottom).attr("stroke", "transparent").attr("stroke-width", 2).attr("marker-start", "url(#arrowMarkertopLeft)").attr("marker-end", "url(#arrowMarkerbottomLeft)");
    svg.select("#rectTop").attr("x", margin.left + quadrantWidth - 1).attr("height", quadrantHeight - 1).attr("y", margin.top).attr("width", 2).attr("fill", "#9a9a9a");
    svg.select("#rectBottom").attr("x", margin.left + quadrantWidth - 1).attr("height", quadrantHeight - 8).attr("y", margin.top + quadrantHeight + 1).attr("width", 2).attr("fill", "#6b6b6b");
    svg.select("#lineTopBottom").attr("x1", margin.left).attr("x2", width - margin.right).attr("y1", margin.top + quadrantHeight).attr("y2", margin.top + quadrantHeight).attr("stroke-width", 2).attr("stroke", "transparent").attr("marker-start", "url(#arrowMarkertopRight)").attr("marker-end", "url(#arrowMarkerbottomRight)");
    const quadrantData = getQuadrantData(quadrantWidth, quadrantHeight, chartHeight);
    const quadrantGroup = svg.select("#quadrantsGroup").selectAll(".quadrantGroup").data(quadrantData).join((group) => {
      const enter = group.append("g").attr("class", "quadrantGroup");
      enter.append("rect").attr("class", "quadrantRect");
      enter.append("text").attr("class", "quadrantLabel");
      const defs = enter.append("defs");
      const marker = defs.append("marker").attr("class", "arrowMarker");
      marker.append("svg:path").attr("class", "markerPath");
      return enter;
    });
    quadrantGroup.select(".arrowMarker").attr("id", (d) => `arrowMarker${d.name}`).attr("viewBox", "0 -5 10 10").attr("refX", 5).attr("markerWidth", 10).attr("markerHeight", 10).attr("orient", "auto");
    quadrantGroup.select(".markerPath").attr("fill", (d) => d.labelFill).attr("stroke-linecap", "round").attr("stroke-linejoin", "round").attr("d", (d) => d.markerPath);
    quadrantGroup.select(".quadrantRect").attr("pointer-events", "none").attr("width", quadrantWidth).attr("height", quadrantHeight).attr("fill", (d) => d.rectFill).attr("transform", (d) => d.rectTransform);
    quadrantGroup.select(".quadrantLabel").attr("pointer-events", "none").attr("text-anchor", "middle").attr("fill", (d) => d.labelFill).attr("font-size", axisFontSize).text((d) => d.label).attr("transform", (d) => d.labelTransform);
    const bounds = {
      x0: 0,
      y0: 0,
      x1: quadrantWidth * 2 - bookWidth,
      y1: quadrantHeight * 2 - bookHeight
    };
    const xScaleDomain = d3.extent(chartData, (d) => +d[themeX.value]);
    const percentXScale = d3.scaleLinear().domain(xScaleDomain).range([0, quadrantWidth * 2]);
    d3.extent(chartData, (d) => +d[themeY.value]);
    const percentYScale = d3.scaleLinear().domain([0, 10]).range([0, quadrantHeight * 2]);
    const nodes = chartData.reduce(
      (acc, entry) => {
        acc.push({
          title: entry.Book_Title,
          author: entry.Author,
          summary: entry.Summary,
          genre: entry.Genre,
          imageUrl: entry["Image Link"],
          amazonUrl: entry["Link"],
          rating: +entry["Goodreads Rank"],
          ratingTotal: +entry["rating total"],
          pages: +entry["short-long"],
          x: percentXScale(+entry[themeX.value]),
          y: percentYScale(+entry[themeY.value])
        });
        return acc;
      },
      []
    );
    const bookPadding = 3;
    const simulation = d3.forceSimulation().force("rectCollide", forceRectCollide().size([
      bookWidth + bookPadding,
      bookHeight + bookPadding
    ]).strength(0.8).iterations(2).bounds(bounds)).force("x", d3.forceX((d) => d.x)).force("y", d3.forceY((d) => d.y));
    simulation.stop();
    const nodesGroup = svg.select("#nodesGroup").selectAll(".nodesGroup").data(nodes).join((group) => {
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
    nodesGroup.attr("transform", (d) => `translate(${margin.left + d.x},${margin.top + d.y})`).style("cursor", "pointer").on("click", (event, d) => {
    });
    nodesGroup.select(".fadeRect").attr("rx", 3).attr("ry", 3).attr("x", bookWidth * 0.85).attr("height", bookHeight).attr("width", bookWidth * 0.15).attr("fill", "url(#fade-gradient)");
    nodesGroup.select(".maskGroup").attr("mask", "url(#right-fade-mask)");
    nodesGroup.select(".bookRect").attr("pointer-events", "none").attr("rx", 3).attr("ry", 3).attr("width", bookWidth).attr("height", bookHeight).attr("fill", "white").attr("stroke-width", 0);
    nodesGroup.select(".outlineRect").attr("rx", 3).attr("ry", 3).attr("width", bookWidth).attr("height", bookHeight).attr("fill-opacity", 0.2).attr("fill", "transparent").attr("stroke", "#A0A0A0").attr("stroke-width", 0.5).on("mouseover", (event, d) => {
      svg.selectAll(".outlineRect").attr("fill", "transparent");
      d3.select(event.currentTarget).attr("fill", "#9a9a9a");
    }).on("mouseout", (event, d) => {
      svg.selectAll(".outlineRect").attr("fill", "transparent");
    });
    nodesGroup.select(".bookImage").attr("pointer-events", "none").attr("pointer-events", "none").style("filter", "grayscale(100%)").attr("x", 2.5).attr("y", 2.5).attr("width", bookHeight - 5).attr("height", bookHeight - 5).attr("preserveAspectRatio", "xMidYMin slice").attr("xlink:href", (d) => d.imageUrl);
    nodesGroup.select(".authorLabel").attr("pointer-events", "none").attr("x", 5 + bookHeight).attr("y", bookHeight / 2 - bookFontSize / 2).style("dominant-baseline", "middle").attr("font-size", bookFontSize).attr("fill", "#6b6b6b").text((d) => d.author);
    nodesGroup.select(".titleLabel").attr("pointer-events", "none").attr("x", 5 + bookHeight).attr("y", bookHeight / 2 + bookFontSize / 1.5).style("dominant-baseline", "middle").attr("font-size", bookFontSize * 1.1).attr("fill", "#2a2a2a").attr("font-weight", 450).text((d) => d.title);
    simulation.on("tick", () => {
      nodesGroup.attr("transform", (d) => `translate(${margin.left + d.x},${margin.top + d.y})`);
    });
    simulation.nodes(nodes);
    simulation.alpha(1).restart();
  }
  if (width && height && chartData && themeX && themeY) {
    drawChart();
  }
  $$payload.out += `<svg><defs><marker id="arrowStart"><path id="arrowStartPath"></path></marker><marker id="arrowEnd"><path id="arrowEndPath"></path></marker><mask id="right-fade-mask"><linearGradient id="fade-gradient"><stop id="fade-gradient-stop1"></stop><stop id="fade-gradient-stop2"></stop></linearGradient><rect id="rightFadeMaskRect"></rect></mask></defs><g id="quadrantsGroup"></g><rect id="rectLeft"></rect><rect id="rectRight"></rect><line id="lineLeftRight"></line><rect id="rectTop"></rect><rect id="rectBottom"></rect><line id="lineTopBottom"></line><g id="nodesGroup"></g></svg>`;
  bind_props($$props, { chartData, width, height });
  pop();
}
function BookModal($$payload, $$props) {
  push();
  let rounded, emptyStars;
  let open = fallback($$props["open"], false);
  let onClose = fallback($$props["onClose"], () => {
  });
  let modalData = fallback($$props["modalData"], () => ({ title: "", author: "" }), true);
  const maxStars = 5;
  rounded = Math.round(modalData.rating);
  emptyStars = maxStars - rounded;
  if (open) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(rounded));
    const each_array_1 = ensure_array_like(Array(emptyStars));
    $$payload.out += `<div role="button" tabindex="0" class="modal-overlay"><div role="button" tabindex="0" class="modal"><div class="modal-top-left"><img id="bookImage"${attr("src", modalData.imageUrl)} alt="bookImage"/></div> <div class="modal-top-right"><p class="modal-title">${escape_html(modalData.title)}</p> <p>${escape_html(modalData.author)}</p> <p>${escape_html(modalData.genre)}</p> <p>${escape_html(d3.format(",")(modalData.pages))} pages</p> <div class="star-rating"${attr_style(`visibility:${modalData.rating === 0 ? "hidden" : "visible"};`)}><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<span>★</span>`;
    }
    $$payload.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      each_array_1[$$index_1];
      $$payload.out += `<span>☆</span>`;
    }
    $$payload.out += `<!--]--></div> <span class="modal-goodreads">${escape_html(modalData.rating === 0 ? "" : `${modalData.rating} from ${d3.format(",")(modalData.ratingTotal)} ratings`)}</span></div> <div class="modal-bottom"><a class="buy-button"${attr("href", modalData.amazonUrl)} target="_blank" rel="noopener noreferrer">Buy Now on Amazon</a> <p>${escape_html(modalData.summary)}</p></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { open, onClose, modalData });
  pop();
}
function SuggestionsModal($$payload, $$props) {
  push();
  let show = fallback($$props["show"], false);
  let title = "";
  let author = "";
  let why = "";
  if (show) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="suggestions-backdrop" role="button" tabindex="0"><div class="suggestions-modal" role="button" tabindex="0"><p class="suggestions-modal-title">Summer Reading Suggestions</p> <div class="suggestions-form-group"><label for="title">Book Title</label> <input id="title" type="text" class="suggestions-input"${attr("value", title)}/></div> <div class="suggestions-form-group"><label for="author">Author</label> <input id="author" type="text" class="suggestions-input"${attr("value", author)}/></div> <div class="suggestions-form-group"><label for="why">Why?</label> <textarea id="why" rows="6" class="suggestions-textarea">`;
    const $$body = escape_html(why);
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea></div> <div class="suggestions-actions"><button>Send Email</button></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { show });
  pop();
}
function _page($$payload, $$props) {
  push();
  let chartData = [];
  let width = 0;
  let height = 0;
  let showModal = false;
  let modalData = {};
  let showSuggestions = false;
  function closeModal() {
    showModal = false;
  }
  $$payload.out += `<div class="header"><div class="header-left"><div class="top-row"><div class="title"></div> <div class="right-side" role="button" tabindex="0"></div></div> <span class="chat1">Educator-Recommended Reads from Our 2025 Survey</span> <span class="chat2"></span></div> <div class="header-right"><a href="https://www.evalhere.org/" target="_blank" rel="noopener noreferrer" class="logo-link"><img src="/summerReading/hereLogo.png" alt="Logo"/></a></div></div> <div class="chart">`;
  QuadrantChart($$payload, { chartData, width, height });
  $$payload.out += `<!----> `;
  BookModal($$payload, {
    open: showModal,
    onClose: closeModal,
    modalData
  });
  $$payload.out += `<!----> `;
  SuggestionsModal($$payload, { show: showSuggestions });
  $$payload.out += `<!----></div> <div class="footer"><span>Development by <a href="https://www.bmdata.co.uk">BM Data Visualisation</a>.
    The design for this visualisation is 100% indebted to Evelina Parrou and her
    article <a href="https://www.theplot.media/p/story-books"><i>Back with story books</i></a>. Many thanks for the inspiration.</span></div>`;
  pop();
}
export {
  _page as default
};
