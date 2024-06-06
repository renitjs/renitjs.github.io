# Mathematical Operations

Tools developed to facilitate mathematical operations.

## Import

```js
import { avg, sum } from "renit/math";
```

## Functions

### `add`

Adds two values together. Supports numbers, strings, and collections.

#### Example

```js
add(1, 2);
//=> 3
```

```js
add("Hello, ", "world!");
//=> Hello, world!
```

```js
const addFive = add(5);
addFive(10);
//=> 15
```

```js
add(5, [1, 2, 3]);
//=> [6, 7, 8]
```

```js
add(5, { a: 1, b: 2, c: 3 });
//=> { a: 6, b: 7, c: 8 }
```

---

### `avg`

Calculates the average of a collection. Optionally averages the values of a specified key or the result of a function applied to each element.

#### Example

```js
avg([1, 2, 3, 4]);
//=> 2.5
```

```js
avg("pages", [
  { name: "Les Miserables", pages: 176 },
  { name: "My Left Foot", pages: 1096 },
]);
//=> 636
```

```js
avg(
  (book) => book.pages,
  [
    { name: "Les Miserables", pages: 176 },
    { name: "My Left Foot", pages: 1096 },
  ]
);
//=> 636
```

```js
pipe([1, 2, 3, 4], add(10), avg);
//=> 12.5
```

---

### `divisible`

Filters a collection to include only items divisible by a given number or numbers.

#### Example

```js
divisible(2, [1, 2, 3, 4, 5, 6]);
//=> [2, 4, 6]
```

```js
divisible([2, 3], [1, 2, 3, 4, 5, 6, 12]);
//=> [6, 12]
```

```js
divisible(3, { a: 1, b: 3, c: 6, d: 9 });
//=> { b: 3, c: 6, d: 9 }
```

---

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

---

### `sum`

Calculates the sum of a collection. Optionally sums the values of a specified key or the result of a function applied to each element.

#### Example

```js
sum([1, 2, 3, 4]);
//=> 10
```

```js
sum("pages", [
  { name: "Les Miserables", pages: 176 },
  { name: "My Left Foot", pages: 1096 },
]);
//=> 1272
```

```js
sum("pages.number", [
  { name: "Les Miserables", pages: { number: 176 } },
  { name: "My Left Foot", pages: { number: 1096 } },
]);
//=> 1272
```

```js
sum(
  (auth) => auth.users.length,
  [
    { type: "Admin", users: ["Jayden", "Vanessa"] },
    { type: "Super", users: ["Noah", "Brad", "Kathryn"] },
    { type: "Editor", users: ["Cindy", "Larry", "Nelson", "Brandie"] },
  ]
);
//=> 9
```
