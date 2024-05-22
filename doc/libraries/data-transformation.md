# Data Transformation

It converts the types or values of variables or constants.

## Import

```js
import { toArray, toJson } from "renit/to";
```

## Functions

### `toArray`

Converts a collection into a array. If the collection is an object, it returns an array of the object's values.

#### Example

```js
toArray([1, 2, 3, "b", "c"]);
//=> [1, 2, 3, 'b', 'c']
```

```js
toArray({
  name: "Elon Musk",
  companies: ["Tesla", "Space X", "SolarCity"],
});
//=> ['Elon Musk', ['Tesla', 'Space X', 'SolarCity']]
```

```js
// prettier-ignore
pipe(
  {
    name: { first: "Lionel", middle: "Andrés", last: "Messi" },
    surname: "Cuccittini",
  },
  (info) => info.name,
  toArray,
  join(" ")
);
//=> Lionel Andrés Messi
```

> If the given collection is an array, it returns the same array reference. If it's an object, it returns an array of the object's values. For example, it returns the same array reference for `[1, 2, 3, 'b', 'c']` and an array `['Elon Musk', ['Tesla', 'Space X', 'SolarCity']]` for `{ name: 'Elon Musk', companies: ['Tesla', 'Space X', 'SolarCity'] }`.

---

### `toAsync`

Converts an `Iterable` collection into an `AsyncIterable` to process the values as `Promises`.

#### Example

```js
let acc = 0;
for await (const item of toAsync([1, 2, 3, 4, 5])) {
  acc += item;
}
//=> 15
```

```js
// Using pipe
await pipe(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  toAsync,
  map((a) => a + 10),
  toArray
);
//=> [11, 12, 13]
```

> This function takes an iterable collection and converts it into an `AsyncIterable`, allowing you to handle each value as a `Promise`. For example, by passing the array `[1, 2, 3, 4, 5]` to the `toAsync` function, you can access and sum these values asynchronously. It can also be combined with other operations using the `pipe` function. For instance, it can take an array of promises, add 10 to each value, and return the result as an array.

---

### `toJson`

Converts the specified collection into JSON format.

#### Example

```js
toJson([1, 2, 3, "b", "c"]);
//=> string [1,2,3,"b","c"]
```

```js
toJson({
  id: 384,
  name: "Rayquaza",
  gender: "NA",
});
//=> string {"id":384,"name":"Rayquaza","gender":"NA"}
```

> For example, if you pass the array `[1, 2, 3, 'b', 'c']` to the `toJson` function, the result will be the string `"[1, 2, 3, 'b', 'c']"`. Similarly, using the object `{ id: 384, name: 'Rayquaza', gender: 'NA' }`, the resulting JSON format will be `{"id": 384, "name": "Rayquaza", "gender": "NA"}`.

---

### `toString`

Returns the specified value as a string.

#### Example

```js
toString([1, 2, 3, 4, 5]);
//=> string 1,2,3,4,5
```

```js
toString({ id: 1 });
//=> [object Object]
```

> For example, if you pass the array `[1, 2, 3, 4, 5]` to the `toString` function, the result will be the string `"1, 2, 3, 4, 5"`. However, objects will be converted to the standard string format `[object Object]`.

---

### `toStringify`

Converts a collection to its JSON string representation or other types of strings.

#### Example

```js
toStringify([1, 2, 3, 4, 5]);
//=> string 1,2,3,4,5
```

```js
toStringify({ id: 1 });
//=> {"id":1}
```

> The function `toStringify` corrects the result of the `toString` function for objects, which usually returns `[object Object]`, and instead converts objects to JSON format. For example, using the `{ id: 1 }` object would result in the string `"{\"id\":1}"`.
