# Clone

Creates a deep copy of a collection using a structured cloning algorithm.

## Import

```js
import { clone } from "renit/helper";
```

## Mutation

In JavaScript, functions that mutate original collections (such as `pop`, `reverse`, and `splice`) directly change the content of the collections. These functions can add, remove, or modify elements within collections. Therefore, if you want to preserve the previous states of collections, it is recommended to make copies of them before using these functions.

Example without using the `clone` function:

```js
import { reverse } from "renit/collect";

const data = [1, 2, 3];
const reversed = reverse(data);

console.log(data);
//=> [3, 2, 1]

console.log(reversed);
//=> [3, 2, 1]
```

Example using the `clone` function:

```js
import { reverse } from "renit/collect";
import { clone } from "renit/helper";

const data = [1, 2, 3];
const reversed = reverse(clone(data));

console.log(data);
//=> [1, 2, 3]

console.log(reversed);
//=> [3, 2, 1]
```

Using `clone` ensures that the original `data` array remains unchanged, allowing you to safely manipulate its copy.
