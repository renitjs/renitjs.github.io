# Type and Value Checks

Provides information about the types, values of variables or constants, and general details about the environment in which the system operates.

> **Some Errors in the JavaScript Language** For example;

```js
// This stands since the beginning of JavaScript
typeof null === "object";
```

_[↪ reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)_

In JavaScript, `null` is actually considered an `Object`. However, adjustments have been made in this library for such chronic errors to better align with our perspective.

## Import

```js
import { isArray, isEmpty } from "renit/is";
```

## Functions

### `isArray`

Checks whether the specified value is an array or not. If the value is an array, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isArray(["pear", "grape", "cherry", "lemon"]); //=> true
```

```js
isArray(100); //=> false
```

```js
isArray("Super User"); //=> false
```

```js
isArray({
  club: "Barcelona",
  players: ["Gavi", "Pedri", "İlkay"],
});
//=> false
```

---

### `isArrayLike`

Checks whether the specified value resembles an array or not. It typically checks if the value has a `length` property and if that property holds a numeric value. If these conditions are met, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isArrayLike([1, 2, 3]); //=> true
```

```js
isArrayLike({ 0: "apple", 1: "orange", length: 2 }); //=> true
```

```js
isArrayLike("fruits"); //=> true
```

```js
isArrayLike(document.body.children); //=> true
```

```js
isArrayLike(null); //=> false
```

```js
isArrayLike(() => {}); //=> false
```

> In the example above, the `isArrayLike` function contains the necessary conditions to check if the given value resembles an array. These conditions allow values that meet the specified conditions to be considered array-like. If a value is not a function, greater than or equal to 0, and has a `value.length` that is less than or equal to `Number.MAX_SAFE_INTEGER`, it is considered array-like.

---

### `isAsync`

Checks whether the specified value is an asynchronous function or not. If the value is an asynchronous function, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a function is declared with the `async` keyword.

#### Example

```js
isAsync(() => {}); //=> false
```

```js
isAsync(async () => {}); //=> true
```

---

### `isAsyncIterable`

Checks whether the specified value is an asynchronously iterable or not. If the value is an asynchronously iterable, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isAsyncIterable([1, 2, 3]); //=> false
```

```js
isAsyncIterable(Promise.resolve([1, 2, 3])); //=> false
```

```js
isAsyncIterable(toAsync([1, 2, 3])); //=> true
```

---

### `isBoolean`

Checks whether the specified value is of the boolean data type or not. If the value is a boolean, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isBoolean(true); //=> true
```

```js
isBoolean(false); //=> true
```

```js
isBoolean(["price", "discount"]); //=> false
```

```js
isBoolean(null); //=> false
```

> For example, returns `true` for the values `true` or `false`, `false` for other cases.

---

### `isClass`

Checks whether the specified value is a class or not. If the value is a class, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a value is a class definition or an instance of a class.

#### Example

```js
class Router {
  constructor() {
    this.routes = {};
  }
}

isClass(Router); //=> true
```

> For example, returns `true` for the `Router` class, `false` for other cases.

If a class is assigned to a variable and checked:

```js
const router = new Router();
isClass(router); //=> false
```

The result will be `false`.

---

### `isClient`

Checks whether the current environment is a client-side environment or not. If the environment is client-side, it returns `true`; otherwise, it returns `false`. This function is used to conditionally execute code based on whether it is running on the client-side or the server-side.

#### Example

```js
if (isClient()) {
  //=> true | false
  // Client-side code block
} else {
  // Server-side code block
}
```

---

### `isCollect`

Checks whether the specified value is a collection or not. We use the term 'collection' to refer to both array and object types, grouping them under a single category. If the value is a collection, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isCollect([1, 2, 3]); //=> true
```

```js
isCollect({
  firstname: "Albert",
  lastname: "Einstein",
});
//=> true
```

---

### `isDate`

Checks whether the specified value is of type `Date` or not. If the value is a `Date` object, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a value is an instance of the `Date` class.

#### Example

```js
isDate(new Date()); //=> true
```

```js
isDate(new Date().getTime()); //=> false
```

---

### `isElement`

Checks if a value is an Element object.

#### Example

```js
isElement(document.createElement("div")); //=> true
```

```js
isElement(document.createTextNode("Hi there and greetings!")); //=> false
```

---

### `isEmpty`

Checks if the specified value is empty. It considers a value as empty if it is an empty string, symbol, collection (array, object, Map, Set), or other primitive types such as number, null, undefined, boolean, function, or regular expression. If the value is empty, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isEmpty([]); //=> true
isEmpty([1, 2, 3]); //=> false
```

