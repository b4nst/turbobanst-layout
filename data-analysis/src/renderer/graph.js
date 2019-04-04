const PANDA_THEME_COLORS = [
  "#35FFDC",
  "#EC2854",
  "#FFB86C",
  "#7DC1FF",
  "#B084EB",
  "#7DC1FF"
];

const radius = d => d.percentage;

const m0 = {
  id: "a6c00e65f7fa1@1",
  variables: [
    {
      inputs: ["md"],
      value: function(md) {
        return md`
# Character occcurence
        `;
      }
    },
    {
      name: "chart",
      inputs: [
        "data",
        "d3",
        "width",
        "height",
        "DOM",
        "color",
        "drag",
        "invalidation"
      ],
      value: function(data, d3, width, height, DOM, color, drag, invalidation) {
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3
              .forceLink(links)
              .id(d => d.id)
              .strength(l => Math.pow(l.value, 3))
          )
          .force("collision", d3.forceCollide().radius(radius))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(DOM.svg(width, height));

        const link = svg
          .append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg
          .append("g")
          .selectAll("circle")
          .data(nodes)
          .join("g")
          .call(drag(simulation));

        node
          .append("circle")
          .attr("r", radius)
          .attr("fill", color);

        node
          .append("text")
          .attr("text-anchor", "middle")
          .attr("fill", "#black")
          .attr("dy", ".3em")
          .attr("font-family", "helvetica")
          .attr("font-size", d => `${radius(d) / 10}em`)
          .text(d => d.id);

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        invalidation.then(() => simulation.stop());

        return svg.node();
      }
    },
    {
      name: "data",
      inputs: ["d3"],
      value: function(d3) {
        return d3.json("data.json");
      }
    },
    {
      name: "height",
      value: function() {
        return 800;
      }
    },
    {
      name: "color",
      inputs: ["d3"],
      value: d3 => d => PANDA_THEME_COLORS[d.group] || PANDA_THEME_COLORS[0]
    },
    {
      name: "drag",
      inputs: ["d3"],
      value: function(d3) {
        return simulation => {
          function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          }

          function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }

          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };
      }
    },
    {
      name: "d3",
      inputs: ["require"],
      value: function(require) {
        return require("d3@5");
      }
    }
  ]
};

const notebook = {
  id: "a6c00e65f7fa1@1",
  modules: [m0]
};

export default notebook;
