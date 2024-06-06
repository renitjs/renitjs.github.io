# Matematik İşlemleri

Matematik işlemlerini kolaylaştırmak amacıyla geliştirilmiş yardımcı araçlar.

## İçe Aktarma

```js
import { avg, sum } from "renit/math";
```

## Fonksiyonlar

### `add`

İki değeri birbirine ekler. Sayıları, stringleri ve koleksiyonları destekler.

#### Örnek

```js
add(1, 2);
//=> 3
```

```js
add("Hello, ", "world!");
//=> Hello, world!
```

```js
const addFive = add(5);
addFive(10);
//=> 15
```

```js
add(5, [1, 2, 3]);
//=> [6, 7, 8]
```

```js
add(5, { a: 1, b: 2, c: 3 });
//=> { a: 6, b: 7, c: 8 }
```

---

### `avg`

Bir koleksiyonun ortalamasını hesaplar. İsteğe bağlı olarak, belirtilen bir anahtarın değerlerini veya her elemana uygulanan bir fonksiyonun sonucunu ortalar.

#### Örnek

```js
avg([1, 2, 3, 4]);
//=> 2.5
```

```js
avg("pages", [
  { name: "Les Miserables", pages: 176 },
  { name: "My Left Foot", pages: 1096 },
]);
//=> 636
```

```js
avg(
  (book) => book.pages,
  [
    { name: "Les Miserables", pages: 176 },
    { name: "My Left Foot", pages: 1096 },
  ]
);
//=> 636
```

```js
pipe([1, 2, 3, 4], add(10), avg);
//=> 12.5
```

---

### `divisible`

Koleksiyonu yalnızca belirli bir sayıya veya sayılara bölünebilen öğeleri içerecek şekilde filtreler.

#### Örnek

```js
divisible(2, [1, 2, 3, 4, 5, 6]);
//=> [2, 4, 6]
```

```js
divisible([2, 3], [1, 2, 3, 4, 5, 6, 12]);
//=> [6, 12]
```

```js
divisible(3, { a: 1, b: 3, c: 6, d: 9 });
//=> { b: 3, c: 6, d: 9 }
```

---

### `size`

Bir koleksiyonun boyutunu döner. Diziler ve dizeler için uzunluğu döndürür. Nesneler için, sayılabilir özelliklerin sayısını döndürür. Map ve Set nesneleri için, öğe sayısını döndürür. Promise nesneleri için, vaadin çözülmesini bekler ve çözülen değerin boyutunu döndürür.

#### Örnek

```js
size([1, 2, 3]); //=> 3
```

```js
size({ name: "Isaac", lastname: "Newton" }); //=> 2
```

```js
size("Newton"); //=> 6
```

```js
const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
size(map); //=> 3
```

```js
size(new Set([1, 2, 3])); //=> 3
```

```js
await size(Promise.resolve([1, 2, 3])); //=> 3
```

---

### `sum`

Bir koleksiyonun toplamını hesaplar. İsteğe bağlı olarak, belirtilen bir anahtarın değerlerini veya her elemana uygulanan bir fonksiyonun sonucunu toplar.

#### Örnek

```js
sum([1, 2, 3, 4]);
//=> 10
```

```js
sum("pages", [
  { name: "Les Miserables", pages: 176 },
  { name: "My Left Foot", pages: 1096 },
]);
//=> 1272
```

```js
sum("pages.number", [
  { name: "Les Miserables", pages: { number: 176 } },
  { name: "My Left Foot", pages: { number: 1096 } },
]);
//=> 1272
```

```js
sum(
  (auth) => auth.users.length,
  [
    { type: "Admin", users: ["Jayden", "Vanessa"] },
    { type: "Super", users: ["Noah", "Brad", "Kathryn"] },
    { type: "Editor", users: ["Cindy", "Larry", "Nelson", "Brandie"] },
  ]
);
//=> 9
```
