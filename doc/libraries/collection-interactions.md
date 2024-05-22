# Collection Interactions

Useful helpers for interacting with arrays and objects.

## Import

```js
import { chunk, diff } from "renit/collect";
```

## Functions

<div class="tip">
  <p>To prevent mutation, you can use the helper functions <a href="helpers/clone">clone</a> and for sequential operations, <a href="helpers/pipe">pipe</a>. For more information on these functions, you can also refer to the <a href="guides/functional-usage">Functional Usage</a> guide.</p>
</div>

### `apply`

Applies a function to the specified collection. It can be used with arrays, objects, or promises. If the collection is an array or a promise that resolves to an array, the function is applied to the elements of the array. If the collection is an object, the function is applied to the values of the object.

#### Example

```js
apply(Math.max, [1, 2, 3, 4]); //=> 4
```

```js
await apply(Math.max, Promise.resolve([1, 2, 3, 4])); //=> 4
```

```js
apply((a, b) => a + b, { grape: 3, apple: 5 }); //=> 8
```

```js
pipe(
  { grape: 3, apple: 5 },
  apply((a, b) => a + b)
); //=> 8
```

```js
const applied = apply((a, b) => a + b);

applied([5, 3]); //=> 8
await applied(Promise.resolve([2, 2])); //=> 4
```

---

### `chunk`

Splits a collection into smaller collections of a specified size.

#### Example

```js
chunk(4, [1, 2, 3, 4, 5, 6, 7]);
//=> [[1, 2, 3, 4], [5, 6, 7]]
```

```js
chunk(2, { name: "Albert", last: "Einstein", age: "∞" });
//=> [{ name: 'Albert', last: 'Einstein' }, { age: '∞' }]
```

---

### `diff`

Finds the difference between two collections. It returns the elements that are present in the original collection but not in the compared one.

#### Example

```js
diff([1, 2, 3, 4, 7], [1, 2, 3, 4, 5, 6, 7]);
//=> [5, 6]
```

```js
await diff(
  Promise.resolve([1, 2, 3, 4, 7]),
  Promise.resolve([1, 2, 3, 4, 5, 6, 7])
);
//=> [5, 6]
```

```js
diff(
  { name: "Of Mice and Men" },
  { name: "Of Mice and Men", writer: "John Steinbeck" }
);
//=> { writer: 'John Steinbeck' }
```

```js
diff(
  { name: "Of Mice and Men", page: 325 },
  {
    name: "Of Mice and Men",
    writer: "John Steinbeck",
    page: 612,
  }
);
//=> { writer: 'John Steinbeck', page: 612 }
```

```js
const data = [1, 2, 3, 4, 7];
const compare = diff(data);

compare([1, 2, 3, 4, 5, 6, 7]); //=> [5, 6]
compare([1, 2, 3, 4, 12, 15]); //=> [12, 15]
```

---

### `each`

Iterates over each element in a collection and applies the provided function. It is useful for performing an operation on each item in an array or each key-value pair in an object.

#### Example

```js
const data = [1, 2];
each((item, index) => {
  console.log(index, item);
}, data);
//=> 0, 1
//=> 1, 2
```

```js
const data = { name: "İbn", lastname: "Sînâ" };
each((key, value, index) => {
  console.log(key, value, index);
}, data);
//=> name, İbn, 0
//=> lastname, Sînâ, 1
```

```js
const data = Promise.resolve([1, 2]);
await each((item) => {
  console.log(item);
}, data);
//=> 1
//=> 2
```

```js
const data = Promise.resolve([1, 2]);
await each(async (item) => {
  return new Promise((resolve) => {
    console.log(item);
    resolve(true);
  });
}, data);
//=> 1
//=> 2
```

```js
let total = 0;
const addTotal = each((item) => (total += item));
addTotal([1, 2]); //=> 3
addTotal([3, 4]); //=> 10
```

---

### `entries`

Returns an array of [key, value] pairs for each property of an object.

#### Example

