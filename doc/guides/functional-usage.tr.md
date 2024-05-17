# Fonksiyonel Kullanım

Renit kütüphaneleri, fonksiyonel programlama ilkeleri temelinde geniş bir kullanım yelpazesi sunmaktadır. Fonksiyonel yaklaşım, klasik yöntemlerden ayrılarak fonksiyonları etkili bir biçimde çağırma ve birleştirme imkanı tanır. Bu kapsamlı yaklaşım, işlemleri sadece daha anlaşılır hale getirmekle kalmaz, aynı zamanda esnek ve modüler bir şekilde düzenleme özgürlüğü sunar.

## Çeşitli Kullanım Seçenekleri

Kütüphanelerimiz, çeşitli kullanım seçenekleri sunarak ihtiyaca özel çözümler sunar.

### 1. Klasik Yaklaşım

Fonksiyonları geleneksel bir şekilde çağırarak kullanabilirsiniz.

#### Örnek

```js
apply(Math.max, [1, 2, 3, 4]);
//=> 4
```

```js
remove(['age', 'city'], { name: 'John', age: 30, city: 'New York' });
//=> { name: 'John' }
```

### 2. Fonksiyon Oluşturma

Eğer aynı mantığı içeren bir fonksiyonu birden fazla kez kullanmanız gerekiyorsa, koleksiyon belirtmeden yeni bir fonksiyon oluşturabilirsiniz.

#### Örnek

```js
const max = apply(Math.max);

max([1, 2, 3, 4]);
//=> 4

max([5, 6, 7, 8]);
//=> 8
```

```js
const trim = remove(['age', 'city']);

trim({ name: 'John', age: 30, city: 'New York' });
//=> { name: 'John' }

trim({ name: 'Hans', age: 50, city: 'Hamburg' });
//=> { name: 'Hans' }
```

### 3. Pipe İle Kullanım

Fonksiyon çıktılarını sıralı ve anlaşılır bir şekilde birleştirmek için, [`pipe`](/tr/helpers/pipe) fonksiyonu ile işlemleri birleştirebilirsiniz.

#### Örnek

```js
// prettier-ignore
pipe(
  [1, 2, 3, 4],
  apply(Math.max)
);
//=> 4
```

```js
// prettier-ignore
pipe(
  { name: 'John', age: 30, city: 'New York' },
  remove(['age', 'city'])
);
//=> { name: 'John' }
```

### 4. Pipe İle Fonksiyon Oluşturma

Eğer aynı mantığı içeren bir [`pipe`](/tr/helpers/pipe) işlemini birden fazla kez kullanmanız gerekiyorsa, koleksiyon belirtmeden yeni bir fonksiyon oluşturabilirsiniz.

Örneğin, koleksiyondaki çift sayıları bulup, bu sayılara 10 eklemek ve en sonunda bu sayıları toplamak:

```js
// prettier-ignore
const total = pipe(
  filter((a) => a % 2 === 0),
  map((a) => a + 10),
  reduce((a, b) => a + b)
);

total([1, 2, 3, 4, 5]);
//=> 26

total([6, 7, 8, 9, 10]);
//=> 54
```

Bu kullanım seçenekleri fonksiyonel programlamanın güzelliklerini keşfetmenin yanı sıra kodlarınızı daha etkili, okunabilir ve yönetilebilir hale getirmenize olanak tanır.

<div class="tip">
<p>Matematik işlemleri için <a href="/tr/libraries/mathematical-operations">math</a> kütüphanemizi kullanırsanız, bu işlemleri daha kolay bir şekilde gerçekleştirebilirsiniz.</p>

```js
import { add, divisible, sum } from 'renit/math';

const total = pipe(divisible(2), add(10), sum);

total([1, 2, 3, 4, 5]);
//=> 26

total([6, 7, 8, 9, 10]);
//=> 54
```
</div>

Renit kütüphaneleri, fonksiyonel programlamayı anlamanın ve uygulamanın keyifli bir yolunu sunar.
