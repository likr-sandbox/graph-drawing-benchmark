const egraph = require("egraph-wasm/dist/nodejs");

exports.runEgraph = (data) => {
  return () => {
    const graph = new egraph.Graph();
    const indices = new Map();
    for (const node of data.nodes) {
      indices.set(node.id, graph.addNode(node));
    }
    for (const link of data.links) {
      link.strokeWidth = Math.sqrt(link.value);
      const { source, target } = link;
      graph.addEdge(indices.get(source), indices.get(target), link);
    }
    const initialCoordinates = egraph.initialPlacement(graph);
    const simulation = new egraph.Simulation(
      graph,
      (u) => initialCoordinates[u],
    );
    const forces = egraph.forceConnected(graph);
    simulation.run(forces);
  };
};
