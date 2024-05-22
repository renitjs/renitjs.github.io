# Tür ve Değer Kontrolleri

Değişkenlerin veya sabitlerin tür ve değer kontrolünü gerçekleştirir, sistemin çalışma ortamıyla desteklenen özellikler hakkında bilgi sağlar.

> **JavaScript Dilindeki Bazı Hatalar** Örneğin;

```js
// This stands since the beginning of JavaScript
typeof null === "object";
```

_[↪ referans](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)_

JavaScript'e göre, `null` aslında bir `Object`dir. Ancak, bu kütüphanede, bizim bakış açımıza daha uygun olacak şekilde bu tür kronik hatalar için düzenlemeler yapılmıştır.

## İçe Aktarma

```js
import { isArray, isEmpty } from "renit/is";
```

## Fonksiyonlar

### `isArray`

Belirtilen bir değerin bir dizi olup olmadığını kontrol eder. Eğer değer bir dizi ise `true`, değilse `false` döner.

#### Örnek

```js
isArray(["pear", "grape", "cherry", "lemon"]); //=> true
```

```js
isArray(100); //=> false
```

```js
isArray("Super User"); //=> false
```

```js
isArray({
  club: "Barcelona",
  players: ["Gavi", "Pedri", "İlkay"],
});
//=> false
```

---

### `isArrayLike`

Belirtilen bir değerin bir diziye benzeyip benzemediğini kontrol eder. Genellikle değerin `length` özelliğine sahip olup olmadığını ve bu özelliğin sayısal bir değer içerip içermediğini kontrol eder. Bu koşullar sağlandığında `true`, aksi takdirde `false` döner.

#### Örnek

```js
isArrayLike([1, 2, 3]); //=> true
```

```js
isArrayLike({ 0: "apple", 1: "orange", length: 2 }); //=> true
```

```js
isArrayLike("fruits"); //=> true
```

```js
isArrayLike(document.body.children); //=> true
```

```js
isArrayLike(null); //=> false
```

```js
isArrayLike(() => {}); //=> false
```

> Yukarıdaki örnekte, `isArrayLike` fonksiyonu, verilen değerin bir diziye benzeyip benzemediğini kontrol etmek için gerekli koşulları içermektedir. Bu koşullar, belirtilen şartları sağlayan değerlerin dizi benzeri kabul edilmesini sağlar. Eğer bir değer, bir fonksiyon değilse ve 0'dan büyük veya ona eşitse, aynı zamanda `Number.MAX_SAFE_INTEGER`'den küçük veya ona eşit bir tamsayı olan bir `value.length`'e sahipse, bu durumda değer bir dizi benzeri olarak kabul edilir.

---

### `isAsync`

Belirtilen bir değerin bir asenkron fonksiyon olup olmadığını kontrol eder. Eğer değer bir asenkron fonksiyon ise `true`, değilse `false` döner. Bu fonksiyon, bir fonksiyonun `async` anahtar kelimesi ile tanımlanıp tanımlanmadığını belirlemek için kullanılır.

#### Örnek

```js
isAsync(() => {}); //=> false
```

```js
isAsync(async () => {}); //=> true
```

---

### `isAsyncIterable`

Belirtilen bir değerin bir asenkron olarak yinelenebilir olup olmadığını kontrol eder. Eğer değer bir asenkron olarak yinelenebilir ise `true`, değilse `false` döner.

#### Örnek

```js
isAsyncIterable([1, 2, 3]); //=> false
```

```js
isAsyncIterable(Promise.resolve([1, 2, 3])); //=> false
```

```js
isAsyncIterable(toAsync([1, 2, 3])); //=> true
```

---

### `isBoolean`

Belirtilen bir değerin mantıksal veri türü olup olmadığını kontrol eder. Eğer değer bir mantıksal veri türü ise `true`, değilse `false` döner.

#### Örnek

```js
isBoolean(true); //=> true
```

```js
isBoolean(false); //=> true
```

```js
isBoolean(["price", "discount"]); //=> false
```

```js
isBoolean(null); //=> false
```

> Örneğin, `true` veya `false` değerleri için `true`, diğer durumlar için `false` döndürür.

---

### `isClass`

