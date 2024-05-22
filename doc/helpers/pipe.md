# Pipe

It's a structure that connects functions by passing the output of one function as the arguments to another function.

## Importing

```js
import { pipe } from "renit/helper";
```

## Example Scenario

Let's say we have an array, and we want to process the elements in this array using `filter` -> `map` -> `reduce` to reach the final result.

```js
// Sum function
const sum = (a, b) => a + b;
// Our collection
const arr = [1, 2, 3, 4, 5];
```

The operation we need to perform is to find the even numbers in the `arr` collection, add 10 to these numbers, and finally, sum these numbers.

### Traditional Method

```js
const arrFilter = arr.filter((a) => a % 2 === 0);
//=> [2, 4]

const arrMap = arrFilter.map((a) => a + 10);
//=> [12, 14]

const arrReduce = arrMap.reduce(sum);
//=> 26
```

In a shorter form:

```js
arr
  .filter((a) => a % 2 === 0)
  .map((a) => a + 10)
  .reduce(sum);
//=> 26
```

The traditional method is quite understandable and looks organized. But are there any issues?

### Collection Issues

- Limited nature of JavaScript's basic collection management functions.
- Nested and repetitive methods in complex operations.
- Obligation to use multiple variables.
- Requirement to create a new function for simple repetitive operations.
- Occupying more space in project packaging.

#### Collection Interactions

> Let's be fair and criticize our own functions a bit.

The following code is entirely composed of functions from the `collect` library, hence it's easy to compose functions but becomes difficult to read. In more complex nested functions, reading becomes nearly impossible, and the process proceeds backward.

For example, to get the result in a single operation, the `arr` collection is written last, we have to perform the `filter` function inside the `map` function, and the sequence is written backwards as `reduce` -> `map` -> `filter`.

```js
import { filter, map, reduce } from "renit/collect";

reduce(
  sum,
  map(
    (a) => a + 10,
    filter((a) => a % 2 === 0, arr)
  )
);
//=> 26
```

But there's a better way.

## Pipe Method

To solve the above problem, we use the `pipe` method. We obtain the result in a single operation, and the `arr` constant is written first. We can write the `filter` and `map` functions separately and the sequence proceeds correctly as `filter` -> `map` -> `reduce`.

```js
import { pipe } from "renit/helper";
import { filter, map, reduce } from "renit/collect";

// prettier-ignore
pipe(
  arr,
  filter((a) => a % 2 === 0),
  map((a) => a + 10),
  reduce(sum)
);
//=> 26
```

This looks more readable and easier to use. You can use most functions with `pipe`. As you continue to learn, things become even simpler;

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
pipe(
  arr,
  divisible(2),
  add(10),
  sum
);
//=> 26
```

### Asynchronous Usage

The usage of the above example with the expected result from an asynchronous process;

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
await pipe(
  Promise.resolve([1, 2, 3, 4, 5]),
  divisible(2),
  add(10),
  sum
);
//=> 26
```

### Functional Usage

If you need to use a pipe operation that contains the same logic multiple times, you can create a new function without specifying the collection.

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
const total = pipe(
  divisible(2),
  add(10),
  sum
);

total([1, 2, 3, 4, 5]);
//=> 26

await total(Promise.resolve([6, 7, 8, 9, 10]));
//=> 54
```
