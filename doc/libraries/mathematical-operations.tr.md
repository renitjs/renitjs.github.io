# Matematik İşlemleri

Matematik işlemlerini kolaylaştırmak amacıyla geliştirilmiş yardımcı araçlar.

## İçe Aktarma

```js
import { avg, sum } from "renit/math";
```

## Fonksiyonlar

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
