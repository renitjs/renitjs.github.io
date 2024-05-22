# HTML Parser

Parses a given HTML string to create an Abstract Syntax Tree (AST). This AST hierarchically represents the structure of the HTML. Additionally, it takes the created AST and converts it back into an HTML string.

## Import

```js
import { htmlToAst, astToHtml } from "renit/to";
```

## Functions

### `htmlToAst`

Parses the given HTML string to create an Abstract Syntax Tree (AST).

#### Example

```js
htmlToAst("<h1>Hello World!</h1>");
```

```json
{
  "type": "element",
  "name": "h1",
  "voidElement": false,
  "attributes": [],
  "children": [{ "type": "text", "content": "Hello World!" }]
}
```

---

### `astToHtml`

Takes the created AST and converts it back into an HTML string.

```js
astToHtml([
  {
    type: "element",
    name: "h1",
    voidElement: false,
    attributes: [],
    children: [{ type: "text", content: "Hello World!" }],
  },
]);
//=> <h1>Hello World!</h1>
```

## Features

### Nested elements

The HTML Parser parses nested elements under the `children` array, and this process continues indefinitely.

```js
htmlToAst("<div><h1>Hello World!</h1></div>");
```

```json{6,12}
{
  "type": "element",
  "name": "div",
  "voidElement": false,
  "attributes": [],
  "children": [
    {
      "type": "element",
      "name": "h1",
      "voidElement": false,
      "attributes": [],
      "children": [{ "type": "text", "content": "Hello World!" }]
    }
  ]
}
```

### Attributes

The parser supports multiple methods for parsing attributes.

```js
htmlToAst(
  `<div class="mt-4" display={variable} data-id=5 disabled>Hello World!</div>`
);
```

```json{7,8,9,12,13,14,17,18,19,22,23}
{
  "type": "element",
  "name": "div",
  "voidElement": false,
  "attributes": [
    {
      "type": "attribute",
      "name": "class",
      "value": "mt-4"
    },
    {
      "type": "attribute",
      "name": "display",
      "value": "variable"
    },
    {
      "type": "attribute",
      "name": "data-id",
      "value": "5"
    },
    {
      "type": "attribute",
      "name": "disabled",
    }
  ],
  "children": [{ "type": "text", "content": "Hello World!" }]
}
```

#### Supported attribute parsing

- `class="mt-4"` : Using double quotes
- `class='mt-4'` : Using single quotes
- `class=mt-4` : Without quotes
- `class={mt-4}` : Using curly braces
- `class` : Attribute only

#### Attribute prefix and suffix feature

If you enable the `affix` option, you get additional attribute parsing features.

```js
htmlToAst(`<div @name="header" class:visible={display}>...</div>`, {
  attribute: { affix: true },
});
```

```json
[
  {
    "type": "attribute",
    "prefix": "@",
    "name": "name",
    "value": "header"
  },
  {
    "type": "attribute",
    "name": "class",
    "suffix": [{ "prefix": ":", "name": "visible" }],
    "value": "{display}"
  }
]
```

The standard supported affix characters are `[':', '@', '|']`. If you want to add a custom character, you can use the `addAffix` configuration.

```js
htmlToAst("<div !variable=1>OK</div>", {
  attribute: { affix: true, addAffix: ["!"] },
});
```

```json
{
  "attributes": [
    { "type": "attribute", "prefix": "!", "name": "variable", "value": "1" }
  ]
}
```

### Void elements

If the parser encounters an element that doesn't require a closing tag, it sets the `voidElement` property to `true`.

```js
htmlToAst(`<img src="renit.png" />`);
```

```json{4}
{
  "type": "element",
  "name": "img",
  "voidElement": true,
  "attributes": [
    {
      "type": "attribute",
      "name": "src",
      "value": "renit.png"
    }
  ],
  "children": []
}
```

### Whitespaces

The parser can optionally parse or ignore whitespace characters such as enter, tab, and space.

```js
htmlToAst(`
<div>
  <p> text </p>
</div>
`);
```

```json{7,15}
{
  "type": "element",
  "name": "div",
  "voidElement": false,
  "attributes": [],
  "children": [
    { "type": "text", "content": "\n        " },
    {
      "type": "element",
      "name": "p",
      "voidElement": false,
      "attributes": [],
      "children": [{ "type": "text", "content": " text " }]
    },
    { "type": "text", "content": " " }
  ]
}
```

If you don't need whitespace characters, you can set the `whitespace` option to `false`.

```js
htmlToAst(`...`, { transform: { whitespace: false } });
```

Additionally, if you want to remove leading and trailing whitespace in the content of elements, you can set the `trim` option to `true`.

```js
htmlToAst(`...`, { transform: { whitespace: false, trim: true } });
```

```json
{ "type": "text", "content": "text" }
```

### Special elements

The parser does not parse the content of special elements like `script`, `style`, and `textarea`, or comments.

```js
htmlToAst(`
<script lang="ts">
  console.log("<p>not parse</p>")
</script>
`);
```

```json
{
  "type": "element",
  "name": "script",
  "voidElement": false,
  "attributes": [{ "type": "attribute", "name": "lang", "value": "ts" }],
  "children": [
    {
      "type": "text",
      "content": "console.log(\"<p>not parse</p>\")"
    }
  ]
}
```

```js
htmlToAst(`
  <!-- single line comment <p>not parse</p> -->
  <!--
    multiple line comment
    <p>not parse</p>
  -->
`);
```

```json
{ "type": "comment", "content": "single line comment <p>not parse</p>" }
```

If you want to set a custom element that shouldn't be parsed, you can use the `addSpecial` configuration.

```js
htmlToAst(`...`, { tags: { addSpecial: ["portal"] } });
```
