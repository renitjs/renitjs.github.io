# CSS Ayrıştırıcı

Verilen CSS dizesini ayrıştırarak bir Soyut Sözdizimi Ağacı (AST) oluşturur. Bu AST, CSS yapısını hiyerarşik olarak temsil eder. Ayrıca, oluşturulan AST'yi alır ve tekrar CSS dizgisine dönüştürür.

## İçe Aktarma

```js
import { cssToAst, astToCss } from "renit/to";
```

## Fonksiyonlar

### `cssToAst`

Verilen CSS stringini parse ederek bir Soyut Sözdizimi Ağacı (AST) oluşturur.

#### Örnek

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

Oluşturulan AST'yi alır ve yeniden CSS stringine dönüştürür.

#### Örnek

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
