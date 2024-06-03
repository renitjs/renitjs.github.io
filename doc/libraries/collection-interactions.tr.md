# Koleksiyon Etkileşimleri

Diziler ve nesnelerle etkileşim sağlayan pratik yardımcı fonksiyonlar.

## İçe Aktarma

```js
import { chunk, diff } from "renit/collect";
```

## Fonksiyonlar

<div class="tip">
  <p>Mutasyonu önlemek için <a href="tr/helpers/clone">clone</a>, sıralı işlemler için <a href="tr/helpers/pipe">pipe</a> yardımcı fonksiyonlarını kullanabilirsiniz. Ayrıca, fonksiyonlar hakkında daha fazla bilgi için <a href="tr/guides/functional-usage">Fonksiyonel Kullanım</a> kılavuzunu inceleyebilirsiniz.</p>
</div>

### `apply`

Belirtilen koleksiyona bir fonksiyon uygular. Fonksiyon, diziler, nesneler veya promislerle kullanılabilir. Eğer koleksiyon bir dizi veya bir diziye dönüşen bir promise ise, fonksiyon dizinin elemanlarına uygulanır. Eğer koleksiyon bir nesne ise, fonksiyon nesnenin değerlerine uygulanır.

#### Örnek

```js
apply(Math.max, [1, 2, 3, 4]); //=> 4
```

```js
await apply(Math.max, Promise.resolve([1, 2, 3, 4])); //=> 4
```

```js
apply((a, b) => a + b, { grape: 3, apple: 5 }); //=> 8
```

```js
pipe(
  { grape: 3, apple: 5 },
  apply((a, b) => a + b)
); //=> 8
```

```js
const applied = apply((a, b) => a + b);

applied([5, 3]); //=> 8
await applied(Promise.resolve([2, 2])); //=> 4
```

---

### `chunk`

Koleksiyonu belirli bir boyutta daha küçük koleksiyonlara ayırır.

#### Örnek

```js
chunk(4, [1, 2, 3, 4, 5, 6, 7]);
//=> [[1, 2, 3, 4], [5, 6, 7]]
```

```js
chunk(2, { name: "Albert", last: "Einstein", age: "∞" });
//=> [{ name: 'Albert', last: 'Einstein' }, { age: '∞' }]
```

---

### `diff`

İki koleksiyon arasındaki farkı bulur. Orijinal koleksiyonda bulunan ancak karşılaştırılan koleksiyonda bulunmayan öğeleri döndürür.

#### Örnek

```js
diff([1, 2, 3, 4, 7], [1, 2, 3, 4, 5, 6, 7]);
//=> [5, 6]
```

```js
await diff(
  Promise.resolve([1, 2, 3, 4, 7]),
  Promise.resolve([1, 2, 3, 4, 5, 6, 7])
);
//=> [5, 6]
```

```js
diff(
  { name: "Of Mice and Men" },
  { name: "Of Mice and Men", writer: "John Steinbeck" }
);
//=> { writer: 'John Steinbeck' }
```

```js
diff(
  { name: "Of Mice and Men", page: 325 },
  {
    name: "Of Mice and Men",
    writer: "John Steinbeck",
    page: 612,
  }
);
//=> { writer: 'John Steinbeck', page: 612 }
```

```js
const data = [1, 2, 3, 4, 7];
const compare = diff(data);

compare([1, 2, 3, 4, 5, 6, 7]); //=> [5, 6]
compare([1, 2, 3, 4, 12, 15]); //=> [12, 15]
```

---

### `each`

Bir koleksiyondaki her öğe üzerinde döngü yapar ve sağlanan işlevi uygular. Bir dizideki her öğe veya bir nesnedeki her anahtar-değer çifti üzerinde bir işlem yapmak için kullanışlıdır.

#### Örnek

```js
const data = [1, 2];
each((item, index) => {
  console.log(index, item);
}, data);
//=> 0, 1
//=> 1, 2
```

```js
const data = { name: "İbn", lastname: "Sînâ" };
each((key, value, index) => {
  console.log(key, value, index);
}, data);
//=> name, İbn, 0
//=> lastname, Sînâ, 1
```

```js
const data = Promise.resolve([1, 2]);
await each((item) => {
  console.log(item);
}, data);
//=> 1
//=> 2
```

```js
const data = Promise.resolve([1, 2]);
await each(async (item) => {
  return new Promise((resolve) => {
    console.log(item);
    resolve(true);
  });
}, data);
//=> 1
//=> 2
```

