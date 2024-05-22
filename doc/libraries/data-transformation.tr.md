# Veri Dönüştürme

Değişkenlerin veya sabitlerin tiplerini veya değerlerini dönüştürür.

## İçe Aktarma

```js
import { toArray, toJson } from "renit/to";
```

## Fonksiyonlar

### `toArray`

Koleksiyonu bir diziye dönüştürür. Eğer koleksiyon bir obje ise, bu objenin
değerlerini içeren bir dizi döndürülür.

#### Örnek

```js
toArray([1, 2, 3, "b", "c"]);
//=> [1, 2, 3, 'b', 'c']
```

```js
toArray({
  name: "Elon Musk",
  companies: ["Tesla", "Space X", "SolarCity"],
});
//=> ['Elon Musk', ['Tesla', 'Space X', 'SolarCity']]
```

```js
// prettier-ignore
pipe(
  {
    name: { first: "Lionel", middle: "Andrés", last: "Messi" },
    surname: "Cuccittini",
  },
  (info) => info.name,
  toArray,
  join(" ")
);
//=> Lionel Andrés Messi
```

> Eğer verilen koleksiyon bir dizi ise, aynı dizi referansını döner. Eğer bir
> obje ise, bu objenin değerlerini içeren bir dizi döner. Örneğin,
> `[1, 2, 3, 'b', 'c']` için aynı dizi referansını,
> `{ name: 'Elon Musk', companies: ['Tesla', 'Space X', 'SolarCity'] }` için ise
> `['Elon Musk', ['Tesla', 'Space X', 'SolarCity']]` dizisini döndürür.

---

### `toAsync`

Bir `Iterable` koleksiyonun içindeki değerleri `Promise` olarak işlemek için
koleksiyonu `AsyncIterable` türüne çevirir.

#### Örnek

```js
let acc = 0;
for await (const item of toAsync([1, 2, 3, 4, 5])) {
  acc += item;
}
//=> 15
```

```js
// pipe ile
await pipe(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  toAsync,
  map((a) => a + 10),
  toArray
);
//=> [11, 12, 13]
```

> Bu fonksiyon, bir iterable koleksiyonu alır ve her bir değeri `Promise` olarak
> işleyebileceğiniz bir `AsyncIterable` türüne çevirir. Örneğin,
> `[1, 2, 3, 4, 5]` dizisini `toAsync` fonksiyonuna geçirerek, bu değerlere
> asenkron bir şekilde erişebilir ve toplamını hesaplayabilirsiniz. Aynı zamanda
> `pipe` fonksiyonuyla diğer işlemlerle birleştirilebilir, örneğin, promise'leri
> içeren bir diziyi alır, her bir değere 10 ekler ve sonucu bir dizi olarak elde
> edersiniz.

---

### `toJson`

Belirtilen koleksiyonu JSON formatına dönüştürür.

#### Örnek

```js
toJson([1, 2, 3, "b", "c"]);
//=> string [1,2,3,"b","c"]
```

```js
toJson({
  id: 384,
  name: "Rayquaza",
  gender: "NA",
});
//=> string {"id":384,"name":"Rayquaza","gender":"NA"}
```

> Örneğin, `[1, 2, 3, 'b', 'c']` dizisini `toJson` fonksiyonuna geçirirseniz,
> dönen sonuç `"[1, 2, 3, 'b', 'c']"` olacaktır. Aynı şekilde,
> `{ id: 384, name: 'Rayquaza', gender: 'NA' }` nesnesini kullanarak elde edilen
> JSON formatı da `{"id": 384, "name": "Rayquaza", "gender": "NA"}` olacaktır.

---

### `toString`

Belirtilen değeri bir metin olarak döndürür.

#### Örnek

```js
toString([1, 2, 3, 4, 5]);
//=> string 1,2,3,4,5
```

```js
toString({ id: 1 });
//=> [object Object]
```

> Örneğin, `[1, 2, 3, 4, 5]` dizisini `toString` fonksiyonuna geçirirseniz,
> dönen sonuç `"1, 2, 3, 4, 5"` olacaktır. Ancak, nesnelerin string formatı
> standart olarak `[object Object]` şeklinde olacaktır.

---

### `toStringify`

Bir koleksiyonu JSON dize temsiline veya diğer türlerde metinlere dönüştürür.

#### Örnek

```js
toStringify([1, 2, 3, 4, 5]);
//=> string 1,2,3,4,5
```

```js
toStringify({ id: 1 });
//=> {"id":1}
```

> `toStringify` fonksiyonu, `toString` fonksiyonunun nesneler için verdiği
> `[object Object]` sonucunu düzeltir ve nesneleri JSON formatına dönüştürür.
> Örneğin, `{ id: 1 }` nesnesini kullanarak elde edilen string formatı
> `"{\"id\":1}"` olacaktır.