```js
isEmpty({}); //=> true
isEmpty({ foo: "bar" }); //=> false
isEmpty(Object.create(null)); //=> true
isEmpty(Object.create({})); //=> true
isEmpty(Object.create({ foo: "bar" })); //=> false
```

```js
isEmpty(new Map()); //=> true
isEmpty(new Map().set("foo", "bar")); //=> false
```

```js
isEmpty(new Set()); //=> true
isEmpty(new Set([1, 2, 3])); //=> false
```

```js
isEmpty(Symbol()); //=> true
isEmpty(Symbol("foo")); //=> false
```

```js
isEmpty(""); //=> true
isEmpty(String("")); //=> true
isEmpty(new String("")); //=> true
isEmpty("foo"); //=> false
isEmpty(String("foo")); //=> false
isEmpty(new String("foo")); //=> false
```

```js
isEmpty(0); //=> true
isEmpty(Number(0)); //=> true
isEmpty(new Number(0)); //=> true
isEmpty(1); //=> true
isEmpty(Number(1)); //=> true
isEmpty(new Number(1)); //=> true
```

```js
isEmpty(true); //=> true
isEmpty(Boolean(true)); //=> true
isEmpty(new Boolean(true)); //=> true
isEmpty(false); //=> true
isEmpty(Boolean(false)); //=> true
isEmpty(new Boolean(false)); //=> true
```

```js
isEmpty(function noop() {}); //=> true
isEmpty(class MyClass {}); //=> true
```

```js
isEmpty(/s+/g); //=> true
isEmpty(new RegExp("s+", "g")); //=> true
```

```js
isEmpty(null); //=> true
isEmpty(undefined); //=> true
```

---

### `isEqual`

Checks if the two specified values are equal. It compares the values deeply, recursively comparing each property of objects. If the values are equal, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isEqual([1, 2, 3], [1, 2, 3]); //=> true
```

```js
isEqual({ a: { b: 1 } }, { a: { b: 1 } }); //=> true
```

```js
const brand = "New Balance";
isEqual(typeof brand, "string"); //=> true
```

```js
const checkPermission = (userId) => {
  return true;
};
isEqual(checkPermission(), true); //=> true
```

---

### `isError`

Checks whether the specified value belongs to the error class or not. If the value is an instance of an error class, it returns `true`; otherwise, it returns `false`.

#### Example

```js
const error = new Error();
isError(error); //=> true
```

```js
try {
  //...//
} catch (error) {
  if (isError(error)) {
    //=> true
  }
}
```

---

### `isEven`

Checks whether the specified value is an even number or not. If the value is an even number, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a value is divisible by 2 without a remainder.

#### Example

```js
isEven(6); //=> true
```

```js
isEven(5); //=> false
```

> In the example above, the `isEven` function checks if the remainder of the parameter divided by 2 is 0. If the remainder is 0, the function returns `true`; otherwise, it returns `false`.

---

### `isFalse`

Checks whether the specified value is equal to `false`. If the value is `false`, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isFalse(false); //=> true
```

```js
isFalse(true); //=> false
```

---

### `isFalsy`

Checks whether the specified value is falsy. If the value is falsy, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a value evaluates to false in a boolean context.

#### Example

```js
isFalsy(true); //=> false
```

```js
isFalsy(" "); //=> false
```

```js
isFalsy(1); //=> false
```

```js
isFalsy(false); //=> true
```

```js
isFalsy(""); //=> true
```

```js
isFalsy(0); //=> true
```

---

### `isFloat`

Checks whether the specified value is a floating-point number or not. If the value is a floating-point number, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isFloat(34.5); //=> true
```

```js
isFloat(23); //=> false
```

> For example, returns `true` for `34.5`, `false` for `23`.

---

### `isFunction`

Checks whether the specified value is a function or not. If the value is a function, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isFunction(function test() {
  return "This is test function.";
}); //=> true
```

```js
isFunction("This is a test function."); //=> false
```

---

### `isInteger`

Checks whether the specified value is an integer or not. If the value is an integer, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isInteger(1); //=> true
```

```js
isInteger(9007199254740992); //=> true
```

```js
isInteger(-9007199254740992); //=> true
```

```js
isInteger(-100000); //=> true
```

```js
isInteger(0); //=> true
```

```js
isInteger(0.1); //=> false
```

```js
isInteger(Math.PI); //=> false
```

```js
isInteger(NaN); //=> false
```

```js
isInteger("10"); //=> false
```

```js
/**
 * Number.MAX_VALUE is actually a floating-point number, but
 * it is likely that JavaScript's own function is incorrect.
 * We have not added extra code to fix it for now.
 */
