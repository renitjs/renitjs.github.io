# Olay Dinleyicileri

Küçük ve özelleştirilebilir bir olay dinleyicisi.

## İçe Aktarma

```js
import { on, emit } from "renit/event";
```

## Global Dinleyiciler

### Dinleyici tanımlama

İstediğiniz özel olay tetiklendiğinde çalışacak dinleyici fonksiyonunu tanımlamak için `on` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, belirli bir olay için bir veya daha fazla dinleyici eklemenizi sağlar.

```js
on("tick", (number) => {
  console.log(number);
});

emit("tick", 1);
//=> 1

emit("tick", 5);
//=> 5
```

### Dinleyici kaldırma

`on` fonksiyonu, bir dinleyiciyi kaldırmak için kullanılacak olan `unbind` fonksiyonunu döndürür. Bu sayede, belirli bir dinleyiciyi gerektiğinde iptal edebilirsiniz.

```js
const tickOff = on("tick", (number) => {
  console.log(number);
});

emit("tick", 1);
//=> 1

// dinleyiciyi kaldır.
tickOff();

emit("tick", 5);
//=> tick dinleyicisi dinlenmez.
//=> Log ekranına kayıt eklemez.
```

### Dinleyici yürütme

Belirli bir olayı tetiklemek ve bu olaya bağlı dinleyicileri çalıştırmak için `emit` fonksiyonunu kullanabilirsiniz. İlk argüman olayın adı, diğer argümanlar ise dinleyiciye iletilecek verilerdir.

```js
on("tick", (a, b) => {
  console.log(a, b);
});

emit("tick", 1, "one");
//=> 1, one
```

### Bir defa dinleme

Bir olayın yalnızca bir kez dinlenmesini istiyorsanız, `once` fonksiyonunu kullanabilirsiniz. Bu fonksiyon, olay tetiklendiğinde sadece bir kez çalışacak bir dinleyici tanımlar.

```js
once("tick", (a, b) => {
  console.log(a, b);
});

emit("tick", 1, "one");
//=> 1, one

emit("tick", 1, "one");
//=> tick dinleyicisi dinlenmez.
//=> Log ekranına kayıt eklemez.
```

## Özel Dinleyiciler

`event` fonksiyonunu kullanarak yeni bir olay dinleyici oluşturabilirsiniz. Bu fonksiyon, olayların dinlenmesi ve tetiklenmesi için kullanılacak bir olay taşıyıcısı (event bus) döndürür.

```js
const bus = event();

bus.on("tick", (number) => {
  console.log(number);
});

bus.emit("tick", 1);
//=> 1
```

Bu örnekte, `bus` nesnesi, kendi dinleyicileri ve yayıcıları olan, global olay dinleyicilerinden bağımsız özel bir olay taşıyıcısıdır.
