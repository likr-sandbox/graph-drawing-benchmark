const Benchmark = require("benchmark");
const { runD3 } = require("./d3");
const { runEgraph } = require("./egraph");
const miserables = require("./data/miserables.json");

const suite = new Benchmark.Suite();

suite
  .add("d3-force", runD3(miserables))
  .add("egraph", runEgraph(miserables))
  .on("start", () => {
    console.log("start");
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", (event) => {
    console.log(
      "Fastest is " + event.currentTarget.filter("fastest").map("name"),
    );
  })
  .on("error", (event) => {
    console.error(event.target.error);
  })
  .run({ async: true });
