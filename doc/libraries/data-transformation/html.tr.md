# HTML Ayrıştırıcı

Verilen HTML dizesini ayrıştırarak bir Soyut Sözdizimi Ağacı (AST) oluşturur. Bu AST, HTML yapısını hiyerarşik olarak temsil eder. Ayrıca, oluşturulan AST'yi alır ve tekrar HTML dizgisine dönüştürür.

## İçe Aktarma

```js
import { htmlToAst, astToHtml } from "renit/to";
```

## Fonksiyonlar

### `htmlToAst`

Verilen HTML stringini parse ederek bir Soyut Sözdizimi Ağacı (AST) oluşturur.

#### Örnek

```js
htmlToAst("<h1>Hello World!</h1>");
```

```json
{
  "type": "Document",
  "children": [
    {
      "type": "Element",
      "name": "h1",
      "voidElement": false,
      "attributes": [],
      "children": [{ "type": "Text", "content": "Hello World!" }]
    }
  ]
}
```

---

### `astToHtml`

Oluşturulan AST'yi alır ve yeniden HTML stringine dönüştürür.

```js
astToHtml({
  type: "Document",
  children: [
    {
      type: "Element",
      name: "h1",
      voidElement: false,
      attributes: [],
      children: [{ type: "Text", content: "Hello World!" }],
    },
  ],
});
//=> <h1>Hello World!</h1>
```

## Özellikler

### İç içe geçmiş öğeler

HTML Ayrıştırıcı iç içe geçmiş öğeleri `children` dizisi altında ayrıştırır ve bu süreç sonsuza kadar devam eder.

```js
htmlToAst("<div><h1>Hello World!</h1></div>");
```

```json{3,9,15}
{
  "type": "Document",
  "children": [
    {
      "type": "Element",
      "name": "div",
      "voidElement": false,
      "attributes": [],
      "children": [
        {
          "type": "Element",
          "name": "h1",
          "voidElement": false,
          "attributes": [],
          "children": [{ "type": "Text", "content": "Hello World!" }]
        }
      ]
    }
  ]
}
```

### Öznitelikler

Ayrıştırıcı, öznitelikleri ayrıştırırken birden fazla kullanım yöntemini destekler.

```js
htmlToAst(
  `<div class="mt-4" display={variable} data-id=5 disabled>Hello World!</div>`
);
```

```json{7,8,9,12,13,14,17,18,19,22,23}
{
  "type": "Element",
  "name": "div",
  "voidElement": false,
  "attributes": [
    {
      "type": "Attribute",
      "name": "class",
      "value": "mt-4"
    },
    {
      "type": "Attribute",
      "name": "display",
      "value": "variable"
    },
    {
      "type": "Attribute",
      "name": "data-id",
      "value": "5"
    },
    {
      "type": "Attribute",
      "name": "disabled",
    }
  ],
  "children": [{ "type": "Text", "content": "Hello World!" }]
}
```

#### Desteklenen öznitelik ayrıştırmaları

- `class="mt-4"` : Çift tırnak işareti içerisinde kullanım
- `class='mt-4'` : Tek tırnak işareti içerisinde kullanım
- `class=mt-4` : Tırnak işareti olmadan kullanım
- `class={mt-4}` : Köşeli parantez kullanımı
- `class` : Sadece öznitelik olarak kullanım

#### Öznitelik önek ve sonek özelliği

Eğer `affix` seçeneği aktifleştirirseniz ekstra öznitelik ayrıştma özellikleri edinirsiniz.

```js
htmlToAst(`<div @name="header" class:visible={display}>...</div>`, {
  attribute: { affix: true },
});
```

```json
[
  {
    "type": "Attribute",
    "prefix": "@",
    "name": "name",
    "value": "header"
  },
  {
    "type": "Attribute",
    "name": "class",
    "suffix": [{ "prefix": ":", "name": "visible" }],
    "value": "{display}"
  }
]
```

Standart olarak desteklediğimiz ekler `[':', '@', '|']` karakterleridir. Eğer özel bir kararkter eklemek isterseniz `addAffix` yapılandırmasını kullanabilirsiniz.

```js
htmlToAst("<div !variable=1>OK</div>", {
  attribute: { affix: true, addAffix: ["!"] },
});
```

```json
{
  "attributes": [
    { "type": "Attribute", "prefix": "!", "name": "variable", "value": "1" }
  ]
}
```

### Void elementler

