# AST Visitor

The AST visitor is used for code analysis and transformations by traversing the AST structure and performing operations on specific nodes.

## Import

```js
import { visit, visitFull } from "renit/to";
```

## Functions

### `visit`

The `visit` function is an AST visitor used to perform operations specific to certain node types. You can specify a function for each node type.

#### Example

This example uses the `visit` function to traverse an HTML AST and modify specific node types.

```js
const ast = htmlToAst('<h1 id="title">Hello World!</h1>');

visit(ast, {
  Element(node) {
    node.name = "p";
  },
  Attribute(node) {
    node.name = "class";
  },
  Text(node) {
    node.content = "Hello Everyone!";
  },
});

const html = astToHtml(ast);
//=> <p class="class">Hello Everyone!</p>
```

In this example:

- `Element` nodes are changed from `<h1>` to `<p>`.
- `Attribute` nodes are changed from `id` to `class`.
- `Text` nodes are changed from `Hello World!` to `Hello Everyone!`.

---

### `visitSimple`

The `visitSimple` function performs a simpler traversal of the AST by only visiting the `body` or `children` content. It can also be used as an additional function.

#### Example

```js
visitSimple(ast, {
  Element(node) {
    console.log(node.name);
  },
});
```

```js
visitSimple(ast, (node) => {
  if (node.type == "Comment") {
    console.log(node.content);
  }
});
```

---

### `visitFull`

The `visitFull` function provides a more comprehensive traversal by visiting every node in the AST. It can be used as an additional function.

#### Example

```js
const ast = parse("let number = 1");

visitFull(ast, {
  Identifier(node) {
    //...
  },
});

visitFull(ast, (node) => {
  if (node.type == "Identifier") {
    //...
  }
});
```

---

### `visitCondition`

The `visitCondition` function traverses the AST based on specific conditions. It can be used as an additional function and performs traversal only when a certain condition is met.

#### Example

This example uses the `visitCondition` function to traverse only `FunctionDeclaration` nodes and process `Identifier` nodes.

```js
const ast = parse("function add() { number++; }");

visitCondition(
  ast,
  {
    Identifier(node) {
      // Only logs the function identifier. Ignores the `number` identifier.
      console.log(node.name); //=> add
    },
  },
  (node) => {
    if (node.type == "FunctionDeclaration") return true;
    return false;
  },
  ["body", "id"]
);
```