isInteger(Number.MAX_VALUE); //=> true
```

```js
isInteger(Infinity); //=> false
```

---

### `isIterable`

Checks whether the specified collection is iterable or not. If the collection is iterable, it returns `true`; otherwise, it returns `false`. This function is used to determine whether a collection can be iterated over using a loop or iterator.

#### Example

```js
isIterable("Isaac Newton"); //=> true
```

```js
isIterable([1, 2, 3]); //=> true
```

```js
isIterable(new Map()); //=> true
```

```js
isIterable(new Set()); //=> true
```

```js
isIterable({ id: 1 }); //=> false
```

```js
isIterable(toAsync([1, 2, 3])); //=> false
```

```js
isIterable(new WeakMap()); //=> false
```

> For example, returns `true` for iterable objects like arrays, strings, Map, or Set; `false` for other cases.

---

### `isKey`

checks whether the specified value is a key belonging to the given source. If the value is a key of the source, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isKey("fullname", {
  name: "Messi",
  fullname: "Lionel Andrés Messi Cuccittini",
}); //=> true
```

---

### `isLocalStorage`

Checks whether the browser supports the `localStorage` feature or not. If the feature is supported, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isLocalStorage(); //=> true || false
```

---

### `isNaN`

Checks whether the specified value is `NaN` and whether its type is `Number`. If the value is `NaN`, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isNaN(NaN); //=> true
isNaN(Number.NaN); //=> true
isNaN(0 / 0); //=> true
```

```js
isNaN(true); //=> false
isNaN(null); //=> true
isNaN(37); //=> false
isNaN("37"); //=> false
isNaN("37.37"); //=> false
isNaN(""); //=> true
isNaN(" "); //=> true
```

```js
// Bunlar global isNaN() ile doğru olurdu.
isNaN("NaN"); //=> false
isNaN(undefined); //=> false
isNaN({}); //=> false
isNaN("renit"); //=> false
```

> For example, returns `true` for `NaN`, `Number.NaN`, and `0 / 0`; `false` for other cases.

---

### `isNil`

Checks whether the specified value is null or undefined. If the value is null or undefined, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isNil(null); //=> true
```

```js
isNil(undefined); //=> true
```

```js
isNil({ foo: "bar" }); //=> false
```

> For example, returns `true` for `null` or `undefined`; `false` for other cases.

---

### `isNode`

Checks if a value is a Node object.

#### Example

```js
isNode(document.createElement("div")); //=> true
```

```js
isNode(document.createTextNode("Hi there and greetings!")); //=> true
```

---

### `isNull`

Checks whether the specified value is null. If the value is null, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isNull(null); //=> true
```

```js
isNull(undefined); //=> false
```

> For example, returns `true` for `null`; `false` for `undefined`.

---

### `isNumber`

Checks whether the specified value is a number. If the value is a number, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isNumber(10); //=> true
```

```js
isNumber("10"); //=> false
```

```js
isNumber(new Date()); //=> false
```

```js
isNumber(new Date().getTime()); //=> true
```

```js
isNumber(true); //=> false
```

```js
isNumber(null); //=> false
```

```js
isNumber(undefined); //=> false
```

```js
isNumber(""); //=> false
```

```js
isNumber(NaN); //=> true
```

> For example, returns `true` for `10`, `'10'`, and `new Date().getTime()`; `false` for other cases.

---

### `isObject`

Checks whether the specified value is a real object. If the value is a real object, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isObject({ number: 15 }); //=> true
```

```js
isObject([1, 2, 3]); //=> false
```

```js
isObject(null); //=> false
```

> For example, returns `true` for `{ number: 15}`, and `false` for `[1, 2, 3]` and `null`. Note that in JavaScript, data types like `null` and `Array` are often considered objects. If you want to specifically check for real objects, you can use the `isObjects` function.

---

### `isObjects`

Checks whether the specified value is an object. If the value is an object, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isObjects({ number: 15 }); //=> true
```

```js
isObjects([1, 2, 3]); //=> true
```

```js
isObjects(null); //=> true
```

> For example, returns `true` for `{ number: 15}`, `[1, 2, 3]`, and `null`. This function considers data types like `null` and `Array` as objects in JavaScript.

---

### `isOdd`

Checks whether the specified value is an odd number. If the value is an odd number, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isOdd(6); //=> false
```

```js
isOdd(5); //=> true
```

> In the above example, the `isOdd` function checks if the remainder of the parameter divided by 2 is not 0. If the remainder is not 0, the function returns `true`; otherwise, it returns `false`.

---

### `isPrimitive`

