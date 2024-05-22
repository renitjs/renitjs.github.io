# Pipe

Bir fonksiyonun çıktısını başka bir fonksiyonun argümanlarına ileterek fonksiyonları birbirine bağlayan bir yapıdır.

## İçe Aktarma

```js
import { pipe } from "renit/helper";
```

## Örnek Senaryo

Elimizde bir dizi var ve bu dizide bulunan öğeleri `filter` -> `map` -> `reduce` kullanarak işleyerek nihai sonuca ulaşmak istiyoruz.

```js
// Toplama fonksiyonu
const sum = (a, b) => a + b;
// Koleksiyonumuz
const arr = [1, 2, 3, 4, 5];
```

Yapmamız gereken işlem ise `arr` koleksiyonundaki çift sayıları bulup, bu sayılara 10 eklemek ve en sonunda bu sayıları toplamak.

### Klasik Yöntem

```js
const arrFilter = arr.filter((a) => a % 2 === 0);
//=> [2, 4]

const arrMap = arrFilter.map((a) => a + 10);
//=> [12, 14]

const arrReduce = arrMap.reduce(sum);
//=> 26
```

Daha kısa haliyle:

```js
arr
  .filter((a) => a % 2 === 0)
  .map((a) => a + 10)
  .reduce(sum);
//=> 26
```

Klasik yöntem gayet anlaşılır ve düzenli görünüyor. Ancak sorunlar var mı?

### Koleksiyon Sorunları

- JavaScript'in temel koleksiyon yönetimi fonksiyonlarının kısıtlı olması.
- Karmaşık işlemlerde iç içe geçen ve sürekli yinelenen metodlar.
- Birden fazla değişken kullanma zorunluluğu.
- Tekrar eden basit işlemler için yeni bir fonksiyon oluşturma zorunluluğu.
- Proje paketlemesinde daha fazla yer kaplaması.

#### Koleksiyon Etkileşimleri

> Adil olalım, kendi fonksiyonlarımızı biraz eleştirelim.

Aşağıdaki kodun tamamı `collect` kütüphanesine ait fonksiyonlarıdır, bu nedenle işlev bileşimi oluşturmak kolaydır ancak okunması zorlaşır. Daha karmaşık iç içe geçen fonksiyonlarda okumak neredeyse imkansız hale gelebilir ve işlem tersten devam
eder.

Örneğin, tek bir işlemde sonucu almak için `arr` koleksiyonu en son yazılır, `filter` işlevini `map` işlevi içinde yapmak zorundayız ve sıralama `reduce` -> `map` -> `filter` şeklinde tersten yazılır.

```js
import { filter, map, reduce } from "renit/collect";

reduce(
  sum,
  map(
    (a) => a + 10,
    filter((a) => a % 2 === 0, arr)
  )
);
//=> 26
```

Ancak daha iyi bir yol var.

## Pipe Metodu

Yukarıdaki sorunu çözmek için `pipe` yöntemini kullanıyoruz. Hem tek bir işlemde sonuç alıyoruz, hem de `arr` sabiti ilk yazılır. `filter` ve `map` işlevlerini ayrı şekilde yazabilir ve sıralama `filter` -> `map` -> `reduce` şeklinde doğru bir şekilde ilerler.

```js
import { pipe } from "renit/helper";
import { filter, map, reduce } from "renit/collect";

// prettier-ignore
pipe(
  arr,
  filter((a) => a % 2 === 0),
  map((a) => a + 10),
  reduce(sum)
);
//=> 26
```

Bu daha okunabilir ve kullanımı daha kolay görünüyor. Çoğu fonksiyonu `pipe` ile birlikte kullanabilirsiniz. Öğrenmeye devam ettikçe işler daha da basitleşir;

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
pipe(
  arr,
  divisible(2),
  add(10),
  sum
);
//=> 26
```

### Asenkron Kullanım

Yukarıdaki örneğin bir asenkron işlemden beklenen sonuca göre kullanımı;

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
await pipe(
  Promise.resolve([1, 2, 3, 4, 5]),
  divisible(2),
  add(10),
  sum
);
//=> 26
```

### Fonksiyonel Kullanım

Eğer aynı mantığı içeren bir pipe işlemini birden fazla kez kullanmanız gerekiyorsa, koleksiyon belirtmeden yeni bir fonksiyon oluşturabilirsiniz.

```js
import { pipe } from "renit/helper";
import { divisible, add, sum } from "renit/math";

// prettier-ignore
const total = pipe(
  divisible(2),
  add(10),
  sum
);

total([1, 2, 3, 4, 5]);
//=> 26

await total(Promise.resolve([6, 7, 8, 9, 10]));
//=> 54
```