```js
let total = 0;
const addTotal = each((item) => (total += item));
addTotal([1, 2]); //=> 3
addTotal([3, 4]); //=> 10
```

---

### `entries`

Bir nesnenin her özelliği için [anahtar, değer] çiftlerinden oluşan bir diziyi döndürür.

#### Örnek

```js
entries({ a: 1, b: "2", c: true });
//=> [['a', 1], ['b', '2'], ['c', true]]
```

```js
await entries(Promise.resolve({ a: 1, b: "2", c: true }));
//=> [['a', 1], ['b', '2'], ['c', true]]
```

---

### `every`

Bir koleksiyondaki her elemanın belirtilen fonksiyonu karşılayıp karşılamadığını kontrol eder. Eğer tüm elemanlar testi geçerse `true`, aksi halde `false` döner.

#### Örnek

```js
every((value) => value > 2, [1, 2, 3, 4]); //=> false
```

```js
every((value) => value >= 5, { grape: 5, pineapple: 10 }); //=> true
```

```js
const isGreaterThanTwo = every((value) => value > 2);
isGreaterThanTwo([1, 2, 3, 4]); //=> false
isGreaterThanTwo([3, 4, 5, 6]); //=> true
```

---

### `filter`

Bir koleksiyondaki elemanları belirtilen bir fonksiyona veya varsayılan filtreleme kriterlerine göre seçer. Testi geçen elemanları içeren yeni bir koleksiyon döndürür.

#### Örnek

```js
filter((value) => value > 2, [1, 2, 3, 4]); //=> [3, 4]
```

```js
await filter((value) => value > 2, Promise.resolve([1, 2, 3, 4])); //=> [3, 4]
```

```js
const greaterThanTwo = filter((value) => value > 2);
greaterThanTwo([1, 2, 3, 4]); //=> [3, 4]
greaterThanTwo([1, 2, 3, 4, 5]); //=> [3, 4, 5]
```

```js
// prettier-ignore
filter([0, 1, 2, null, true, 3, 4, "", undefined, false, 5, 6, '', 7, [], 8, 9, {}, 10]);
//=> [0, 1, 2, true, 3, 4, false, 5, 6, 7, 8, 9, 10]
```

```js
const data = {
  books: 194,
  users: 1458,
  collections: 500,
};
filter((value) => value < 1000, data);
//=> { books: 194, collections: 500 }
```

```js
const data = {
  books: 194,
  users: 1458,
  collections: 500,
  kits: null,
};
filter(data);
//=> { books: 194, users: 1458, collections: 500 }
```

---

### `flat`

Gömülü bir koleksiyonu belirtilen derinliğe düzleştirir.

#### Örnek

```js
flat([0, 1, 2, [3, 4]]); //=> [0, 1, 2, 3, 4]
```

```js
await flat(2, Promise.resolve([0, 1, [2, [3, [4, 5]]]])); //=> [0, 1, 2, 3, [4, 5]]
```

```js
flat(Infinity, [0, 1, [2, [3, [4, 5]]]]); //=> [0, 1, 2, 3, 4, 5]
```

```js
flat({
  day: "monday",
  appointments: ["09:00", "10:00", "11:00"],
}); //=> ['monday', '09:00', '10:00', '11:00']
```

---

### `has`

Bir koleksiyonun belirli bir öğeyi veya öğeleri içerip içermediğini kontrol eder. Eğer öğe bulunursa `true`, bulunmazsa `false` döner.

#### Örnek

```js
has("c", "abcd"); //=> true
has("e", "abcd"); //=> false
```

```js
has(3, [1, 2, 3, 4]); //=> true
has(5, [1, 2, 3, 4]); //=> false
```

---

### `implode`

Koleksiyondaki tüm öğeleri tek bir `String` türünde birleştirir. Koleksiyon `Array` ise birinci argümanda birleştirecek ifade gönderilmelidir. Eğer koleksiyon `Array` içinde `Object` türlerinden oluşuyorsa birinci argüman koleksiyondan seçilecek anahtarı, ikinci argüman ise birleştirecek ifadeyi temsil eder.

#### Örnek

```js
implode("-", [1, 2, 3, 4, 5]);
//=> 1-2-3-4-5
```

```js
implode("product", ", ", [
  {
    product: "ChromeOS",
    company: "Google",
  },
  {
    product: "ChatGPT",
    company: "OpenAI",
  },
  {
    product: "VS Code",
    company: "Microsoft",
  },
]);
//=> Chair, Desk, Chair
```