Belirtilen bir değerin bir sınıf olup olmadığını kontrol eder. Eğer değer bir sınıf ise `true`, değilse `false` döner. Bu fonksiyon, bir değerin bir sınıf tanımı olup olmadığını veya bir sınıf örneği olup olmadığını belirlemek için kullanılır.

#### Örnek

```js
class Router {
  constructor() {
    this.routes = {};
  }
}

isClass(Router); //=> true
```

> Örneğin, `Router` sınıfı için `true`, diğer durumlar için `false` döndürür.

Eğer bir sınıf bir değişkene atanır ve kontrol edilirse;

```js
const router = new Router();
isClass(router); //=> false
```

Sonuç `false` dönecektir.

---

### `isClient`

Mevcut ortamın istemci tarafı olup olmadığını kontrol eder. Eğer ortam istemci tarafında çalışıyorsa `true`, değilse `false` döner. Bu fonksiyon, kodun istemci tarafında mı yoksa sunucu tarafında mı çalıştığını belirleyerek koşullu olarak kod çalıştırmak için kullanılır.

#### Örnek

```js
if (isClient()) {
  //=> true | false
  // İstemci tarafında çalışan kod bloğu
} else {
  // Sunucu tarafında çalışan kod bloğu
}
```

---

### `isCollect`

Belirtilen bir değerin bir koleksiyon olup olmadığını kontrol eder. Dizi ve nesne türlerini tek bir kategori altında toplamak için 'koleksiyon' terimini kullanıyoruz. Eğer değer bir koleksiyon ise, yani dizi veya nesne ise `true`, değilse `false` döner.

#### Örnek

```js
isCollect([1, 2, 3]); //=> true
```

```js
isCollect({
  firstname: "Albert",
  lastname: "Einstein",
});
//=> true
```

---

### `isDate`

Belirtilen bir değerin `Date` türünde olup olmadığını kontrol eder. Eğer değer bir `Date` nesnesi ise `true`, değilse `false` döner. Bu fonksiyon, bir değerin `Date` sınıfının bir örneği olup olmadığını belirlemek için kullanılır.

#### Örnek

```js
isDate(new Date()); //=> true
```

```js
isDate(new Date().getTime()); //=> false
```

---

### `isElement`

Belirtilen değerin bir Element nesnesi olup olmadığını kontrol eder.

#### Örnek

```js
isElement(document.createElement("div")); //=> true
```

```js
isElement(document.createTextNode("Hi there and greetings!")); //=> false
```

---

### `isEmpty`

Belirtilen bir değerin boş olup olmadığını kontrol eder. Eğer değer boş bir dize, sembol, koleksiyon (dizi, nesne, Map, Set) veya diğer ilkel türlerden (sayı, null, undefined, boolean, fonksiyon, düzenli ifade) biri ise boş kabul edilir. Eğer değer boş ise `true`, değilse `false` döner.

#### Örnek

```js
isEmpty([]); //=> true
isEmpty([1, 2, 3]); //=> false
```

```js
isEmpty({}); //=> true
isEmpty({ foo: "bar" }); //=> false
isEmpty(Object.create(null)); //=> true
isEmpty(Object.create({})); //=> true
isEmpty(Object.create({ foo: "bar" })); //=> false
```

```js
isEmpty(new Map()); //=> true
isEmpty(new Map().set("foo", "bar")); //=> false
```

```js
isEmpty(new Set()); //=> true
isEmpty(new Set([1, 2, 3])); //=> false
```

```js
isEmpty(Symbol()); //=> true
isEmpty(Symbol("foo")); //=> false
```

```js
isEmpty(""); //=> true
isEmpty(String("")); //=> true
isEmpty(new String("")); //=> true
isEmpty("foo"); //=> false
isEmpty(String("foo")); //=> false
isEmpty(new String("foo")); //=> false
```

```js
isEmpty(0); //=> true
isEmpty(Number(0)); //=> true
isEmpty(new Number(0)); //=> true
isEmpty(1); //=> true
isEmpty(Number(1)); //=> true
isEmpty(new Number(1)); //=> true
```

