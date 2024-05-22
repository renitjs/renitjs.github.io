# Mathematical Operations

Tools developed to facilitate mathematical operations.

## Import

```js
import { avg, sum } from "renit/math";
```

## Functions

### `size`

Returns the size of a collection, such as an array, object, string, Map, Set, or Promise. For arrays and strings, it returns the length. For objects, it returns the number of enumerable properties. For Map and Set objects, it returns the number of elements. For Promise objects, it waits for the promise to resolve and returns the size of the resolved value.

#### Example

```js
size([1, 2, 3]); //=> 3
```

```js
size({ name: "Isaac", lastname: "Newton" }); //=> 2
```

```js
size("Newton"); //=> 6
```

```js
const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
size(map); //=> 3
```

```js
size(new Set([1, 2, 3])); //=> 3
```

```js
await size(Promise.resolve([1, 2, 3])); //=> 3
```
