# CSS Parser

Parses a given CSS string to create an Abstract Syntax Tree (AST). This AST hierarchically represents the structure of the CSS. Additionally, it takes the created AST and converts it back into an CSS string.

## Import

```js
import { cssToAst, astToCss } from "renit/to";
```

## Functions

### `cssToAst`

Parses the given CSS string to create an Abstract Syntax Tree (AST).

#### Example

```js
cssToAST(`
  .title {
    background: blue;
    p {
      color: yellow;
    }
  }
`);
```

```json
{
  "type": "StyleSheet",
  "children": [
    {
      "type": "Selector",
      "name": ".title",
      "block": {
        "type": "Block",
        "content": "background:blue",
        "start": 11,
        "end": 71
      },
      "children": [
        {
          "type": "Selector",
          "name": "p",
          "block": {
            "type": "Block",
            "content": "color:yellow",
            "start": 41,
            "end": 67
          },
          "children": [],
          "start": 33,
          "end": 68
        }
      ],
      "start": 0,
      "end": 72
    }
  ]
}
```

---

### `astToCss`

Takes the created AST and converts it back into an CSS string.

#### Example

```js
astToCss({
  type: "StyleSheet",
  children: [
    {
      type: "Selector",
      name: ".title",
      block: {
        type: "Block",
        content: "background:blue",
        start: 11,
        end: 71,
      },
      children: [
        {
          type: "Selector",
          name: "p",
          block: {
            type: "Block",
            content: "color:yellow",
            start: 41,
            end: 67,
          },
          children: [],
          start: 33,
          end: 68,
        },
      ],
      start: 0,
      end: 72,
    },
  ],
});
//=> .title{background:blue}.title p{color:yellow}
```