<div class="tip">
<p>Objeden derin bir anahtar seçmeniz gerekirse, <code>product.name</code> gibi noktalı ifadeler kullanabilirsiniz. Seçimleri daha detaylı öğrenmek için <code>pluck</code> fonksiyonunu inceleyin.</p>
</div>

---

### `join`

Koleksiyondaki tüm öğelerin değerlerini tek bir `String` türünde birleştirir.

#### Örnek

```js
join(", ", ["a", "b", "c"]);
//=> a, b, c
```

```js
join(", ", ", and ", ["a", "b", "c"]);
//=> a, b, and c
```

```js
join(", ", ", and ", ["a"]);
//=> a
```

```js
join(", ", ", and ", []);
//=> ""
```

```js
join(" ", { name: "Marie", last: "Curie" });
//=> Marie Curie
```

> `join` fonksiyonu, belirtilen ayırıcıları kullanarak bir dizinin elemanlarını veya bir nesnenin değerlerini birleştirir. Diziler için, ilk ayırıcı elemanlar arasında kullanılır ve ikinci isteğe bağlı ayırıcı son elemandan önce kullanılır. Nesneler için, değerleri birleştirirken ilk ayırıcı kullanılır.

---

### `keyMap`

Koleksiyonun anahtar haritasını döndürür.

#### Örnek

```js
keyMap([
  {
    name: "John",
    roles: [
      {
        name: "Editor",
      },
      {
        name: "Admin",
      },
    ],
  },
]);

/*
{"0":{"name":"John","roles":[{"name":"Editor"},{"name":"Admin"}]},"0.name":"John","0.roles.0.name":"Editor","0.roles.0":{"name":"Editor"},"0.roles.1.name":"Admin","0.roles.1":{"name":"Admin"},"0.roles":[{"name":"Editor"},{"name":"Admin"}]}
*/
```

> `keyMap` fonksiyonu, koleksiyonu dolaşır ve tüm anahtarların ve bunlara karşılık gelen değerlerin bir haritasını oluşturur, iç içe geçmiş nesneler dahil. Bu, koleksiyonun yapısının ve içeriğinin kapsamlı bir görünümünü sağlar.

---

### `keys`

Bir nesnenin her özelliği için anahtarlarını içeren bir dizi döndürür.

#### Örnek

```js
keys({
  club: "Liverpool",
  nickname: "The Reds",
}); //=> ['club', 'nickname']
```

```js
await keys(
  Promise.resolve({
    club: "Liverpool",
    nickname: "The Reds",
  })
); //=> ['club', 'nickname']
```

---

### `last`

Belirtilen bir fonksiyon veya varsayılan kriterler temelinde bir koleksiyondaki son elemanı alır.

#### Örnek

```js
last([1, 2, 3]); //=> 3
```

```js
last((item) => item < 2, [1, 2, 3]); //=> 1
```

```js
last(2, [1, 2, 3]); //=> [2, 3]
```

```js
last({ name: "İsmâil", last: "Cezerî" }); //=> Cezerî
```

```js
last((item) => item < 300, {
  teachers: 30,
  books: 194,
  users: 1458,
  collections: 500,
}); //=> 194
```

```js
last(2, {
  teachers: 30,
  books: 194,
  users: 1458,
  collections: 500,
}); //=> {users: 1458, collections: 500}
```

```js
await last((item) => item < 2, Promise.resolve([1, 2, 3])); //=> 1
```

```js
const data = Promise.resolve([1, 2, 3]);
const lessThanTwoLast = last((item) => item < 2);
await lessThanTwoLast(data); //=> 1
```

---

### `loop`

Belirtilen uzunluktaki bir koleksiyon üzerinde asenkron veya senkron bir şekilde döngü yapar ve her indekse bir fonksiyon uygular.

#### Örnek

```js
const data = [1, 2, 3];
let total = 0;

loop((index) => {
  total += data[index];
}, data);

console.log(total); //=> 6
```

```js
const data = [1, 2, 3];
let total = 0;

await loop(async (index) => {
  return new Promise((resolve) => {
    total += data[index];
    resolve(true);
  });
}, data);

console.log(total); //=> 6
```

```js
const data = Promise.resolve([1, 2, 3]);
let total = 0;

await loop(async (index) => {
  total++;
}, data);

console.log(total); //=> 3
```

---

### `map`

