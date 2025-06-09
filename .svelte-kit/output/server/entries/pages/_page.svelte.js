import { f as current_component, p as push, h as bind_props, c as pop, j as ensure_array_like, e as escape_html, k as attr, l as attr_style, m as stringify, n as spread_attributes, o as copy_payload, q as assign_payload, t as attr_class, u as clsx, v as sanitize_slots, d as slot, w as css_props } from "../../chunks/index.js";
import "papaparse";
import { n as noop, f as fallback, b as deferred } from "../../chunks/equality.js";
import * as d3 from "d3";
import "clsx";
import { computePosition, autoUpdate, offset, flip, shift } from "@floating-ui/dom";
import { t as source, u as render_effect, n as set, o as get } from "../../chunks/runtime.js";
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function createEventDispatcher() {
  return noop;
}
async function tick() {
}
function QuadrantChart($$payload, $$props) {
  push();
  let chartData = fallback($$props["chartData"], () => [], true);
  let width = fallback($$props["width"], 400);
  let height = fallback($$props["height"], 400);
  let theme1 = fallback($$props["theme1"], () => ({}), true);
  let theme2 = fallback($$props["theme2"], () => ({}), true);
  let filterOptions = fallback($$props["filterOptions"], () => [], true);
  let svgNode;
  const tempImageAddress = "https://m.media-amazon.com/images/W/MEDIAX_1215821-T1/images/I/71lqY2VNReL._SY466_.jpg";
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
      label: theme2.value.split("-")[0],
      labelFill: "#D0D0D0",
      rectFill: colors.orangeSubtle,
      markerPath: "M9,-4L1,0L9,4"
    },
    {
      name: "bottomLeft",
      rectTransform: `translate(${margin.left},${margin.top + quadrantHeight})`,
      labelTransform: `translate(${margin.left + quadrantWidth},${margin.top + chartHeight + 40})`,
      label: theme2.value.split("-")[1],
      labelFill: "#808080",
      rectFill: colors.orangeStrong,
      markerPath: "M1, -4L9,0L1,4"
    },
    {
      name: "topRight",
      rectTransform: `translate(${margin.left + quadrantWidth},${margin.top})`,
      labelTransform: `translate(${margin.left - 20},${margin.top + quadrantHeight}) rotate(-90)`,
      label: theme1.value.split("-")[0],
      labelFill: colors.orange,
      rectFill: colors.blueSubtle,
      markerPath: "M9,-4L1,0L9,4"
    },
    {
      name: "bottomRight",
      rectTransform: `translate(${margin.left + quadrantWidth},${margin.top + quadrantHeight})`,
      labelTransform: `translate(${width - margin.right + 20},${margin.top + quadrantHeight}) rotate(90)`,
      label: theme1.value.split("-")[1],
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
    const bookWidth = Math.min(chartWidth / 2, 160);
    const bookHeight = Math.min(chartHeight / 10, 40);
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
    svg.select("#rectTop").attr("x", margin.left + quadrantWidth - 1).attr("height", quadrantHeight - 1).attr("y", margin.top).attr("width", 2).attr("fill", "#D0D0D0");
    svg.select("#rectBottom").attr("x", margin.left + quadrantWidth - 1).attr("height", quadrantHeight - 8).attr("y", margin.top + quadrantHeight + 1).attr("width", 2).attr("fill", "#808080");
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
    quadrantGroup.select(".quadrantRect").attr("width", quadrantWidth).attr("height", quadrantHeight).attr("fill", (d) => d.rectFill).attr("transform", (d) => d.rectTransform);
    quadrantGroup.select(".quadrantLabel").attr("text-anchor", "middle").attr("fill", (d) => d.labelFill).attr("font-size", 40).text((d) => d.label).attr("transform", (d) => d.labelTransform);
    const bounds = {
      x0: 0,
      y0: 0,
      x1: quadrantWidth * 2 - bookWidth,
      y1: quadrantHeight * 2 - bookHeight
    };
    const percentXScale = d3.scaleLinear().domain([0, 1]).range([0, quadrantWidth * 2]);
    const percentYScale = d3.scaleLinear().domain([0, 1]).range([quadrantHeight * 2, 0]);
    const nodes = chartData.filter((f) => filterOptions.length === 0 ? f : filterOptions.includes(f.Genre)).reduce(
      (acc, entry) => {
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
      },
      []
    );
    const bookPadding = 3;
    const simulation = d3.forceSimulation().force("rectCollide", forceRectCollide().size([
      bookWidth + bookPadding,
      bookHeight + bookPadding
    ]).strength(0.8).iterations(2).bounds(bounds)).force("x", d3.forceX((d) => d.xPos)).force("y", d3.forceY((d) => d.yPos));
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
    nodesGroup.on("click", (event, d) => {
    });
    nodesGroup.select(".fadeRect").attr("rx", 3).attr("ry", 3).attr("x", bookWidth * 0.85).attr("height", bookHeight).attr("width", bookWidth * 0.15).attr("fill", "url(#fade-gradient)");
    nodesGroup.select(".maskGroup").attr("mask", "url(#right-fade-mask)");
    nodesGroup.select(".bookRect").attr("rx", 3).attr("ry", 3).attr("width", bookWidth).attr("height", bookHeight).attr("fill", "white").attr("stroke-width", 0);
    nodesGroup.select(".outlineRect").attr("rx", 3).attr("ry", 3).attr("width", bookWidth).attr("height", bookHeight).attr("fill", "transparent").attr("stroke", "#A0A0A0").attr("stroke-width", 0.5);
    nodesGroup.select(".bookImage").attr("pointer-events", "none").style("filter", "grayscale(100%)").attr("x", 2.5).attr("y", 2.5).attr("width", bookHeight - 5).attr("height", bookHeight - 5).attr("preserveAspectRatio", "xMidYMin slice").attr("xlink:href", tempImageAddress);
    nodesGroup.select(".authorLabel").attr("x", 5 + bookHeight).attr("y", bookHeight / 2 - 6).style("dominant-baseline", "middle").attr("font-size", 12).attr("fill", "#808080").text((d) => d.author);
    nodesGroup.select(".titleLabel").attr("x", 5 + bookHeight).attr("y", bookHeight / 2 + 7).style("dominant-baseline", "middle").attr("font-size", 13).attr("fill", "#484848").attr("font-weight", 450).text((d) => d.title);
    simulation.on("tick", () => {
      nodesGroup.attr("transform", (d) => `translate(${margin.left + d.x},${margin.top + d.y})`);
    });
    simulation.nodes(nodes);
    simulation.alpha(1).restart();
  }
  {
    console.log(width, height, chartData, filterOptions, theme1, theme2);
    drawChart();
  }
  $$payload.out += `<svg><defs><marker id="arrowStart"><path id="arrowStartPath"></path></marker><marker id="arrowEnd"><path id="arrowEndPath"></path></marker><mask id="right-fade-mask"><linearGradient id="fade-gradient"><stop id="fade-gradient-stop1"></stop><stop id="fade-gradient-stop2"></stop></linearGradient><rect id="rightFadeMaskRect"></rect></mask></defs><g id="quadrantsGroup"></g><rect id="rectLeft"></rect><rect id="rectRight"></rect><line id="lineLeftRight"></line><rect id="rectTop"></rect><rect id="rectBottom"></rect><line id="lineTopBottom"></line><g id="nodesGroup"></g></svg>`;
  bind_props($$props, {
    chartData,
    width,
    height,
    theme1,
    theme2,
    filterOptions
  });
  pop();
}
function BookModal($$payload, $$props) {
  push();
  let rounded, emptyStars;
  let open = fallback($$props["open"], false);
  let onClose = fallback($$props["onClose"], () => {
  });
  let modalData = fallback($$props["modalData"], () => ({ title: "", author: "" }), true);
  let rating = fallback($$props["rating"], 3.3);
  const maxStars = 5;
  rounded = Math.round(rating);
  emptyStars = maxStars - rounded;
  if (open) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(Array(rounded));
    const each_array_1 = ensure_array_like(Array(emptyStars));
    $$payload.out += `<div class="modal-overlay"><div class="modal"><div class="modal-top-left"><img id="bookImage" src="https://via.placeholder.com/200" alt="Image"/></div> <div class="modal-top-right"><p class="modal-title">${escape_html(modalData.title)}</p> <p>${escape_html(modalData.author)}</p> <p>${escape_html(modalData.genre)}</p> <div class="star-rating"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      each_array[$$index];
      $$payload.out += `<span>★</span>`;
    }
    $$payload.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      each_array_1[$$index_1];
      $$payload.out += `<span>☆</span>`;
    }
    $$payload.out += `<!--]--></div> <span class="modal-goodreads">${escape_html(modalData.rating)}</span></div> <div class="modal-bottom"><p>${escape_html(modalData.summary)}</p></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { open, onClose, modalData, rating });
  pop();
}
function SuggestionsModal($$payload, $$props) {
  let show = fallback($$props["show"], false);
  let title = "";
  let author = "";
  let why = "";
  if (show) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="suggestions-backdrop"><div class="suggestions-modal"><p class="modal-title">Summer Reading Suggestions</p> <div class="suggestions-form-group"><label for="title">Book Title</label> <input class="suggestions-input" id="title" type="text"${attr("value", title)}/></div> <div class="suggestions-form-group"><label for="author">Author</label> <input class="suggestions-input" id="author" type="text"${attr("value", author)}/></div> <div class="suggestions-form-group"><label for="why">Why?</label> <textarea id="why" rows="6">`;
    const $$body = escape_html(why);
    if ($$body) {
      $$payload.out += `${$$body}`;
    }
    $$payload.out += `</textarea></div> <div class="suggestions-actions"><button>Close</button> <button>Send Email</button></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { show });
}
function CircleSpinner($$payload, $$props) {
  let {
    color = `cornflowerblue`,
    duration = `1.5s`,
    size = `1em`
  } = $$props;
  $$payload.out += `<div${attr_style(`--duration: ${stringify(duration)}`, {
    "border-color": `${stringify(color)} transparent ${stringify(color)} ${stringify(color)}`,
    width: size,
    height: size
  })} class="svelte-66wdl1"></div>`;
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
class Spring {
  #stiffness = source(0.15);
  #damping = source(0.8);
  #precision = source(0.01);
  #current = source(
    /** @type {T} */
    void 0
  );
  #target = source(
    /** @type {T} */
    void 0
  );
  #last_value = (
    /** @type {T} */
    void 0
  );
  #last_time = 0;
  #inverse_mass = 1;
  #momentum = 0;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /** @type {ReturnType<typeof deferred> | null} */
  #deferred = null;
  /**
   * @param {T} value
   * @param {SpringOpts} [options]
   */
  constructor(value, options = {}) {
    this.#current.v = this.#target.v = value;
    if (typeof options.stiffness === "number") this.#stiffness.v = clamp(options.stiffness, 0, 1);
    if (typeof options.damping === "number") this.#damping.v = clamp(options.damping, 0, 1);
    if (typeof options.precision === "number") this.#precision.v = options.precision;
  }
  /**
   * Create a spring whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Spring } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const spring = Spring.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {SpringOpts} [options]
   */
  static of(fn, options) {
    const spring = new Spring(fn(), options);
    render_effect(() => {
      spring.set(fn());
    });
    return spring;
  }
  /** @param {T} value */
  #update(value) {
    set(this.#target, value);
    this.#current.v ??= value;
    this.#last_value ??= this.#current.v;
    if (!this.#task) {
      this.#last_time = raf.now();
      var inv_mass_recovery_rate = 1e3 / (this.#momentum * 60);
      this.#task ??= loop((now2) => {
        this.#inverse_mass = Math.min(this.#inverse_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - this.#last_time, 1e3 / 30);
        const ctx = {
          inv_mass: this.#inverse_mass,
          opts: {
            stiffness: this.#stiffness.v,
            damping: this.#damping.v,
            precision: this.#precision.v
          },
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        var next = tick_spring(ctx, this.#last_value, this.#current.v, this.#target.v);
        this.#last_value = this.#current.v;
        this.#last_time = now2;
        set(this.#current, next);
        if (ctx.settled) {
          this.#task = null;
        }
        return !ctx.settled;
      });
    }
    return this.#task.promise;
  }
  /**
   * Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.
   *
   * If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.
   *
   * If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
   * the specified number of milliseconds. This is useful for things like 'fling' gestures.
   *
   * @param {T} value
   * @param {SpringUpdateOpts} [options]
   */
  set(value, options) {
    this.#deferred?.reject(new Error("Aborted"));
    if (options?.instant || this.#current.v === void 0) {
      this.#task?.abort();
      this.#task = null;
      set(this.#current, set(this.#target, value));
      this.#last_value = value;
      return Promise.resolve();
    }
    if (options?.preserveMomentum) {
      this.#inverse_mass = 0;
      this.#momentum = options.preserveMomentum;
    }
    var d = this.#deferred = deferred();
    d.promise.catch(noop);
    this.#update(value).then(() => {
      if (d !== this.#deferred) return;
      d.resolve(void 0);
    });
    return d.promise;
  }
  get current() {
    return get(this.#current);
  }
  get damping() {
    return get(this.#damping);
  }
  set damping(v) {
    set(this.#damping, clamp(v, 0, 1));
  }
  get precision() {
    return get(this.#precision);
  }
  set precision(v) {
    set(this.#precision, v);
  }
  get stiffness() {
    return get(this.#stiffness);
  }
  set stiffness(v) {
    set(this.#stiffness, clamp(v, 0, 1));
  }
  get target() {
    return get(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function Wiggle($$payload, $$props) {
  push();
  let {
    wiggle = false,
    angle = 0,
    scale = 1,
    dx = 0,
    dy = 0,
    duration = 200,
    stiffness = 0.05,
    damping = 0.1,
    children
  } = $$props;
  const store = Spring.of(() => wiggle ? { scale, angle, dx, dy } : { angle: 0, scale: 1, dx: 0, dy: 0 }, { stiffness, damping });
  $$payload.out += `<span${attr_style("", {
    transform: `rotate(${stringify(store.current.angle)}deg) scale(${stringify(store.current.scale)}) translate(${stringify(store.current.dx)}px, ${stringify(store.current.dy)}px)`
  })}>`;
  children?.($$payload);
  $$payload.out += `<!----></span>`;
  bind_props($$props, { wiggle });
  pop();
}
function ChevronExpand($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      fill: "currentColor",
      viewBox: "0 0 16 16"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"></path></svg>`;
}
function Cross($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      viewBox: "0 0 24 24",
      fill: "currentColor"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>`;
}
function Disabled($$payload, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$payload.out += `<svg${spread_attributes(
    {
      ...props,
      viewBox: "0 0 24 24",
      fill: "currentColor"
    },
    null,
    void 0,
    void 0,
    3
  )}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm-4.906-3.68L18.32 7.094A8 8 0 0 1 7.094 18.32ZM5.68 16.906A8 8 0 0 1 16.906 5.68L5.68 16.906Z"></path></svg>`;
}
const get_label = (opt) => {
  if (opt instanceof Object) {
    if (opt.label === void 0) {
      console.error(`MultiSelect option ${JSON.stringify(opt)} is an object but has no label key`);
    }
    return opt.label;
  }
  return `${opt}`;
};
function get_style(option, key = null) {
  let css_str = ``;
  if (![`selected`, `option`, null].includes(key)) {
    console.error(`MultiSelect: Invalid key=${key} for get_style`);
  }
  if (typeof option == `object` && option.style) {
    if (typeof option.style == `string`) {
      css_str = option.style;
    }
    if (typeof option.style == `object`) {
      if (key && key in option.style)
        return option.style[key] ?? ``;
      else {
        console.error(`Invalid style object for option=${JSON.stringify(option)}`);
      }
    }
  }
  if (css_str.trim() && !css_str.trim().endsWith(`;`))
    css_str += `;`;
  return css_str;
}
function MultiSelect($$payload, $$props) {
  push();
  let {
    activeIndex = null,
    activeOption = null,
    createOptionMsg = `Create this option...`,
    allowUserOptions = false,
    allowEmpty = false,
    autocomplete = `off`,
    autoScroll = true,
    breakpoint = 800,
    defaultDisabledTitle = `This option is disabled`,
    disabled = false,
    disabledInputTitle = `This input is disabled`,
    duplicateOptionMsg = `This option is already selected`,
    duplicates = false,
    key = (opt) => `${get_label(opt)}`.toLowerCase(),
    filterFunc = (opt, searchText2) => {
      if (!searchText2) return true;
      return `${get_label(opt)}`.toLowerCase().includes(searchText2.toLowerCase());
    },
    closeDropdownOnSelect = `desktop`,
    form_input = null,
    highlightMatches = true,
    id = null,
    input = null,
    inputClass = ``,
    inputStyle = null,
    inputmode = null,
    invalid = false,
    liActiveOptionClass = ``,
    liActiveUserMsgClass = ``,
    liOptionClass = ``,
    liOptionStyle = null,
    liSelectedClass = ``,
    liSelectedStyle = null,
    liUserMsgClass = ``,
    loading = false,
    matchingOptions = [],
    maxOptions = void 0,
    maxSelect = null,
    maxSelectMsg = (current, max) => max > 1 ? `${current}/${max}` : ``,
    maxSelectMsgClass = ``,
    name = null,
    noMatchingOptionsMsg = `No matching options`,
    open = false,
    options = void 0,
    outerDiv = null,
    outerDivClass = ``,
    parseLabelsAsHtml = false,
    pattern = null,
    placeholder = null,
    removeAllTitle = `Remove all`,
    removeBtnTitle = `Remove`,
    minSelect = null,
    required = false,
    resetFilterOnAdd = true,
    searchText = ``,
    selected = options?.filter((opt) => opt instanceof Object && opt?.preselected).slice(0, maxSelect ?? void 0) ?? [],
    sortSelected = false,
    selectedOptionsDraggable = !sortSelected,
    style = null,
    ulOptionsClass = ``,
    ulSelectedClass = ``,
    ulSelectedStyle = null,
    ulOptionsStyle = null,
    value = null,
    expandIcon,
    selectedItem,
    children,
    removeIcon,
    afterInput,
    spinner,
    disabledIcon,
    option,
    userMsg,
    onblur,
    onclick,
    onfocus,
    onkeydown,
    onkeyup,
    onmousedown,
    onmouseenter,
    onmouseleave,
    ontouchcancel,
    ontouchend,
    ontouchmove,
    ontouchstart,
    onadd,
    oncreate,
    onremove,
    onremoveAll,
    onchange,
    onopen,
    onclose,
    portal: portal_params = {},
    $$slots,
    $$events,
    ...rest
  } = $$props;
  let wiggle = false;
  if (!(options?.length > 0)) {
    if (allowUserOptions || loading || disabled || allowEmpty) {
      options = [];
    } else {
      console.error(`MultiSelect received no options`);
    }
  }
  if (maxSelect !== null && maxSelect < 1) {
    console.error(`MultiSelect's maxSelect must be null or positive integer, got ${maxSelect}`);
  }
  if (!Array.isArray(selected)) {
    console.error(`MultiSelect's selected prop should always be an array, got ${selected}`);
  }
  if (maxSelect && typeof required === `number` && required > maxSelect) {
    console.error(`MultiSelect maxSelect=${maxSelect} < required=${required}, makes it impossible for users to submit a valid form`);
  }
  if (parseLabelsAsHtml && allowUserOptions) {
    console.warn(`Don't combine parseLabelsAsHtml and allowUserOptions. It's susceptible to XSS attacks!`);
  }
  if (sortSelected && selectedOptionsDraggable) {
    console.warn(`MultiSelect's sortSelected and selectedOptionsDraggable should not be combined as any user re-orderings of selected options will be undone by sortSelected on component re-renders.`);
  }
  if (allowUserOptions && !createOptionMsg && createOptionMsg !== null) {
    console.error(`MultiSelect has allowUserOptions=${allowUserOptions} but createOptionMsg=${createOptionMsg} is falsy. This prevents the "Add option" <span> from showing up, resulting in a confusing user experience.`);
  }
  if (maxOptions && (typeof maxOptions != `number` || maxOptions < 0 || maxOptions % 1 != 0)) {
    console.error(`MultiSelect's maxOptions must be undefined or a positive integer, got ${maxOptions}`);
  }
  let option_msg_is_active = false;
  if (activeIndex !== null && !matchingOptions[activeIndex]) {
    throw `Run time error, activeIndex=${activeIndex} is out of bounds, matchingOptions.length=${matchingOptions.length}`;
  }
  let is_selected = (label) => selected.map(get_label).includes(label);
  let drag_idx = null;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(selected);
    $$payload2.out += `<div${attr_class(`multiselect ${stringify(outerDivClass)} ${stringify(rest.class ?? ``)}`, "svelte-1taxil8", {
      "disabled": disabled,
      "single": maxSelect === 1,
      "open": open,
      "invalid": invalid
    })}${attr("title", disabled ? disabledInputTitle : null)}${attr("data-id", id)} role="searchbox" tabindex="-1"${attr_style(style)}><input${attr("name", name)}${attr("required", Boolean(required), true)}${attr("value", selected.length >= Number(required) ? JSON.stringify(selected) : null)} tabindex="-1" aria-hidden="true" aria-label="ignore this, used only to prevent form submission if select is required but empty" class="form-control svelte-1taxil8"/> `;
    if (expandIcon) {
      $$payload2.out += "<!--[-->";
      expandIcon($$payload2, { open });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      ChevronExpand($$payload2, {
        width: "15px",
        style: "min-width: 1em; padding: 0 1pt; cursor: pointer;"
      });
    }
    $$payload2.out += `<!--]--> <ul${attr_class(`selected ${stringify(ulSelectedClass)}`, "svelte-1taxil8")} aria-label="selected options"${attr_style(ulSelectedStyle)}><!--[-->`;
    for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
      let option2 = each_array[idx];
      const selectedOptionStyle = [
        get_style(option2, `selected`),
        liSelectedStyle
      ].filter(Boolean).join(` `) || null;
      $$payload2.out += `<li${attr_class(clsx(liSelectedClass), "svelte-1taxil8", { "active": drag_idx === idx })} role="option" aria-selected="true"${attr("draggable", selectedOptionsDraggable && !disabled && selected.length > 1)}${attr_style(selectedOptionStyle)}>`;
      if (selectedItem) {
        $$payload2.out += "<!--[-->";
        selectedItem($$payload2, { option: option2, idx });
        $$payload2.out += `<!---->`;
      } else if (children) {
        $$payload2.out += "<!--[1-->";
        children($$payload2, { option: option2, idx });
        $$payload2.out += `<!---->`;
      } else if (parseLabelsAsHtml) {
        $$payload2.out += "<!--[2-->";
        $$payload2.out += `${html(get_label(option2))}`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(get_label(option2))}`;
      }
      $$payload2.out += `<!--]--> `;
      if (!disabled && (minSelect === null || selected.length > minSelect)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button type="button"${attr("title", `${stringify(removeBtnTitle)} ${stringify(get_label(option2))}`)} class="remove svelte-1taxil8">`;
        if (removeIcon) {
          $$payload2.out += "<!--[-->";
          removeIcon($$payload2);
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          Cross($$payload2, { width: "15px" });
        }
        $$payload2.out += `<!--]--></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]--> <input${spread_attributes(
      {
        class: clsx(inputClass),
        style: inputStyle,
        value: searchText,
        id,
        disabled,
        autocomplete,
        inputmode,
        pattern,
        placeholder: selected.length == 0 ? placeholder : null,
        "aria-invalid": invalid ? `true` : null,
        ...rest
      },
      "svelte-1taxil8"
    )}/> `;
    afterInput?.($$payload2, {
      selected,
      disabled,
      invalid,
      id,
      placeholder,
      open,
      required
    });
    $$payload2.out += `<!----></ul> `;
    if (loading) {
      $$payload2.out += "<!--[-->";
      if (spinner) {
        $$payload2.out += "<!--[-->";
        spinner($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        CircleSpinner($$payload2, {});
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (disabled) {
      $$payload2.out += "<!--[-->";
      if (disabledIcon) {
        $$payload2.out += "<!--[-->";
        disabledIcon($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        Disabled($$payload2, {
          width: "14pt",
          style: "margin: 0 2pt;",
          "data-name": "disabled-icon"
        });
      }
      $$payload2.out += `<!--]-->`;
    } else if (selected.length > 0) {
      $$payload2.out += "<!--[1-->";
      if (maxSelect && (maxSelect > 1 || maxSelectMsg)) {
        $$payload2.out += "<!--[-->";
        Wiggle($$payload2, {
          angle: 20,
          get wiggle() {
            return wiggle;
          },
          set wiggle($$value) {
            wiggle = $$value;
            $$settled = false;
          },
          children: ($$payload3) => {
            $$payload3.out += `<span${attr_class(`max-select-msg ${stringify(maxSelectMsgClass)}`, "svelte-1taxil8")}>${escape_html(maxSelectMsg?.(selected.length, maxSelect))}</span>`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (maxSelect !== 1 && selected.length > 1) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button type="button" class="remove remove-all svelte-1taxil8"${attr("title", removeAllTitle)}>`;
        if (removeIcon) {
          $$payload2.out += "<!--[-->";
          removeIcon($$payload2);
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          Cross($$payload2, { width: "15px" });
        }
        $$payload2.out += `<!--]--></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (searchText && noMatchingOptionsMsg || options?.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(matchingOptions.slice(0, Math.max(0, maxOptions ?? 0) || Infinity));
      $$payload2.out += `<ul${attr_class(`options ${stringify(ulOptionsClass)}`, "svelte-1taxil8", { "hidden": !open })} role="listbox"${attr("aria-multiselectable", maxSelect === null || maxSelect > 1)}${attr("aria-expanded", open)}${attr("aria-disabled", disabled ? `true` : null)}${attr_style(ulOptionsStyle)}><!--[-->`;
      for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
        let optionItem = each_array_1[idx];
        const {
          label,
          disabled: disabled2 = null,
          title = null,
          selectedTitle = null,
          disabledTitle = defaultDisabledTitle
        } = optionItem instanceof Object ? optionItem : { label: optionItem };
        const active = activeIndex === idx;
        const optionStyle = [
          get_style(optionItem, `option`),
          liOptionStyle
        ].filter(Boolean).join(` `) || null;
        $$payload2.out += `<li${attr("title", disabled2 ? disabledTitle : is_selected(label) && selectedTitle || title)}${attr_class(`${stringify(liOptionClass)} ${stringify(active ? liActiveOptionClass : ``)}`, "svelte-1taxil8", {
          "selected": is_selected(label),
          "active": active,
          "disabled": disabled2
        })} role="option" aria-selected="false"${attr_style(optionStyle)}>`;
        if (option) {
          $$payload2.out += "<!--[-->";
          option($$payload2, { option: optionItem, idx });
          $$payload2.out += `<!---->`;
        } else if (children) {
          $$payload2.out += "<!--[1-->";
          children($$payload2, { option: optionItem, idx });
          $$payload2.out += `<!---->`;
        } else if (parseLabelsAsHtml) {
          $$payload2.out += "<!--[2-->";
          $$payload2.out += `${html(get_label(optionItem))}`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `${escape_html(get_label(optionItem))}`;
        }
        $$payload2.out += `<!--]--></li>`;
      }
      $$payload2.out += `<!--]--> `;
      if (searchText) {
        $$payload2.out += "<!--[-->";
        const text_input_is_duplicate = selected.map(get_label).includes(searchText);
        const is_dupe = !duplicates && text_input_is_duplicate && `dupe`;
        const can_create = Boolean(allowUserOptions && createOptionMsg) && `create`;
        const no_match = Boolean(matchingOptions?.length == 0 && noMatchingOptionsMsg) && `no-match`;
        const msgType = is_dupe || can_create || no_match;
        if (msgType) {
          $$payload2.out += "<!--[-->";
          const msg = {
            dupe: duplicateOptionMsg,
            create: createOptionMsg,
            "no-match": noMatchingOptionsMsg
          }[msgType];
          $$payload2.out += `<li${attr("title", msgType === `create` ? createOptionMsg : msgType === `dupe` ? duplicateOptionMsg : ``)} role="option" aria-selected="false"${attr_class(`user-msg ${stringify(liUserMsgClass)} ${stringify(``)}`, "svelte-1taxil8", { "active": option_msg_is_active })}${attr_style("", {
            cursor: {
              dupe: `not-allowed`,
              create: `pointer`,
              "no-match": `default`
            }[msgType]
          })}>`;
          if (userMsg) {
            $$payload2.out += "<!--[-->";
            userMsg($$payload2, { searchText, msgType, msg });
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `${escape_html(msg)}`;
          }
          $$payload2.out += `<!--]--></li>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></ul>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    activeIndex,
    activeOption,
    form_input,
    input,
    invalid,
    matchingOptions,
    open,
    options,
    outerDiv,
    searchText,
    selected,
    value
  });
  pop();
}
function scroll_into_view_if_needed_polyfill(element, centerIfNeeded = true) {
  const observer = new IntersectionObserver(([entry], obs) => {
    const ratio = entry.intersectionRatio;
    if (ratio < 1) {
      const place = ratio <= 0 && centerIfNeeded ? `center` : `nearest`;
      element.scrollIntoView({
        block: place,
        inline: place
      });
    }
    obs.disconnect();
  });
  observer.observe(element);
  return observer;
}
if (typeof Element !== `undefined` && !Element.prototype?.scrollIntoViewIfNeeded && typeof IntersectionObserver !== `undefined`) {
  Element.prototype.scrollIntoViewIfNeeded = function scrollIntoViewIfNeeded() {
    scroll_into_view_if_needed_polyfill(this);
  };
}
function createFloatingActions(initOptions) {
  let referenceElement;
  let floatingElement;
  const defaultOptions = {
    autoUpdate: true
  };
  let options = initOptions;
  const getOptions = (mixin) => {
    return { ...defaultOptions, ...initOptions || {}, ...mixin || {} };
  };
  const updatePosition = (updateOptions) => {
    if (referenceElement && floatingElement) {
      options = getOptions(updateOptions);
      computePosition(referenceElement, floatingElement, options).then((v) => {
        Object.assign(floatingElement.style, {
          position: v.strategy,
          left: `${v.x}px`,
          top: `${v.y}px`
        });
        options?.onComputed && options.onComputed(v);
      });
    }
  };
  const referenceAction = (node) => {
    if ("subscribe" in node) {
      setupVirtualElementObserver(node);
      return {};
    } else {
      referenceElement = node;
      updatePosition();
    }
  };
  const contentAction = (node, contentOptions) => {
    let autoUpdateDestroy;
    floatingElement = node;
    options = getOptions(contentOptions);
    setTimeout(() => updatePosition(contentOptions), 0);
    updatePosition(contentOptions);
    const destroyAutoUpdate = () => {
      if (autoUpdateDestroy) {
        autoUpdateDestroy();
        autoUpdateDestroy = void 0;
      }
    };
    const initAutoUpdate = ({ autoUpdate: autoUpdate$1 } = options || {}) => {
      destroyAutoUpdate();
      if (autoUpdate$1 !== false) {
        tick().then(() => {
          return autoUpdate(referenceElement, floatingElement, () => updatePosition(options), autoUpdate$1 === true ? {} : autoUpdate$1);
        });
      }
      return;
    };
    autoUpdateDestroy = initAutoUpdate();
    return {
      update(contentOptions2) {
        updatePosition(contentOptions2);
        autoUpdateDestroy = initAutoUpdate(contentOptions2);
      },
      destroy() {
        destroyAutoUpdate();
      }
    };
  };
  const setupVirtualElementObserver = (node) => {
    const unsubscribe = node.subscribe(($node) => {
      if (referenceElement === void 0) {
        referenceElement = $node;
        updatePosition();
      } else {
        Object.assign(referenceElement, $node);
        updatePosition();
      }
    });
    onDestroy(unsubscribe);
  };
  return [
    referenceAction,
    contentAction,
    updatePosition
  ];
}
function filter({
  loadOptions,
  filterText,
  items,
  multiple,
  value,
  itemId,
  groupBy,
  filterSelectedItems,
  itemFilter,
  convertStringItemsToObjects,
  filterGroupedItems,
  label
}) {
  if (items && loadOptions) return items;
  if (!items) return [];
  if (items && items.length > 0 && typeof items[0] !== "object") {
    items = convertStringItemsToObjects(items);
  }
  let filterResults = items.filter((item) => {
    let matchesFilter = itemFilter(item[label], filterText, item);
    if (matchesFilter && multiple && value?.length) {
      matchesFilter = !value.some((x) => {
        return filterSelectedItems ? x[itemId] === item[itemId] : false;
      });
    }
    return matchesFilter;
  });
  if (groupBy) {
    filterResults = filterGroupedItems(filterResults);
  }
  return filterResults;
}
async function getItems({ dispatch, loadOptions, convertStringItemsToObjects, filterText }) {
  let res = await loadOptions(filterText).catch((err) => {
    console.warn("svelte-select loadOptions error :>> ", err);
    dispatch("error", { type: "loadOptions", details: err });
  });
  if (res && !res.cancelled) {
    if (res) {
      if (res && res.length > 0 && typeof res[0] !== "object") {
        res = convertStringItemsToObjects(res);
      }
      dispatch("loaded", { items: res });
    } else {
      res = [];
    }
    return {
      filteredItems: res,
      loading: false,
      focused: true,
      listOpen: true
    };
  }
}
function ChevronIcon($$payload) {
  $$payload.out += `<svg width="100%" height="100%" viewBox="0 0 20 20" focusable="false" aria-hidden="true" class="svelte-qbd276"><path fill="currentColor" d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747
          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0
          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502
          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0
          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>`;
}
function ClearIcon($$payload) {
  $$payload.out += `<svg width="100%" height="100%" viewBox="-2 -2 50 50" focusable="false" aria-hidden="true" role="presentation" class="svelte-whdbu1"><path fill="currentColor" d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124
    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"></path></svg>`;
}
function LoadingIcon($$payload) {
  $$payload.out += `<svg class="loading svelte-1p3nqvd" viewBox="25 25 50 50"><circle class="circle_path svelte-1p3nqvd" cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10"></circle></svg>`;
}
function Select($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  push();
  let filteredItems, hasValue, hideSelectedItem, showClear, placeholderText, ariaSelection, ariaContext;
  const dispatch = createEventDispatcher();
  let justValue = fallback($$props["justValue"], null);
  let filter$1 = fallback($$props["filter"], filter);
  let getItems$1 = fallback($$props["getItems"], getItems);
  let id = fallback($$props["id"], null);
  let name = fallback($$props["name"], null);
  let container = fallback($$props["container"], void 0);
  let input = fallback($$props["input"], void 0);
  let multiple = fallback($$props["multiple"], false);
  let multiFullItemClearable = fallback($$props["multiFullItemClearable"], false);
  let disabled = fallback($$props["disabled"], false);
  let focused = fallback($$props["focused"], false);
  let value = fallback($$props["value"], null);
  let filterText = fallback($$props["filterText"], "");
  let placeholder = fallback($$props["placeholder"], "Please select");
  let placeholderAlwaysShow = fallback($$props["placeholderAlwaysShow"], false);
  let items = fallback($$props["items"], null);
  let label = fallback($$props["label"], "label");
  let itemFilter = fallback($$props["itemFilter"], (label2, filterText2, option) => `${label2}`.toLowerCase().includes(filterText2.toLowerCase()));
  let groupBy = fallback($$props["groupBy"], void 0);
  let groupFilter = fallback($$props["groupFilter"], (groups) => groups);
  let groupHeaderSelectable = fallback($$props["groupHeaderSelectable"], false);
  let itemId = fallback($$props["itemId"], "value");
  let loadOptions = fallback($$props["loadOptions"], void 0);
  let containerStyles = fallback($$props["containerStyles"], "");
  let hasError = fallback($$props["hasError"], false);
  let filterSelectedItems = fallback($$props["filterSelectedItems"], true);
  let required = fallback($$props["required"], false);
  let closeListOnChange = fallback($$props["closeListOnChange"], true);
  let clearFilterTextOnBlur = fallback($$props["clearFilterTextOnBlur"], true);
  let createGroupHeaderItem = fallback($$props["createGroupHeaderItem"], (groupValue, item) => {
    return { value: groupValue, [label]: groupValue };
  });
  const getFilteredItems = () => {
    return filteredItems;
  };
  let searchable = fallback($$props["searchable"], true);
  let inputStyles = fallback($$props["inputStyles"], "");
  let clearable = fallback($$props["clearable"], true);
  let loading = fallback($$props["loading"], false);
  let listOpen = fallback($$props["listOpen"], false);
  let timeout;
  let debounce = fallback($$props["debounce"], (fn, wait = 1) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  });
  let debounceWait = fallback($$props["debounceWait"], 300);
  let hideEmptyState = fallback($$props["hideEmptyState"], false);
  let inputAttributes = fallback($$props["inputAttributes"], () => ({}), true);
  let listAutoWidth = fallback($$props["listAutoWidth"], true);
  let showChevron = fallback($$props["showChevron"], false);
  let listOffset = fallback($$props["listOffset"], 5);
  let hoverItemIndex = fallback($$props["hoverItemIndex"], 0);
  let floatingConfig = fallback($$props["floatingConfig"], () => ({}), true);
  let containerClasses = fallback($$props["class"], "");
  let activeValue;
  let prev_value;
  let prev_filterText;
  function setValue() {
    if (typeof value === "string") {
      let item = (items || []).find((item2) => item2[itemId] === value);
      value = item || { [itemId]: value, label: value };
    } else if (multiple && Array.isArray(value) && value.length > 0) {
      value = value.map((item) => typeof item === "string" ? { value: item, label: item } : item);
    }
  }
  let _inputAttributes;
  function assignInputAttributes() {
    _inputAttributes = Object.assign(
      {
        autocapitalize: "none",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: false,
        tabindex: 0,
        type: "text",
        "aria-autocomplete": "list"
      },
      inputAttributes
    );
    if (id) {
      _inputAttributes["id"] = id;
    }
    if (!searchable) {
      _inputAttributes["readonly"] = true;
    }
  }
  function convertStringItemsToObjects(_items) {
    return _items.map((item, index) => {
      return { index, value: item, label: `${item}` };
    });
  }
  function filterGroupedItems(_items) {
    const groupValues = [];
    const groups = {};
    _items.forEach((item) => {
      const groupValue = groupBy(item);
      if (!groupValues.includes(groupValue)) {
        groupValues.push(groupValue);
        groups[groupValue] = [];
        if (groupValue) {
          groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
            id: groupValue,
            groupHeader: true,
            selectable: groupHeaderSelectable
          }));
        }
      }
      groups[groupValue].push(Object.assign({ groupItem: !!groupValue }, item));
    });
    const sortedGroupedItems = [];
    groupFilter(groupValues).forEach((groupValue) => {
      if (groups[groupValue]) sortedGroupedItems.push(...groups[groupValue]);
    });
    return sortedGroupedItems;
  }
  function dispatchSelectedItem() {
    if (multiple) {
      if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
        if (checkValueForDuplicates()) ;
      }
      return;
    }
  }
  function setupMulti() {
    if (value) {
      if (Array.isArray(value)) {
        value = [...value];
      } else {
        value = [value];
      }
    }
  }
  function setValueIndexAsHoverIndex() {
    const valueIndex = filteredItems.findIndex((i) => {
      return i[itemId] === value[itemId];
    });
    checkHoverSelectable(valueIndex, true);
  }
  function checkHoverSelectable(startingIndex = 0, ignoreGroup) {
    hoverItemIndex = startingIndex < 0 ? 0 : startingIndex;
    if (!ignoreGroup && groupBy && filteredItems[hoverItemIndex] && !filteredItems[hoverItemIndex].selectable) {
      setHoverIndex(1);
    }
  }
  function setupFilterText() {
    if (!loadOptions && filterText.length === 0) return;
    if (loadOptions) {
      debounce(
        async function() {
          loading = true;
          let res = await getItems$1({
            dispatch,
            loadOptions,
            convertStringItemsToObjects,
            filterText
          });
          if (res) {
            loading = res.loading;
            listOpen = listOpen ? res.listOpen : filterText.length > 0 ? true : false;
            focused = listOpen && res.focused;
            items = groupBy ? filterGroupedItems(res.filteredItems) : res.filteredItems;
          } else {
            loading = false;
            focused = true;
            listOpen = true;
          }
        },
        debounceWait
      );
    } else {
      listOpen = true;
      if (multiple) {
        activeValue = void 0;
      }
    }
  }
  function computeJustValue() {
    if (multiple) return value ? value.map((item) => item[itemId]) : null;
    return value ? value[itemId] : value;
  }
  function checkValueForDuplicates() {
    let noDuplicates = true;
    if (value) {
      const ids = [];
      const uniqueValues = [];
      value.forEach((val) => {
        if (!ids.includes(val[itemId])) {
          ids.push(val[itemId]);
          uniqueValues.push(val);
        } else {
          noDuplicates = false;
        }
      });
      if (!noDuplicates) value = uniqueValues;
    }
    return noDuplicates;
  }
  function findItem(selection) {
    let matchTo = selection ? selection[itemId] : value[itemId];
    return items.find((item) => item[itemId] === matchTo);
  }
  function updateValueDisplay(items2) {
    if (!items2 || items2.length === 0 || items2.some((item) => typeof item !== "object")) return;
    if (!value || (multiple ? value.some((selection) => !selection || !selection[itemId]) : !value[itemId])) return;
    if (Array.isArray(value)) {
      value = value.map((selection) => findItem(selection) || selection);
    } else {
      value = findItem() || value;
    }
  }
  function handleFocus(e) {
    if (focused && input === document?.activeElement) return;
    input?.focus();
    focused = true;
  }
  function handleClear() {
    value = void 0;
    closeList();
    handleFocus();
  }
  function closeList() {
    if (clearFilterTextOnBlur) {
      filterText = "";
    }
    listOpen = false;
  }
  let ariaValues = fallback($$props["ariaValues"], (values) => {
    return `Option ${values}, selected.`;
  });
  let ariaListOpen = fallback($$props["ariaListOpen"], (label2, count) => {
    return `You are currently focused on option ${label2}. There are ${count} results available.`;
  });
  let ariaFocused = fallback($$props["ariaFocused"], () => {
    return `Select is focused, type to refine list, press down to open the menu.`;
  });
  function handleAriaSelection(_multiple) {
    let selected = void 0;
    if (_multiple && value.length > 0) {
      selected = value.map((v) => v[label]).join(", ");
    } else {
      selected = value[label];
    }
    return ariaValues(selected);
  }
  function handleAriaContent() {
    if (!filteredItems || filteredItems.length === 0) return "";
    let _item = filteredItems[hoverItemIndex];
    if (listOpen && _item) {
      let count = filteredItems ? filteredItems.length : 0;
      return ariaListOpen(_item[label], count);
    } else {
      return ariaFocused();
    }
  }
  onDestroy(() => {
  });
  function setHoverIndex(increment) {
    let selectableFilteredItems = filteredItems.filter((item) => !Object.hasOwn(item, "selectable") || item.selectable === true);
    if (selectableFilteredItems.length === 0) {
      return hoverItemIndex = 0;
    }
    if (hoverItemIndex === filteredItems.length - 1) {
      hoverItemIndex = 0;
    } else {
      hoverItemIndex = hoverItemIndex + increment;
    }
    const hover = filteredItems[hoverItemIndex];
    if (hover && hover.selectable === false) {
      setHoverIndex(increment);
      return;
    }
  }
  function isItemActive(item, value2, itemId2) {
    if (multiple) return;
    return value2 && value2[itemId2] === item[itemId2];
  }
  function isItemFirst(itemIndex) {
    return itemIndex === 0;
  }
  let _floatingConfig = {
    strategy: "absolute",
    placement: "bottom-start",
    middleware: [
      offset(listOffset),
      flip(),
      shift()
    ],
    autoUpdate: false
  };
  const [floatingRef, floatingContent, floatingUpdate] = createFloatingActions(_floatingConfig);
  let prefloat = true;
  function listMounted(list, listOpen2) {
    return prefloat = true;
  }
  if (value) setValue();
  if (inputAttributes || !searchable) assignInputAttributes();
  if (multiple) setupMulti();
  if (multiple && value && value.length > 1) checkValueForDuplicates();
  if (value) dispatchSelectedItem();
  if (!focused && input) closeList();
  if (filterText !== prev_filterText) setupFilterText();
  filteredItems = filter$1({
    loadOptions,
    filterText,
    items,
    multiple,
    value,
    itemId,
    groupBy,
    label,
    filterSelectedItems,
    itemFilter,
    convertStringItemsToObjects,
    filterGroupedItems
  });
  if (!multiple && listOpen && value && filteredItems) setValueIndexAsHoverIndex();
  if (listOpen && multiple) hoverItemIndex = 0;
  if (filterText) hoverItemIndex = 0;
  hasValue = multiple ? value && value.length > 0 : value;
  hideSelectedItem = hasValue && filterText.length > 0;
  showClear = hasValue && clearable && !disabled && !loading;
  placeholderText = placeholderAlwaysShow && multiple ? placeholder : multiple && value?.length === 0 ? placeholder : value ? "" : placeholder;
  ariaSelection = value ? handleAriaSelection(multiple) : "";
  ariaContext = handleAriaContent();
  updateValueDisplay(items);
  justValue = computeJustValue();
  if (listOpen && filteredItems && !multiple && !value) checkHoverSelectable();
  if (container && floatingConfig) floatingUpdate(Object.assign(_floatingConfig, floatingConfig));
  listMounted();
  if (input && listOpen && !focused) handleFocus();
  if (container && floatingConfig?.autoUpdate === void 0) {
    _floatingConfig.autoUpdate = true;
  }
  $$payload.out += `<div${attr_class(`svelte-select ${stringify(containerClasses)}`, "svelte-82qwg8", {
    "multi": multiple,
    "disabled": disabled,
    "focused": focused,
    "list-open": listOpen,
    "show-chevron": showChevron,
    "error": hasError
  })}${attr_style(containerStyles)} role="none">`;
  if (listOpen) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class("svelte-select-list svelte-82qwg8", void 0, { "prefloat": prefloat })} role="none">`;
    if ($$slots["list-prepend"]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "list-prepend", {}, null);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if ($$slots.list) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "list", { filteredItems }, null);
      $$payload.out += `<!---->`;
    } else if (filteredItems.length > 0) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(filteredItems);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        $$payload.out += `<div class="list-item svelte-82qwg8" tabindex="-1" role="none"><div${attr_class("item svelte-82qwg8", void 0, {
          "list-group-title": item.groupHeader,
          "active": isItemActive(item, value, itemId),
          "first": isItemFirst(i),
          "hover": hoverItemIndex === i,
          "group-item": item.groupItem,
          "not-selectable": item?.selectable === false
        })}><!---->`;
        slot($$payload, $$props, "item", { item, index: i }, () => {
          $$payload.out += `${escape_html(item?.[label])}`;
        });
        $$payload.out += `<!----></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else if (!hideEmptyState) {
      $$payload.out += "<!--[2-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "empty", {}, () => {
        $$payload.out += `<div class="empty svelte-82qwg8">No options</div>`;
      });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if ($$slots["list-append"]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "list-append", {}, null);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <span aria-live="polite" aria-atomic="false" aria-relevant="additions text" class="a11y-text svelte-82qwg8">`;
  if (focused) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span id="aria-selection" class="svelte-82qwg8">${escape_html(ariaSelection)}</span> <span id="aria-context" class="svelte-82qwg8">${escape_html(ariaContext)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span> <div class="prepend svelte-82qwg8"><!---->`;
  slot($$payload, $$props, "prepend", {}, null);
  $$payload.out += `<!----></div> <div class="value-container svelte-82qwg8">`;
  if (hasValue) {
    $$payload.out += "<!--[-->";
    if (multiple) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(value);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let item = each_array_1[i];
        $$payload.out += `<div${attr_class("multi-item svelte-82qwg8", void 0, {
          "active": activeValue === i,
          "disabled": disabled
        })} role="none"><span class="multi-item-text svelte-82qwg8"><!---->`;
        slot($$payload, $$props, "selection", { selection: item, index: i }, () => {
          $$payload.out += `${escape_html(item[label])}`;
        });
        $$payload.out += `<!----></span> `;
        if (!disabled && !multiFullItemClearable && ClearIcon) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="multi-item-clear svelte-82qwg8"><!---->`;
          slot($$payload, $$props, "multi-clear-icon", {}, () => {
            ClearIcon($$payload);
          });
          $$payload.out += `<!----></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${attr_class("selected-item svelte-82qwg8", void 0, { "hide-selected-item": hideSelectedItem })}><!---->`;
      slot($$payload, $$props, "selection", { selection: value }, () => {
        $$payload.out += `${escape_html(value[label])}`;
      });
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <input${spread_attributes(
    {
      readonly: !searchable,
      ..._inputAttributes,
      value: filterText,
      placeholder: placeholderText,
      style: inputStyles,
      disabled
    },
    "svelte-82qwg8"
  )}/></div> <div class="indicators svelte-82qwg8">`;
  if (loading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="icon loading svelte-82qwg8" aria-hidden="true"><!---->`;
    slot($$payload, $$props, "loading-icon", {}, () => {
      LoadingIcon($$payload);
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (showClear) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<button type="button" class="icon clear-select svelte-82qwg8"><!---->`;
    slot($$payload, $$props, "clear-icon", {}, () => {
      ClearIcon($$payload);
    });
    $$payload.out += `<!----></button>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (showChevron) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="icon chevron svelte-82qwg8" aria-hidden="true"><!---->`;
    slot($$payload, $$props, "chevron-icon", { listOpen }, () => {
      ChevronIcon($$payload);
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <!---->`;
  slot($$payload, $$props, "input-hidden", { value }, () => {
    $$payload.out += `<input${attr("name", name)} type="hidden"${attr("value", value ? JSON.stringify(value) : null)} class="svelte-82qwg8"/>`;
  });
  $$payload.out += `<!----> `;
  if (required && (!value || value.length === 0)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    slot($$payload, $$props, "required", { value }, () => {
      $$payload.out += `<select class="required svelte-82qwg8" required tabindex="-1" aria-hidden="true"></select>`;
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, {
    justValue,
    filter: filter$1,
    getItems: getItems$1,
    id,
    name,
    container,
    input,
    multiple,
    multiFullItemClearable,
    disabled,
    focused,
    value,
    filterText,
    placeholder,
    placeholderAlwaysShow,
    items,
    label,
    itemFilter,
    groupBy,
    groupFilter,
    groupHeaderSelectable,
    itemId,
    loadOptions,
    containerStyles,
    hasError,
    filterSelectedItems,
    required,
    closeListOnChange,
    clearFilterTextOnBlur,
    createGroupHeaderItem,
    searchable,
    inputStyles,
    clearable,
    loading,
    listOpen,
    debounce,
    debounceWait,
    hideEmptyState,
    inputAttributes,
    listAutoWidth,
    showChevron,
    listOffset,
    hoverItemIndex,
    floatingConfig,
    class: containerClasses,
    ariaValues,
    ariaListOpen,
    ariaFocused,
    getFilteredItems,
    handleClear
  });
  pop();
}
function _page($$payload, $$props) {
  push();
  const genres = [
    "Education",
    "Political Science",
    "Data Visualisation"
  ];
  const themes = [
    { value: "short-long", label: "short-long" },
    {
      value: "conceptual-technical",
      label: "conceptual-technical"
    },
    {
      value: "descriptive-prescriptive",
      label: "descriptive-prescriptive"
    },
    { value: "art-science", label: "art-science" }
  ];
  let filterOptions = [];
  let firstTheme = themes[0];
  let secondTheme = themes[1];
  let chartData = [];
  let width = 0;
  let height = 0;
  let showModal = false;
  let modalData = {};
  let suggestionsModal = false;
  function closeModal() {
    showModal = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="header"><div class="header-left"><div class="title">Summer Reading selector</div> Filter, switch themes and browse 2025's top reads <div style="display: flex; max-height: 28px; font-size: 14px; padding-top: 10px"><div style="width: 400px">`;
    MultiSelect($$payload2, {
      true: true,
      options: genres,
      placeholder: "Genre filter",
      get selected() {
        return filterOptions;
      },
      set selected($$value) {
        filterOptions = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <button class="suggestionsButton">Suggestions?</button></div> <div style="max-width: 600px; height: 28px; display: flex; padding-top: 10px">`;
    css_props(
      $$payload2,
      true,
      {
        "--font-size": "14px",
        "--line-height": "20px",
        "--height": "20px"
      },
      () => {
        Select($$payload2, {
          items: themes,
          required: true,
          clearable: false,
          get value() {
            return firstTheme;
          },
          set value($$value) {
            firstTheme = $$value;
            $$settled = false;
          }
        });
      }
    );
    $$payload2.out += `  v  `;
    css_props(
      $$payload2,
      true,
      {
        "--font-size": "14px",
        "--line-height": "20px",
        "--height": "20px"
      },
      () => {
        Select($$payload2, {
          items: themes,
          required: true,
          clearable: false,
          get value() {
            return secondTheme;
          },
          set value($$value) {
            secondTheme = $$value;
            $$settled = false;
          }
        });
      }
    );
    $$payload2.out += `</div></div> <div class="header-right"><img src="/summerReading/hereLogo.png" alt="Logo"/></div></div> <div class="chart">`;
    QuadrantChart($$payload2, {
      chartData,
      filterOptions,
      width,
      height,
      theme1: firstTheme,
      theme2: secondTheme
    });
    $$payload2.out += `<!----> `;
    BookModal($$payload2, {
      open: showModal,
      onClose: closeModal,
      modalData
    });
    $$payload2.out += `<!----> `;
    SuggestionsModal($$payload2, {
      get show() {
        return suggestionsModal;
      },
      set show($$value) {
        suggestionsModal = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="footer">development by  <a href="https://www.bmdata.co.uk">BM Data Visualisation</a></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