```js
isEmpty(true); //=> true
isEmpty(Boolean(true)); //=> true
isEmpty(new Boolean(true)); //=> true
isEmpty(false); //=> true
isEmpty(Boolean(false)); //=> true
isEmpty(new Boolean(false)); //=> true
```

```js
isEmpty(function noop() {}); //=> true
isEmpty(class MyClass {}); //=> true
```

```js
isEmpty(/s+/g); //=> true
isEmpty(new RegExp("s+", "g")); //=> true
```

```js
isEmpty(null); //=> true
isEmpty(undefined); //=> true
```

---

### `isEqual`

Verilen iki değerin birbirine eşit olup olmadığını kontrol eder. Değerleri derinlemesine karşılaştırır, nesnelerin her özelliğini rekürsif olarak karşılaştırır. Eğer değerler eşitse `true`, değilse `false` döner.

#### Örnek

```js
isEqual([1, 2, 3], [1, 2, 3]); //=> true
```

```js
isEqual({ a: { b: 1 } }, { a: { b: 1 } }); //=> true
```

```js
const brand = "New Balance";
isEqual(typeof brand, "string"); //=> true
```

```js
const checkPermission = (userId) => {
  return true;
};
isEqual(checkPermission(), true); //=> true
```

---

### `isError`

Belirtilen bir değerin bir hata sınıfına ait olup olmadığını kontrol eder. Eğer değer bir hata sınıfının bir örneği ise `true`, değilse `false` döner.

#### Örnek

```js
const error = new Error();
isError(error); //=> true
```

```js
try {
  //...//
} catch (error) {
  if (isError(error)) {
    //=> true
  }
}
```

---

### `isEven`

Belirtilen bir değerin çift bir sayı olup olmadığını kontrol eder. Eğer değer bir çift sayı ise `true`, değilse `false` döner. Bu fonksiyon, bir değerin 2'ye bölünüp kalanı olmadan bölünüp bölünmediğini belirlemek için kullanılır.

#### Örnek

```js
isEven(6); //=> true
```

```js
isEven(5); //=> false
```

> Yukarıdaki örnekte, `isEven` fonksiyonu, parametre olarak aldığı sayının 2'ye bölümünden kalanın 0 olup olmadığını kontrol eder. Eğer kalan 0 ise, fonksiyon `true` değerini döndürür; aksi takdirde, `false` değerini döndürür.

---

### `isFalse`

Belirtilen bir değerin `false` değerine eşit olup olmadığını kontrol eder. Eğer değer `false` ise `true`, değilse `false` döner.

#### Örnek

```js
isFalse(false); //=> true
```

```js
isFalse(true); //=> false
```

---

### `isFalsy`

Belirtilen bir değerin yanlış olup olmadığını kontrol eder. Eğer değer yanlış ise `true`, değilse `false` döner. Bu fonksiyon, bir değerin boolean bağlamda yanlış olarak değerlendirilip değerlendirilmediğini belirlemek için kullanılır.

#### Örnek

```js
isFalsy(true); //=> false
```

```js
isFalsy(" "); //=> false
```

```js
isFalsy(1); //=> false
```

```js
isFalsy(false); //=> true
```

```js
isFalsy(""); //=> true
```

```js
isFalsy(0); //=> true
```

---

### `isFloat`

Belirtilen bir değerin kesirli bir sayı olup olmadığını kontrol eder. Eğer değer bir kesirli sayı ise `true`, değilse `false` döner.

#### Örnek

```js
isFloat(34.5); //=> true
```

```js
isFloat(23); //=> false
```

> Örneğin, `34.5` için `true`, `23` için `false` döndürür.

---

### `isFunction`

Belirtilen bir değerin bir fonksiyon olup olmadığını kontrol eder. Eğer değer bir fonksiyon ise `true`, değilse `false` döner.

#### Örnek

```js
isFunction(function test() {
  return "This is test function.";
}); //=> true
```

```js
isFunction("This is a test function."); //=> false
```

---

### `isInteger`

Belirtilen bir değerin bir tam sayı olup olmadığını kontrol eder. Eğer değer bir tam sayı ise `true`, değilse `false` döner.

#### Örnek

```js
isInteger(1); //=> true
```

```js
isInteger(9007199254740992); //=> true
```

```js
isInteger(-9007199254740992); //=> true
```

