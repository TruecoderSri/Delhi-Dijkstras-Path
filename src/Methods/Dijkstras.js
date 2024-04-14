import { Locations } from "./Locations";

import { calculateDistance } from "./distanceCalculator";

// Define the graph data structure
class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(location) {
    this.nodes[location.name] = { location, edges: {} };
  }

  addEdge(source, destination) {
    const distance = calculateDistance(source, destination);
    this.nodes[source.name].edges[destination.name] = distance;
    this.nodes[destination.name].edges[source.name] = distance;
  }
}

function dijkstra(graph, start, end) {
  const distances = {};
  const visited = {};
  const queue = new PriorityQueue();
  const path = {};
  const visitedNodes = [];

  for (const node in graph.nodes) {
    distances[node] = Infinity;
    path[node] = null;
  }
  distances[start] = 0;
  queue.enqueue(start, 0);

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue().element;
    visitedNodes.push(currentNode);

    if (currentNode === end) {
      const shortestPath = [];
      let current = end;
      while (current !== null) {
        shortestPath.push(current);
        current = path[current];
      }
      return { shortestPath: shortestPath.reverse(), visitedNodes };
    }

    if (!visited[currentNode]) {
      visited[currentNode] = true;
      for (const neighbor in graph.nodes[currentNode].edges) {
        const distance = graph.nodes[currentNode].edges[neighbor];
        const totalDistance = distances[currentNode] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          path[neighbor] = currentNode;
          queue.enqueue(neighbor, totalDistance);
        }
      }
    }
  }

  return { shortestPath: null, visitedNodes };
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Create graph and add nodes and edges
const graph = new Graph();

Locations.forEach((location) => graph.addNode(location));
for (let i = 0; i < Locations.length; i++) {
  for (let j = i + 1; j < Locations.length; j++) {
    graph.addEdge(Locations[i], Locations[j]);
  }
}

export { graph, dijkstra };
