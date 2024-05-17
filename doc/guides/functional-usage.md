# Functional Usage

Renit libraries offer a wide range of usage options based on functional programming principles. The functional approach allows effective invocation and composition of functions, departing from traditional methods. This comprehensive approach not only makes operations more understandable but also provides flexibility and modular organization freedom.

## Various Usage Options

Our libraries provide various usage options, offering customized solutions based on specific needs.

### 1. Classic Approach

Functions can be used by invoking them in a traditional way.

#### Example

```js
apply(Math.max, [1, 2, 3, 4]);
//=> 4
```

```js
remove(["age", "city"], { name: "John", age: 30, city: "New York" });
//=> { name: 'John' }
```

### 2. Function Creation

If you need to use a function with the same logic multiple times, you can create a new function without specifying a collection.

#### Example

```js
const max = apply(Math.max);

max([1, 2, 3, 4]);
//=> 4

max([5, 6, 7, 8]);
//=> 8
```

```js
const trim = remove(["age", "city"]);

trim({ name: "John", age: 30, city: "New York" });
//=> { name: 'John' }

trim({ name: "Hans", age: 50, city: "Hamburg" });
//=> { name: 'Hans' }
```

### 3. Usage with Pipe

To combine function outputs in a sequential and understandable way, you can use the [`pipe`](/helpers/pipe) function to compose operations.

#### Example

```js
// prettier-ignore
pipe(
  [1, 2, 3, 4],
  apply(Math.max)
);
//=> 4
```

```js
// prettier-ignore
pipe(
  { name: 'John', age: 30, city: 'New York' },
  remove(['age', 'city'])
);
//=> { name: 'John' }
```

### 4. Creating a Function with Pipe

If you need to use the same [`pipe`](/helpers/pipe) operation multiple times, you can create a new function without specifying a collection.

For example, finding even numbers in a collection, adding 10 to these numbers, and finally summing them:

```js
// prettier-ignore
const total = pipe(
  filter((a) => a % 2 === 0),
  map((a) => a + 10),
  reduce((a, b) => a + b)
);

total([1, 2, 3, 4, 5]);
//=> 26

total([6, 7, 8, 9, 10]);
//=> 54
```

These usage options not only allow you to discover the beauty of functional programming but also make your code more effective, readable, and manageable.

<div class="tip">
<p>If you use our <a href="/libraries/mathematical-operations">math</a> library for mathematical operations, you can perform these operations more easily.</p>

```js
import { add, divisible, sum } from "renit/math";

const total = pipe(divisible(2), add(10), sum);

total([1, 2, 3, 4, 5]);
//=> 26

total([6, 7, 8, 9, 10]);
//=> 54
```
</div>

Renit libraries provide an enjoyable way to understand and implement functional programming.