```js
isInteger(-100000); //=> true
```

```js
isInteger(0); //=> true
```

```js
isInteger(0.1); //=> false
```

```js
isInteger(Math.PI); //=> false
```

```js
isInteger(NaN); //=> false
```

```js
isInteger("10"); //=> false
```

```js
/**
 * Number.MAX_VALUE aslında kesirli bir sayı fakat
 * büyük ihtimal javascriptin kendi fonksiyonu yanlış çalışıyor.
 * şimdilik düzeltmek için ekstra kod yazmadık.
 */
isInteger(Number.MAX_VALUE); //=> true
```

```js
isInteger(Infinity); //=> false
```

---

### `isIterable`

Belirtilen koleksiyonun yinelenebilir olup olmadığını kontrol eder. Eğer koleksiyon yinelenebilir ise `true`, değilse `false` döner. Bu fonksiyon, bir koleksiyonun bir döngü veya yineleyici kullanılarak yinelenebilir olup olmadığını belirlemek için kullanılır.

#### Örnek

```js
isIterable("Isaac Newton"); //=> true
```

```js
isIterable([1, 2, 3]); //=> true
```

```js
isIterable(new Map()); //=> true
```

```js
isIterable(new Set()); //=> true
```

```js
isIterable({ id: 1 }); //=> false
```

```js
isIterable(toAsync([1, 2, 3])); //=> false
```

```js
isIterable(new WeakMap()); //=> false
```

> Örneğin, bir dizi, string, Map veya Set gibi yinelenebilir objeler için `true`, diğer durumlar için `false` döndürür.

---

### `isKey`

Belirtilen değerin verilen kaynağa ait bir anahtar olup olmadığını kontrol eder. Eğer değer kaynağın bir anahtarı ise `true`, değilse `false` döner.

#### Örnek

```js
isKey("fullname", {
  name: "Messi",
  fullname: "Lionel Andrés Messi Cuccittini",
}); //=> true
```

---

### `isLocalStorage`

Tarayıcının `localStorage` özelliğini destekleyip desteklemediğini kontrol eder. Eğer özellik destekleniyorsa `true`, desteklenmiyorsa `false` döner.

#### Örnek

```js
isLocalStorage(); //=> true || false
```

---

### `isNaN`

Belirtilen değerin `NaN` olup olmadığını ve tipinin `Number` olup olmadığını kontrol eder. Eğer değer `NaN` ise `true`, değilse `false` döner.

#### Örnek

```js
isNaN(NaN); //=> true
isNaN(Number.NaN); //=> true
isNaN(0 / 0); //=> true
```

```js
isNaN(true); //=> false
isNaN(null); //=> true
isNaN(37); //=> false
isNaN("37"); //=> false
isNaN("37.37"); //=> false
isNaN(""); //=> true
isNaN(" "); //=> true
```

```js
// Bunlar global isNaN() ile doğru olurdu.
isNaN("NaN"); //=> false
isNaN(undefined); //=> false
isNaN({}); //=> false
isNaN("renit"); //=> false
```

> Örneğin, `NaN`, `Number.NaN`, ve `0 / 0` için `true`, diğer durumlar için `false` döndürür.

---

### `isNil`

Belirtilen değerin değersiz veya tanımsız olup olmadığını kontrol eder. Eğer değer değersiz veya tanımsız ise `true`, değilse `false` döner.

#### Örnek

```js
isNil(null); //=> true
```

```js
isNil(undefined); //=> true
```

```js
isNil({ foo: "bar" }); //=> false
```

> Örneğin, `null` veya `undefined` için `true`, diğer durumlar için `false` döndürür.

---

### `isNode`

Belirtilen değerin bir Node nesnesi olup olmadığını kontrol eder.

#### Örnek

```js
isNode(document.createElement("div")); //=> true
```

```js
isNode(document.createTextNode("Hi there and greetings!")); //=> true
```

---

### `isNull`

Belirtilen değerin değersiz olup olmadığını kontrol eder. Eğer değer değersiz ise `true`, değilse `false` döner.

#### Örnek

```js
isNull(null); //=> true
```

```js
isNull(undefined); //=> false
```

> Örneğin, `null` için `true`, `undefined` için `false` döndürür.