Orijinal koleksiyondaki her elemana bir fonksiyon uygulayarak yeni bir koleksiyon oluşturur.

#### Örnek

```js
map((item) => item + 10, [1, 2, 3, 4]); //=> [11, 12, 13, 14]
```

```js
await map((item) => item + 10, Promise.resolve({ apple: 5, pear: 10 })); //=> { apple: 15, pear: 20 }
```

```js
const data1 = [1, 2, 3, 4];
const data2 = [5, 6, 7, 8];
const add10 = map((item) => item + 10);
add10(data1); //=> [11, 12, 13, 14]
add10(data2); //=> [15, 16, 17, 18]
```

---

### `merge`

İki koleksiyonu alır ve bunları tek bir koleksiyonda birleştirir. Diziler için, her iki dizinin elemanlarını birleştirir; nesneler için ise her iki nesnenin anahtar-değer çiftlerini birleştirir. Nesnelerde ortak anahtarlar varsa, ikinci nesnenin değerleri birinci nesnenin değerlerini üzerine yazar.

#### Örnek

```js
merge(["apple", "pear"], ["orange"]);
//=> ['orange', 'apple', 'pear']
```

```js
merge({ age: 32 }, { name: "Nikola", last: "Tesla" });
//=> { name: 'Nikola', last: 'Tesla', age: 32 }
```

```js
await merge(Promise.resolve(["strawberry"]), Promise.resolve(["blackberry"]));
//=> ['blackberry', 'strawberry']
```

<div class="tip">
  <p>Derinlemesine birleştirme yapmanız gerekiyorsa, <code>mergeDeep</code> fonksiyonunu kullanabilirsiniz.</p>
</div>

---

### `pluck`

Belirli bir anahtar için tüm değerleri getirir.

#### Örnek

```js
pluck("name", { name: "Sabuncuoğlu", last: "Şerefeddin" });
//=> ['Sabuncuoğlu']
```

```js
pluck("name", [
  { id: 78, name: "Nikola" },
  { id: 79, name: "Tesla" },
]);
//=> ['Nikola', 'Tesla']
```

Ortaya çıkacak koleksiyonun nasıl anahtarlanmasını istediğinizi belirtebilirsiniz.

```js
pluck("name", "subs.id", [
  { id: 78, subs: { id: 17 }, name: "Thomas" },
  { id: 79, subs: { id: 18 }, name: "Edison" },
]);
//=> {17: 'Thomas', 18: 'Edison'}
```

İç içe geçmiş anahtarları seçmek için noktalı ifadeler kullanabilirsiniz.

```js
pluck("roles.0.name", {
  name: "John",
  roles: [{ name: "Editor" }, { name: "Admin" }],
});
//=> ['Editor']
```

```js
pluck("roles.0.name", [
  { id: 1, roles: [{ name: "Editor" }, { name: "Admin" }] },
  { id: 2, roles: [{ name: "Super User" }, { name: "Writer" }] },
]);
//=> ['Editor', 'Super User']
```

Noktalı ifadelerle birlikte yıldız (`*`) karakteri kullanılarak, bir liste içerisindeki her bir nesnenin belirli bir anahtara sahip tüm değerleri alınabilir.

```js
pluck("roles.*.name", [
  { id: 1, roles: [{ name: "Editor" }, { name: "Admin" }] },
  { id: 2, roles: [{ name: "Super User" }, { name: "Writer" }] },
]);
/*
[
  ["Editor", "Admin"],
  ["Super User", "Writer"],
];
*/
```

---

### `pop`

Koleksiyondaki son öğeyi veya istenen sayıya göre son öğeleri dönderir.

#### Örnek

```js
pop([1, 2, 3, 4, 5]);
//=> 5
```

```js
pop(2, [1, 2, 3, 4, 5]);
//=> [4, 5]
```

```js
pop({ name: "Ali", last: "Kuşçu", birth: "1403" });
//=> 1403
```

```js
pop(2, { name: "Ali", last: "Kuşçu", birth: "1403" });
//=> { last: 'Kuşçu', birth: '1403' }
```

---

### `prepend`

Koleksiyonun başına bir öğe ekler.

```js
prepend(0, [1, 2, 3, 4, 5]);
//=> [0, 1, 2, 3, 4, 5]
```

```js
prepend([0, 14], [1, 2, 3, 4, 5]);
//=> [0, 14, 1, 2, 3, 4, 5]
```

```js
prepend("brand", "Google", {
  product: "ChromeOS",
});
//=> { brand: 'Google', product: 'ChromeOS' }
```

