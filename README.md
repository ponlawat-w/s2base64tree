# `s2base64tree`

```js
const tree = makeTree(base64s2cells);
const encodedTree = encoder.encode(tree);
console.log(encoder.interpret(tree));
const decodedTree = decoder.decode(encodedTree);
const tree2 = expandTree(decodedTree);
```