---

### `isNumber`

Belirtilen değerin bir sayı olup olmadığını kontrol eder. Eğer değer bir sayı ise `true`, değilse `false` döner.

#### Örnek

```js
isNumber(10); //=> true
```

```js
isNumber("10"); //=> false
```

```js
isNumber(new Date()); //=> false
```

```js
isNumber(new Date().getTime()); //=> true
```

```js
isNumber(true); //=> false
```

```js
isNumber(null); //=> false
```

```js
isNumber(undefined); //=> false
```

```js
isNumber(""); //=> false
```

```js
isNumber(NaN); //=> true
```

> Örneğin, `10`, `'10'`, ve `new Date().getTime()` için `true`, diğer durumlar için `false` döndürür.

---

### `isObject`

Belirtilen değerin gerçek bir obje olup olmadığını kontrol eder. Eğer değer bir gerçek obje ise `true`, değilse `false` döner.

#### Örnek

```js
isObject({ number: 15 }); //=> true
```

```js
isObject([1, 2, 3]); //=> false
```

```js
isObject(null); //=> false
```

> Örneğin, `{ number: 15 }` için `true`, `[1, 2, 3]` ve `null` için `false` döndürür. Not olarak belirtilmiştir ki, JavaScript'te `null` ve `Array` gibi veri tipleri genellikle bir obje olarak kabul edilir. Eğer sadece objeleri kontrol etmek istiyorsanız, `isObjects` fonksiyonunu kullanabilirsiniz.

---

### `isObjects`

Belirtilen değerin bir obje olup olmadığını kontrol eder. Eğer değer bir obje ise `true`, değilse `false` döner.

#### Örnek

```js
isObjects({ number: 15 }); //=> true
```

```js
isObjects([1, 2, 3]); //=> true
```

```js
isObjects(null); //=> true
```

> Örneğin, `{ number: 15 }`, `[1, 2, 3]`, ve `null` için hepsi de `true` döndürür. Bu fonksiyon, JavaScript'te `null` ve `Array` gibi veri tiplerini de bir obje olarak kabul eder.

---

### `isOdd`

Belirtilen değerin tek bir sayı olup olmadığını kontrol eder. Eğer değer tek bir sayı ise `true`, değilse `false` döner.

#### Örnek

```js
isOdd(6); //=> false
```

```js
isOdd(5); //=> true
```

> Yukarıdaki örnekte, `isOdd` fonksiyonu, parametre olarak aldığı sayının 2'ye bölümünden kalanın 0 olmamasını kontrol eder. Eğer kalan 0 değilse, fonksiyon `true` değerini döndürür; aksi takdirde, `false` değerini döndürür.

---

### `isPrimitive`

Belirtilen değerin ilkel bir tür olup olmadığını kontrol eder. Eğer değer ilkel bir tür ise `true`, değilse `false` döner.

#### Örnek

```js
isPrimitive(null); //=> true
```

```js
isPrimitive(undefined); //=> true
```

```js
isPrimitive(123); //=> true
```

```js
isPrimitive("renit"); //=> true
```

```js
isPrimitive(false); //=> true
```

```js
isPrimitive(function () {}); //=> false
```

```js
isPrimitive({}); //=> false
```

```js
isPrimitive(new Date()); //=> false
```

---

### `isPromise`

Belirtilen değerin bir eşzamansız olup olmadığını kontrol eder. Eğer değer bir eşzamansız ise `true`, değilse `false` döner.

#### Örnek

```js
isPromise(new Promise(resolve, reject)); //=> true
```

```js
isPromise(Promise.resolve("Success")); //=> true
```

```js
isPromise(Promise.reject("Error")); //=> true
```

```js
isPromise(function () {
  return Promise.resolve("Success");
}); //=> false
```

> Örneğin, `new Promise(resolve, reject)`, `Promise.resolve('Success')`, ve `Promise.reject('Error')` için hepsi de `true` döndürür. `function` türündeki bir değer için ise `false` döndürür.

---

### `isRegExp`

Belirtilen değerin bir düzenli ifade olup olmadığını kontrol eder. Eğer değer bir düzenli ifade ise `true`, değilse `false` döner.

#### Örnek

