const d3 = require("d3");

exports.runD3 = (dataIn) => {
  return () => {
    const data = JSON.parse(JSON.stringify(dataIn));
    const simulation = d3
      .forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody())
      .force(
        "link",
        d3.forceLink(data.links).id((d) => d.id),
      )
      .force("center", d3.forceCenter());
    simulation.tick(300).stop();
  };
};