```js
prepend("?", "category=1&book=5");
//=> ?category=1&book=5
```

> `prepend` fonksiyonu, bir koleksiyonun başına bir eleman veya bir grup eleman ekler; bu koleksiyon bir dizi veya bir nesne olabilir. Eğer koleksiyon bir dizi ise, yeni eleman(lar) diziye başlangıçta eklenir. Eğer koleksiyon bir nesne ise, yeni bir anahtar-değer çifti nesneye eklenir ve mevcut anahtar-değer çiftleri sağa kaydırılır.

---

### `push`

Bir diziye bir eleman ekler veya bir nesnede anahtar-değer çiftini günceller.

#### Örnek

```js
const data = [1, 2, 3];
push(4, data);
//=> [1, 2, 3, 4]
```

```js
const data = [1, 2, 3];
push([4, 5], 1, data);
// [1, 2, 3, 4, 5]
```

```js
const data = { name: "Aristoteles" };
push("birth", "384 BC", data);
// { name: 'Aristoteles', birth: '384 BC' }
```

```js
const data = Promise.resolve([1, 2, 3]);
const result = await push(4, data);
console.log(result); //=> [1, 2, 3, 4]
```

```js
const data = [1, 2, 3];
const pushed = push(4);
pushed(data);
//=> [1, 2, 3, 4]
```

---

### `reduce`

Bir koleksiyondaki her elemana, soldan sağa doğru bir fonksiyon uygular ve koleksiyonu tek bir değere indirger.

#### Örnek

```js
const sum = (a, b) => a + b;
```

```js
reduce(sum, [1, 2, 3, 4]); //=> 10
```

```js
reduce(sum, { wood: 150, stone: 50, gold: 10 }); //=> 210
```

```js
reduce(sum, 10, [1, 2, 3, 4]); //=> 20
```

```js
const total = reduce(sum);
total([1, 2, 3, 4]); //=>10
```

---

### `remove`

Koleksiyondan belirtilen anahtarları kaldırır.

#### Örnek

```js
remove([0, 1], [1, 2, 3, 4]);
//=> [empty × 2, 3, 4]
```

<div class="tip">
<p>Anahtarlar kaldırıldıktan sonra indekslerinin de kaldırılmasını isterseniz, <code>flat</code> fonksiyonunu kullanabilirsiniz.</p>

```js
flat(remove([0, 1], [1, 2, 3, 4]));
//=> [3, 4]
```

</div>

```js
remove("date", { name: "Pîrî", last: "Reis", date: 1553 });
//=> { name: 'Pîrî', last: 'Reis' }
```

```js
remove(["subs", "pages", "roles"], {
  id: 78,
  subs: {
    id: 17,
  },
  name: "Kevin",
  pages: {
    number: 176,
  },
  roles: [
    {
      name: "Editor",
    },
    {
      name: "Admin",
    },
  ],
});

//=> { id: 78, name: 'Kevin' }
```

---

### `reverse`

Bir dizideki elemanların sırasını tersine çevirir.

#### Örnek

```js
reverse([1, 2, 3, 4, 5]); //=> [5, 4, 3, 2, 1]
```

---

### `shift`

Bir koleksiyondaki ilk öğeyi kaldırır ve bu öğeyi döndürür. Ek olarak, kaldırılacak öğe sayısını belirterek birden fazla öğe de kaldırılabilir. Kaldırılan öğeler, yeni bir koleksiyon olarak döndürülür.

```js
const a = [1, 2, 3, 4, 5];
const b = shift(a);
//=> a => [2, 3, 4, 5]
//=> b => 1
```

> Bu örnekte, `a` dizisinin ilk öğesi olan `1` kaldırılır ve `b` değişkenine atanır. `a` dizisi ise `[2, 3, 4, 5]` olarak güncellenir.

Kaldırılacak öğe sayısını belirterek, bir diziden birden fazla öğe kaldırmak mümkündür. Bu durumda, kaldırılan öğeler yeni bir dizi olarak döndürülür.

```js
const a = [1, 2, 3, 4, 5];
const b = shift(2, a);
//=> a => [3, 4, 5]
//=> b => [1, 2]
```

> Bu örnekte, `a` dizisinden ilk iki öğe olan `1` ve `2` kaldırılır ve `b` değişkenine bir dizi olarak atanır. `a` dizisi ise `[3, 4, 5]` olarak güncellenir.

---

### `slice`