```js
isRegExp(/^[0-9a-fA-F]+$/); //=> true
```

```js
isRegExp("/^[0-9a-fA-F]+$/"); //=> false
```

> Örneğin, `/^[0-9a-fA-F]+$/` için `true`, `'/^[0-9a-fA-F]+$/` için `false` döndürür.

---

### `isServer`

Mevcut ortamın bir sunucu tarafı ortamı olup olmadığını kontrol eder. Eğer ortam bir sunucu ise `true`, değilse `false` döner.

#### Örnek

```js
if (isServer()) {
  //=> true | false
  // Sunucu tarafında çalışan kod bloğu
} else {
  // İstemci tarafında çalışan kod bloğu
}
```

---

### `isString`

Belirtilen değerin bir metin olup olmadığını kontrol eder. Eğer değer bir metin ise `true`, değilse `false` döner.

#### Örnek

```js
isString(["a", "b", "c", "d"]); //=> false
```

```js
isString(100); //=> false
```

```js
isString("Lorem ipsum dolor sit amet"); //=> true
```

```js
isString({ a: "a", b: "b" }); //=> false
```

> Örneğin, `'Lorem ipsum dolor sit amet'` için `true`, `[ 'a', 'b', 'c', 'd' ]` ve `100` için `false` döndürür.

---

### `isSymbol`

Belirtilen değerin bir sembol olup olmadığını kontrol eder. Eğer değer bir sembol ise `true`, değilse `false` döner. Semboller, benzersiz ve değişmez değerlerdir ve nesne özellik anahtarları olarak kullanılabilirler.

#### Örnek

```js
isSymbol(Symbol()); //=> true
```

```js
isSymbol(Symbol("foo")); //=> true
```

```js
isSymbol(Symbol.for("foo")); //=> true
```

```js
isSymbol(Symbol.iterator); //=> true
```

```js
isSymbol("foo"); //=> false
```

> Örneğin, `Symbol()` için `true`, `'foo'` için `false` döndürür.

---

### `isText`

Belirtilen değerin TextNode sınıfının bir örneği olup olmadığını kontrol eder.

#### Örnek

```js
isText(document.createElement("div")); //=> false
```

```js
isText(document.createTextNode("Hi there and greetings!")); //=> true
```

---

### `isTrue`

Belirtilen değerin `true` değerine eşit olup olmadığını kontrol eder. Eğer değer `true` ise `true`, değilse `false` döner.

#### Örnek

```js
isTrue(true); //=> true
```

```js
isTrue(false); //=> false
```

---

### `isTruthy`

Belirtilen değerin doğru olup olmadığını kontrol eder. Eğer değer doğru ise `true`, değilse `false` döner.

#### Örnek

```js
isTruthy(true); //=> true
```

```js
isTruthy(" "); //=> true
```

```js
isTruthy(1); //=> true
```

```js
isTruthy(false); //=> false
```

```js
isTruthy(""); //=> false
```

```js
isTruthy(0); //=> false
```

---

### `isType`

Berilen değerin gerçek tipini belirler.

#### Örnek

```js
isType(Promise.resolve("something"));
//=> standart => object
//=> dönen => promise
```

```js
isType(1); //=> number
```

```js
isType("text"); //=> string
```

```js
isType(() => {}); //=> function
```

```js
isType(async () => {});
//=> standart => function
//=> dönen => async
```

```js
isType(new Date());
//=> standart => object
//=> dönen => date
```

```js
isType(new Error());
//=> standart => object
//=> dönen => error
```

```js
isType(Symbol("is")); //=> symbol
```

```js
isType(class User {});
//=> standart => function
//=> dönen => class
```

```js
isType(new User()); //=> object
```

> Örneğin, `1` için `number`, `'text'` için `string`, `async () => {}` için `async` döndürür.

---

### `isUndefined`

Belirtilen değerin tanımsız olup olmadığını kontrol eder. Eğer değer tanımsız ise `true`, değilse `false` döner.

#### Örnek

```js
isUndefined(null); //=> false
```

```js
isUndefined(undefined); //=> true
```

```js
isUndefined({ foo: "bar" }); //=> false
```

> Örneğin, `undefined` için `true`, `null` için `false` döndürür.
