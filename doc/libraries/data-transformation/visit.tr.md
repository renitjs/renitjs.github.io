# AST Gezici

AST yapısını gezerek ve belirli düğümler üzerinde işlemler yaparak kod analizi ve dönüştürmeleri gerçekleştirmek için kullanılır.

## İçe Aktarma

```js
import { visit, visitFull } from "renit/to";
```

## Fonksiyonlar

### `visit`

`visit` fonksiyonu, belirli düğüm türlerine özel işlemler yapmak için kullanılan bir AST gezicisidir. Her düğüm türü için bir işlev belirtebilirsiniz.

#### Örnek

Bu örnek, `visit` fonksiyonunu kullanarak bir HTML AST'sini ziyaret eder ve belirli düğüm türlerini değiştirir.

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
//=> <p class="title">Hello Everyone!</p>
```

Bu örnekte:

- `Element` düğümleri `<h1>` yerine `<p>` olarak değiştirilir.
- `Attribute` düğümleri `id` yerine `class` olarak değiştirilir.
- `Text` düğümleri `Hello World!` yerine `Hello Everyone!` olarak değiştirilir.

---

### `visitSimple`

`visitSimple` fonksiyonu, yalnızca `body` veya `children` içeriğini gezerek daha basit ve belirli bir AST gezme işlemi yapar. Ayrıca, ekstra bir fonksiyon olarak da kullanılabilir.

#### Örnek

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

`visitFull` fonksiyonu, AST'nin her bir düğümünü gezerek daha kapsamlı bir gezinti sağlar. Ekstra bir fonksiyon olarak kullanılabilir.

#### Örnek

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

`visitCondition` fonksiyonu, belirli koşullara bağlı olarak AST'yi gezer. Ekstra fonksiyon olarak kullanılabilir ve belirli bir koşul sağlandığında gezintiyi gerçekleştirir.

#### Örnek

Bu örnek, `visitCondition` fonksiyonunu kullanarak yalnızca `FunctionDeclaration` düğümlerini gezer ve `Identifier` düğümlerini işler.

```js
const ast = parse("function add() { number++; }");

visitCondition(
  ast,
  {
    Identifier(node) {
      // Sadece fonksiyon tanımlayıcısını getirir. `number` tanımlayıcısını gözardı eder.
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