Eğer ayrıştırıcı, kapanış etiketine ihtiyaç duymayan bir öğe ile karşılaşırsa, `voidElement` özelliğini `true` olarak ayarlar.

```js
htmlToAst(`<img src="renit.png" />`);
```

```json{4}
{
  "type": "Element",
  "name": "img",
  "voidElement": true,
  "attributes": [
    {
      "type": "Attribute",
      "name": "src",
      "value": "renit.png"
    }
  ],
  "children": []
}
```

### Boşluk karakterleri

Ayrıştırıcı, boşluk karakterleri olarak bilinen (enter, tab, space) karakterleri isteğe bağlı olarak ayrıştırır veya ayrıştırmasını kapatır.

```js
htmlToAst(`
<div>
  <p> text </p>
</div>
`);
```

```json{7,15}
{
  "type": "Element",
  "name": "div",
  "voidElement": false,
  "attributes": [],
  "children": [
    { "type": "Text", "content": "\n        " },
    {
      "type": "Element",
      "name": "p",
      "voidElement": false,
      "attributes": [],
      "children": [{ "type": "Text", "content": " text " }]
    },
    { "type": "Text", "content": "\n" }
  ]
}
```

Boşluk karakterlerine ihtiyacınız yoksa, `whitespace` özelliğini `false` olarak yapılandırabilirsiniz.

```js
htmlToAst(`...`, { transform: { whitespace: false } });
```

Ayrıca, öğelerin içeriklerinde baştaki ve sondaki boşlukları kaldırmak isterseniz, `trim` özelliğini `true` olarak ayarlayabilirsiniz.

```js
htmlToAst(`...`, { transform: { whitespace: false, trim: true } });
```

```json
{ "type": "Text", "content": "text" }
```

### Özel elementler

Ayrıştırıcı, `script`, `style` ve `textarea` gibi özel elementlerin ve yorum satırlarının içeriğini ayrıştırmaz.

```js
htmlToAst(`
<script lang="ts">
  console.log("<p>not parse</p>")
</script>
`);
```

```json
{
  "type": "Element",
  "name": "script",
  "voidElement": false,
  "attributes": [{ "type": "Attribute", "name": "lang", "value": "ts" }],
  "children": [
    {
      "type": "Text",
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
{ "type": "Comment", "content": "single line comment <p>not parse</p>" }
```

Ayrıştırılmasını istemediğiniz özel bir öğe ayarlamak isterseniz, `addSpecial` yapılandırmasını kullanabilirsiniz.

```js
htmlToAst(`...`, { tags: { addSpecial: ["portal"] } });
```

### Dizin ve konumlar

`index` veya `loc` seçeneklerini etkinleştirirseniz, ayrıştırılan öğelerin pozisyon bilgileri de AST'ye eklenir. Bu, öğelerin başlangıç ve bitiş konumlarını belirlemeye yarar ve özellikle hata ayıklama ve metin işlemleri sırasında faydalıdır.

#### Örnekler

#### 1. **Dizin Bilgileriyle Ayrıştırma**

`index` seçeneği etkinleştirildiğinde, her bir öğenin başlangıç ve bitiş dizinleri AST'ye eklenir. Bu, öğelerin metin içindeki kesin konumlarını belirtir.

```js
htmlToAst("<h1>Hello World!</h1>", { position: { index: true } });
```

```json
{
  "type": "Element",
  "name": "h1",
  "voidElement": false,
  "attributes": [],
  "children": [
    {
      "type": "Text",
      "content": "Hello World!",
      "start": 4,
      "end": 16
    }
  ],
  "start": 0,
  "end": 21
}
```

#### 2. **Konum Bilgileriyle Ayrıştırma**

`loc` seçeneği etkinleştirildiğinde, her bir öğenin başlangıç ve bitiş satır ve sütun bilgileri AST'ye eklenir. Bu, öğelerin dosya içindeki konumlarını belirler.

```js
htmlToAst(
  `
<h1>Hello
World!</h1>
`,
  { position: { loc: true } }
);
```

```json
{
  "type": "Element",
  "name": "h1",
  "voidElement": false,
  "attributes": [],
  "children": [
    {
      "type": "Text",
      "content": "Hello World!",
      "loc": {
        "start": {
          "line": 1,
          "column": 4
        },
        "end": {
          "line": 2,
          "column": 6
        }
      }
    }
  ],
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 2,
      "column": 11
    }
  }
}
```
