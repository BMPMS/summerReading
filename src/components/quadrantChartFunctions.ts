type ChartNode = {
    Book_Title: string;
    Author: string;
    Keywords:string;
    Summary: string;
    Genre: string;
    "Subgenre/topic": string;
    Link: string;
    "short-long": number;
    "conceptual-technical": number;
    "descriptive-prescriptive": number;
    "art-science": number;
}

function forceRectCollide() {
    let nodes: ChartNode[] = [];
    let sizes = (d:{width: number, height: number}) => [d.width || 10, d.height || 10];
    let strength = 1;
    let iterations = 1;
    let bounds: null | {x0:number,x1:number,y0: number, y1: number} = null;

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