```js
entries({ a: 1, b: "2", c: true });
//=> [['a', 1], ['b', '2'], ['c', true]]
```

```js
await entries(Promise.resolve({ a: 1, b: "2", c: true }));
//=> [['a', 1], ['b', '2'], ['c', true]]
```

---

### `every`

Checks whether every element in a collection satisfies the specified function. It returns `true` if all elements pass the test, otherwise `false`.

#### Example

```js
every((value) => value > 2, [1, 2, 3, 4]); //=> false
```

```js
every((value) => value >= 5, { grape: 5, pineapple: 10 }); //=> true
```

```js
const isGreaterThanTwo = every((value) => value > 2);
isGreaterThanTwo([1, 2, 3, 4]); //=> false
isGreaterThanTwo([3, 4, 5, 6]); //=> true
```

---

### `filter`

Selects elements from a collection based on a specified function or default filtering criteria. It returns a new collection containing only the elements that pass the test.

#### Example

```js
filter((value) => value > 2, [1, 2, 3, 4]); //=> [3, 4]
```

```js
await filter((value) => value > 2, Promise.resolve([1, 2, 3, 4])); //=> [3, 4]
```

```js
const greaterThanTwo = filter((value) => value > 2);
greaterThanTwo([1, 2, 3, 4]); //=> [3, 4]
greaterThanTwo([1, 2, 3, 4, 5]); //=> [3, 4, 5]
```

```js
// prettier-ignore
filter([0, 1, 2, null, true, 3, 4, "", undefined, false, 5, 6, '', 7, [], 8, 9, {}, 10]);
//=> [0, 1, 2, true, 3, 4, false, 5, 6, 7, 8, 9, 10]
```

```js
const data = {
  books: 194,
  users: 1458,
  collections: 500,
};
filter((value) => value < 1000, data);
//=> { books: 194, collections: 500 }
```

```js
const data = {
  books: 194,
  users: 1458,
  collections: 500,
  kits: null,
};
filter(data);
//=> { books: 194, users: 1458, collections: 500 }
```

---

### `flat`

Flattens a nested collection to the specified depth.

#### Example

```js
flat([0, 1, 2, [3, 4]]); //=> [0, 1, 2, 3, 4]
```

```js
await flat(2, Promise.resolve([0, 1, [2, [3, [4, 5]]]])); //=> [0, 1, 2, 3, [4, 5]]
```

```js
flat(Infinity, [0, 1, [2, [3, [4, 5]]]]); //=> [0, 1, 2, 3, 4, 5]
```

```js
flat({
  day: "monday",
  appointments: ["09:00", "10:00", "11:00"],
}); //=> ['monday', '09:00', '10:00', '11:00']
```

---

### `has`

Checks whether a collection contains a specific item or items. It returns `true` if the item is found, otherwise `false`.

#### Example

```js
has("c", "abcd"); //=> true
has("e", "abcd"); //=> false
```

```js
has(3, [1, 2, 3, 4]); //=> true
has(5, [1, 2, 3, 4]); //=> false
```

---

### `keys`

Returns an array containing the keys of every property in an object.

#### Example

```js
keys({
  club: "Liverpool",
  nickname: "The Reds",
}); //=> ['club', 'nickname']
```

```js
await keys(
  Promise.resolve({
    club: "Liverpool",
    nickname: "The Reds",
  })
); //=> ['club', 'nickname']
```

---

### `last`

Retrieves the last element in a collection based on a specified function or default criteria.

#### Example

```js
last([1, 2, 3]); //=> 3
```

```js
last((item) => item < 2, [1, 2, 3]); //=> 1
```

```js
last(2, [1, 2, 3]); //=> [2, 3]
```

```js
last({ name: "İsmâil", last: "Cezerî" }); //=> Cezerî
```

```js
last((item) => item < 300, {
  teachers: 30,
  books: 194,
  users: 1458,
  collections: 500,
}); //=> 194
```

