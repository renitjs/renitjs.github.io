# Clone

Yapılandırılmış klonlama algoritmasını kullanarak bir koleksiyonun derin bir kopyasını oluşturur.

## İçe Aktarma

```js
import { clone } from "renit/helper";
```

## Mutasyon

JavaScript'te orijinal koleksiyonları mutasyona uğratan fonksiyonlar (`pop`, `reverse` ve `splice` gibi), koleksiyonların içeriğini doğrudan değiştiren fonksiyonlardır. Bu fonksiyonlar, koleksiyonların elemanlarını ekleyebilir, silebilir veya değiştirebilir. Bu nedenle, koleksiyonların önceki durumlarının korunması isteniyorsa, bu fonksiyonları kullanmadan önce kopyalarının alınması önerilir.

`clone` fonksiyonunu kullanmadan bir örnek:

```js
import { reverse } from "renit/collect";

const data = [1, 2, 3];
const reversed = reverse(data);

console.log(data);
//=> [3, 2, 1]

console.log(reversed);
//=> [3, 2, 1]
```

`clone` fonksiyonunu kullanılarak bir örnek:

```js
import { reverse } from "renit/collect";
import { clone } from "renit/helper";

const data = [1, 2, 3];
const reversed = reverse(clone(data));

console.log(data);
//=> [1, 2, 3]

console.log(reversed);
//=> [3, 2, 1]
```

`clone` kullanmak, orijinal `data` dizisinin değişmeden kalmasını sağlar ve böylece güvenle kopyasını manipüle edebilirsiniz.
