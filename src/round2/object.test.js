import assert from "node:assert";
import test from "node:test";
import graph from "./object.js";

test("can iterate over the keys of the object", async () => {
  const keys = [];
  for await (const key of graph) {
    keys.push(key);
  }
  assert.deepEqual(keys, ["Alice.md", "Bob.md", "Carol.md"]);
});

test("can get the value for a key", async () => {
  const alice = await graph.get("Alice.md");
  assert.equal(alice, "Hello, **Alice**.");
});