```js
last(2, {
  teachers: 30,
  books: 194,
  users: 1458,
  collections: 500,
}); //=> {users: 1458, collections: 500}
```

```js
await last((item) => item < 2, Promise.resolve([1, 2, 3])); //=> 1
```

```js
const data = Promise.resolve([1, 2, 3]);
const lessThanTwoLast = last((item) => item < 2);
await lessThanTwoLast(data); //=> 1
```

---

### `loop`

Iterates over a collection of a specified length, asynchronously or synchronously, and applies a function to each index.

#### Example

```js
const data = [1, 2, 3];
let total = 0;

loop((index) => {
  total += data[index];
}, data);

console.log(total); //=> 6
```

```js
const data = [1, 2, 3];
let total = 0;

await loop(async (index) => {
  return new Promise((resolve) => {
    total += data[index];
    resolve(true);
  });
}, data);

console.log(total); //=> 6
```

```js
const data = Promise.resolve([1, 2, 3]);
let total = 0;

await loop(async (index) => {
  total++;
}, data);

console.log(total); //=> 3
```

---

### `map`

Creates a new collection by applying a function to each element in the original collection.

#### Example

```js
map((item) => item + 10, [1, 2, 3, 4]); //=> [11, 12, 13, 14]
```

```js
await map((item) => item + 10, Promise.resolve({ apple: 5, pear: 10 })); //=> { apple: 15, pear: 20 }
```

```js
const data1 = [1, 2, 3, 4];
const data2 = [5, 6, 7, 8];
const add10 = map((item) => item + 10);
add10(data1); //=> [11, 12, 13, 14]
add10(data2); //=> [15, 16, 17, 18]
```

---

### `merge`

Takes two collections and combines them into a single collection. For arrays, it concatenates the elements of both arrays, and for objects, it merges the key-value pairs of both objects. If there are common keys in the objects, the values from the second object overwrite the values from the first object.

#### Example

```js
merge(["apple", "pear"], ["orange"]);
//=> ['orange', 'apple', 'pear']
```

```js
merge({ age: 32 }, { name: "Nikola", last: "Tesla" });
//=> { name: 'Nikola', last: 'Tesla', age: 32 }
```

```js
await merge(Promise.resolve(["strawberry"]), Promise.resolve(["blackberry"]));
//=> ['blackberry', 'strawberry']
```

<div class="tip">
  <p>If you need to perform a deep merge, you can use the <code>mergeDeep</code> function.</p>
</div>

---

### `pop`

Returns the last item or the last specified number of items from a collection.

#### Example

```js
pop([1, 2, 3, 4, 5]);
//=> 5
```

```js
pop(2, [1, 2, 3, 4, 5]);
//=> [4, 5]
```

```js
pop({ name: "Ali", last: "Kuşçu", birth: "1403" });
//=> 1403
```

```js
pop(2, { name: "Ali", last: "Kuşçu", birth: "1403" });
//=> { last: 'Kuşçu', birth: '1403' }
```

---

### `push`

Adds an element to the end of an array or updates a key-value pair in an object.

#### Example

```js
const data = [1, 2, 3];
push(4, data);
//=> [1, 2, 3, 4]
```

```js
const data = [1, 2, 3];
push([4, 5], 1, data);
// [1, 2, 3, 4, 5]
```

```js
const data = { name: "Aristoteles" };
push("birth", "384 BC", data);
// { name: 'Aristoteles', birth: '384 BC' }
```

```js
const data = Promise.resolve([1, 2, 3]);
const result = await push(4, data);
console.log(result); //=> [1, 2, 3, 4]
```

```js
const data = [1, 2, 3];
const pushed = push(4);
pushed(data);
//=> [1, 2, 3, 4]
```

---

### `reduce`

Applies a function to each element of a collection, from left to right, to reduce the collection to a single value.

#### Example

```js
const sum = (a, b) => a + b;
```

```js
reduce(sum, [1, 2, 3, 4]); //=> 10
```

```js
reduce(sum, { wood: 150, stone: 50, gold: 10 }); //=> 210
```