Checks whether the specified value is a primitive type. If the value is a primitive type, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isPrimitive(null); //=> true
```

```js
isPrimitive(undefined); //=> true
```

```js
isPrimitive(123); //=> true
```

```js
isPrimitive("renit"); //=> true
```

```js
isPrimitive(false); //=> true
```

```js
isPrimitive(function () {}); //=> false
```

```js
isPrimitive({}); //=> false
```

```js
isPrimitive(new Date()); //=> false
```

---

### `isPromise`

Checks whether the specified value is a Promise. If the value is a Promise, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isPromise(new Promise(resolve, reject)); //=> true
```

```js
isPromise(Promise.resolve("Success")); //=> true
```

```js
isPromise(Promise.reject("Error")); //=> true
```

```js
isPromise(function () {
  return Promise.resolve("Success");
}); //=> false
```

> For example, returns `true` for `new Promise(resolve, reject)`, `Promise.resolve('Success')`, and `Promise.reject('Error')`. For a value of type `function`, it returns `false`.

---

### `isRegExp`

Checks whether the specified value is a regular expression. If the value is a regular expression, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isRegExp(/^[0-9a-fA-F]+$/); //=> true
```

```js
isRegExp("/^[0-9a-fA-F]+$/"); //=> false
```

> For example, returns `true` for `/^[0-9a-fA-F]+$/` and `false` for `'/^[0-9a-fA-F]+$/`.

---

### `isServer`

Checks whether the current environment is a server-side environment. If the environment is a server, it returns `true`; otherwise, it returns `false`.

#### Example

```js
if (isServer()) {
  //=> true | false
  // Server-side code block
} else {
  // Client-side code block
}
```

---

### `isString`

Checks whether the specified value is a string. If the value is a string, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isString(["a", "b", "c", "d"]); //=> false
```

```js
isString(100); //=> false
```

```js
isString("Lorem ipsum dolor sit amet"); //=> true
```

```js
isString({ a: "a", b: "b" }); //=> false
```

> For example, returns `true` for `'Lorem ipsum dolor sit amet'`, and `false` for `[ 'a', 'b', 'c', 'd' ]` and `100`.

---

### `isSymbol`

Checks whether the specified value is a symbol. If the value is a symbol, it returns `true`; otherwise, it returns `false`. Symbols are unique and immutable values that can be used as object property keys.

#### Example

```js
isSymbol(Symbol()); //=> true
```

```js
isSymbol(Symbol("foo")); //=> true
```

```js
isSymbol(Symbol.for("foo")); //=> true
```

```js
isSymbol(Symbol.iterator); //=> true
```

```js
isSymbol("foo"); //=> false
```

> For example, returns `true` for `Symbol()`, and `false` for `'foo'`.

---

### `isText`

Checks if the given value is an instance of the Text interface.

#### Example

```js
isText(document.createElement("div")); //=> false
```

```js
isText(document.createTextNode("Hi there and greetings!")); //=> true
```

---

### `isTrue`

Checks whether the specified value is equal to `true`. If the value is `true`, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isTrue(true); //=> true
```

```js
isTrue(false); //=> false
```

---

### `isTruthy`

Checks whether the specified value evaluates to `true`. If the value is truthy, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isTruthy(true); //=> true
```

```js
isTruthy(" "); //=> true
```

```js
isTruthy(1); //=> true
```

```js
isTruthy(false); //=> false
```

```js
isTruthy(""); //=> false
```

```js
isTruthy(0); //=> false
```

---

### `isType`

Determines the actual type of the given value.

#### Example

```js
isType(Promise.resolve("something"));
//=> default => object
//=> return => promise
```

```js
isType(1); //=> number
```

```js
isType("text"); //=> string
```

```js
isType(() => {}); //=> function
```

```js
isType(async () => {});
//=> default => function
//=> return => async
```

```js
isType(new Date());
//=> default => object
//=> return => date
```

```js
isType(new Error());
//=> default => object
//=> return => error
```

```js
isType(Symbol("is")); //=> symbol
```

```js
isType(class User {});
//=> default => function
//=> return => class
```

```js
isType(new User()); //=> object
```

> For example, returns `number` for `1`, `string` for `'text'`, and `async` for `async () => {}`.

---

### `isUndefined`

Checks whether the specified value is undefined. If the value is undefined, it returns `true`; otherwise, it returns `false`.

#### Example

```js
isUndefined(null); //=> false
```

```js
isUndefined(undefined); //=> true
```

```js
isUndefined({ foo: "bar" }); //=> false
```

> For example, returns `true` for `undefined`, `false` for `null`.
