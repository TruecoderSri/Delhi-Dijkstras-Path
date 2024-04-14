import * as d3 from "d3";
import { graph } from "./Dijkstras";

const RenderGraph = () => {
  // Select the container for the graph
  const container = d3.select("#graph-container");
  container.selectAll("*").remove();

  console.log("Graph nodes:", graph.nodes);
  const nodes = Object.keys(graph.nodes).map((node) => ({
    id: node,
    x: Math.random() * 400,
    y: Math.random() * 200,
  }));
  console.log("Nodes:", nodes);

  const edges = [];

  for (const node in graph.nodes) {
    for (const neighbor in graph.nodes[node].edges) {
      edges.push({
        source: node,
        target: neighbor,
      });
    }
  }
  console.log("Edges:", edges);

  const minX = d3.min(nodes, (d) => d.x);
  const maxX = d3.max(nodes, (d) => d.x);
  const minY = d3.min(nodes, (d) => d.y);
  const maxY = d3.max(nodes, (d) => d.y);

  const width = maxX - minX + 40;
  const height = maxY - minY + 40;
  console.log("Width:", width);
  console.log("Height:", height);

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .attr("x1", (d) => nodes.find((node) => node.id === d.source).x - minX + 20)
    .attr("y1", (d) => nodes.find((node) => node.id === d.source).y - minY + 20)
    .attr("x2", (d) => nodes.find((node) => node.id === d.target).x - minX + 20)
    .attr("y2", (d) => nodes.find((node) => node.id === d.target).y - minY + 20)
    .style("stroke", "black");

  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x - minX + 20)
    .attr("cy", (d) => d.y - minY + 20)
    .attr("r", 10)
    .style("fill", "teal");
};

export default RenderGraph;