```js
reduce(sum, 10, [1, 2, 3, 4]); //=> 20
```

```js
const total = reduce(sum);
total([1, 2, 3, 4]); //=>10
```

---

### `remove`

Removes specified keys from a collection.

#### Örnek

```js
remove([0, 1], [1, 2, 3, 4]);
//=> [empty × 2, 3, 4]
```

<div class="tip">
<p>If you want to remove the indices after the keys have been removed, you can use the <code>flat</code> function.</p>

```js
flat(remove([0, 1], [1, 2, 3, 4]));
//=> [3, 4]
```

</div>

```js
remove("date", { name: "Pîrî", last: "Reis", date: 1553 });
//=> { name: 'Pîrî', last: 'Reis' }
```

```js
remove(["subs", "pages", "roles"], {
  id: 78,
  subs: {
    id: 17,
  },
  name: "Kevin",
  pages: {
    number: 176,
  },
  roles: [
    {
      name: "Editor",
    },
    {
      name: "Admin",
    },
  ],
});

//=> { id: 78, name: 'Kevin' }
```

---

### `reverse`

Reverses the order of the elements in an array.

#### Example

```js
reverse([1, 2, 3, 4, 5]); //=> [5, 4, 3, 2, 1]
```

---

### `slice`

Extracts a section of an array based on the specified start index and an optional end index.

#### Example

```js
slice(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//=> [5, 6, 7, 8, 9, 10]
```

```js
slice([4, 2], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//=> [5, 6]
```

---

### `some`

Determines whether a collection contains a specific item.

#### Example

```js
some(3, [1, 2, 3]);
//=> true
```

```js
some((value) => value > 5, [1, 2, 3, 4, 5]);
//=> false
```

```js
some("name", { name: "Aristokles", last: "Platon" });
//=> true
```

```js
some("Platon", { name: "Aristokles", last: "Platon" });
//=> true
```

```js
some("name", "Pisagor", {
  name: "Theano",
  year: 570,
});
//=> false
```

```js
some((item) => item > 0, {
  books: 194,
  users: 1458,
  collections: 0,
});
//=> true
```

---

### `splice`

Modifies the contents of an array by removing or replacing existing elements and/or adding new elements in place.

#### Example

```js
const data = [1, 2, 3, 4, 5];
const result = splice(2, data);
//=> data = [1, 2]
//=> result = [3, 4, 5]
```

```js
const data = [1, 2, 3, 4, 5];
const result = splice([2, 1], data);
//=> data = [1, 2, 4, 5]
//=> result = [3]
```

```js
const data = [1, 2, 3, 4, 5];
const result = splice([2, 1, [10, 11]], data);
//=> data = [1, 2, 10, 11, 4, 5]
//=> result = [3]
```

```js
const data = Promise.resolve([1, 2, 3, 4, 5]);
const result = await splice(2, data);
//=> result = [3, 4, 5]
```

---

### `split`

Divides a collection into groups based on a given expression or number.

#### Example

```js
split("&", "id=1&book=5");
//=> ['id=1', 'book=5'];
```

```js
split(3, [1, 2, 3, 4, 5]);
//=> [[1, 2], [3, 4], [5]]
```

---

### `value`

Retrieves all values for a specified key.

#### Example

```js
value("type", [{ type: "element" }, { type: "text" }]);
//=> ['element', 'text']
```

```js
value("name", { name: "Cahit", last: "Arf" });
//=> Cahit
```

```js
value("roles.1.name", {
  name: "Cahit",
  roles: [{ name: "Editor" }, { name: "Admin" }],
});
//=> Admin
```

---

### `values`

Returns an array containing the values for each property of an object, or the same array for an array.

#### Example

```js
values({ name: "Galileo", last: "Galilei" });
//=> ['Galileo', 'Galilei']
```

```js
await values(Promise.resolve({ name: "Galileo", last: "Galilei" }));
//=> ['Galileo', 'Galilei']
```