Belirtilen başlangıç indisine ve isteğe bağlı bitiş indisine dayanarak bir dizinin bir bölümünü çıkarır.

#### Örnek

```js
slice(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//=> [5, 6, 7, 8, 9, 10]
```

```js
slice([4, 2], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//=> [5, 6]
```

---

### `some`

Koleksiyonun belirli bir öğeyi içerip içermediğini belirler.

#### Örnek

```js
some(3, [1, 2, 3]);
//=> true
```

```js
some((value) => value > 5, [1, 2, 3, 4, 5]);
//=> false
```

```js
some("name", { name: "Aristokles", last: "Platon" });
//=> true
```

```js
some("Platon", { name: "Aristokles", last: "Platon" });
//=> true
```

```js
some("name", "Pisagor", {
  name: "Theano",
  year: 570,
});
//=> false
```

```js
some((item) => item > 0, {
  books: 194,
  users: 1458,
  collections: 0,
});
//=> true
```

---

### `splice`

Bir dizinin içeriğini mevcut elemanları kaldırarak veya değiştirerek ve/veya yerinde yeni elemanlar ekleyerek değiştirir.

#### Örnek

```js
const data = [1, 2, 3, 4, 5];
const result = splice(2, data);
//=> data = [1, 2]
//=> result = [3, 4, 5]
```

```js
const data = [1, 2, 3, 4, 5];
const result = splice([2, 1], data);
//=> data = [1, 2, 4, 5]
//=> result = [3]
```

```js
const data = [1, 2, 3, 4, 5];
const result = splice([2, 1, [10, 11]], data);
//=> data = [1, 2, 10, 11, 4, 5]
//=> result = [3]
```

```js
const data = Promise.resolve([1, 2, 3, 4, 5]);
const result = await splice(2, data);
//=> result = [3, 4, 5]
```

---

### `split`

Koleksiyonu verilen ifadeye veya sayıya göre gruba ayırır.

#### Örnek

```js
split("&", "id=1&book=5");
//=> ['id=1', 'book=5'];
```

```js
split(3, [1, 2, 3, 4, 5]);
//=> [[1, 2], [3, 4], [5]]
```

---

### `take`

Koleksiyonun başından veya sonundan belirli sayıda öğeyi alarak yeni bir koleksiyon döndürür. Pozitif bir tamsayı verilirse, koleksiyonun başından belirtilen sayıda öğe alınır. Negatif bir tamsayı verilirse, koleksiyonun sonundan belirtilen miktarda öğe alınır.

```js
take(3, [1, 2, 3, 4, 5, 6, 7]);
//=> [1, 2, 3]
```

```js
take(-3, [1, 2, 3, 4, 5, 6, 7]);
//=> [5, 6, 7]
```

```js
take(1, { name: "Isaac", last: "Newton" });
//=> { name: 'Newton' }
```

```js
take(-1, { name: "Isaac", last: "Newton" });
//=> { last: 'Newton' }
```

---

### `takeUntil`

Verilen geri arama fonksiyonu `true` değeri döndürene kadar koleksiyondaki öğeleri döndürür.

```js
takeUntil(3, [1, 2, 3]);
//=> [1, 2]
```

```js
takeUntil((item) => item >= 3, [1, 2, 3]);
//=> [1, 2]
```

```js
takeUntil((item) => item >= 1000, {
  books: 194,
  users: 1458,
  collections: 500,
  kits: null,
});
//=> {books: 194}
```

> Verilen değer bulunamazsa veya geri arama fonksiyonu hiçbir zaman `true` değeri döndürmezse, `takeUntil` fonksiyonu koleksiyondaki tüm öğeleri döndürür.

---

### `value`

Belirli bir anahtar için tüm değerleri getirir.

#### Örnek

```js
value("type", [{ type: "element" }, { type: "text" }]);
//=> ['element', 'text']
```

```js
value("name", { name: "Cahit", last: "Arf" });
//=> Cahit
```

```js
value("roles.1.name", {
  name: "Cahit",
  roles: [{ name: "Editor" }, { name: "Admin" }],
});
//=> Admin
```

---

### `values`

Bir nesnenin her özelliği için değerleri içeren bir dizi veya bir dizi için aynı diziyi döner.

#### Örnek

```js
values({ name: "Galileo", last: "Galilei" });
//=> ['Galileo', 'Galilei']
```

```js
await values(Promise.resolve({ name: "Galileo", last: "Galilei" }));
//=> ['Galileo', 'Galilei']
```
