# Bileşenler

Web geliştirme dünyasında, karmaşık uygulamaları daha yönetilebilir ve ölçeklenebilir hale getirmenin yollarından biri, bileşen tabanlı mimarilerin kullanılmasıdır. Bileşenler, bir web uygulamasını küçük, bağımsız parçalara bölen ve her bir parçanın kendi işlevselliğini, görünüşünü ve davranışını tanımlayan yapısal bir birimdir.

Renit bileşenlerinin dosya uzantısı `.nit` şeklinde olmalıdır. Bileşenler ihtiyacınıza uygun olarak üç farklı türde oluşturulmuştur.

## Bileşenlerin Ortak Yapısı

Bileşen yapısı üç ana bölümden oluşur:

1. **Mantık (Logic) Bölümü**: Bu bölüm, bileşenin işlevselliğini belirleyen JavaScript kodlarını içerir. Kullanıcı etkileşimleri, veri işleme işlemleri ve diğer dinamik özellikler bu bölümde tanımlanır.

2. **Görünüş (Markup) Bölümü**: Bu bölüm, bileşenin HTML yapısını tanımlar. Kullanıcı arayüzünün nasıl görüneceği burada belirtilir. Bileşenin hangi elementlerden oluştuğu ve bu elementlerin nasıl bir araya getirildiği bu bölümde tanımlanır.

3. **Stil Tanımları (Style) Bölümü**: Bu bölüm, bileşenin görünüşünü şekillendiren CSS kodlarını içerir. Bileşenin renkleri, boyutları, arka planları ve diğer stil özellikleri bu bölümde belirtilir.

## Bileşen Türleri

Bileşenler üç farklı türde olabilir:

### 1. Standart Bileşenler

Standart bileşenler, genellikle tek bir bileşenin oluşturulması için kullanılan temel yapı taşlarıdır. Her bir bileşen, kendi içinde mantığı (logic), görünüşü (markup) ve stil tanımlarını (style) içerir.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<script>
  // Standart bileşenin JavaScript mantığı
</script>

<!-- Standart bileşenin HTML işaretlemesi -->

<style>
  /* Standart bileşenin stil tanımları */
</style>
```

</div>

#### Örnek

Standart bileşenlerde, bileşen adı dosya adıdır.

<div class="file file-multi">
<div class="file-line"><span id="p1">title.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<script>
  // 'name' adında bir değişken oluşturuyoruz.
  export let name = "world";
</script>

<!-- 'name' değişkenini kullanarak bir başlık oluşturuyoruz. -->
<h1>Hello {name}!</h1>

<style>
  /* Başlık bileşenine ait <h1> elementinin görünümünü belirliyoruz. */
  .this h1 {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // Başlık bileşenini içeri aktarıyoruz.
  import title from "./title.nit";
</script>

<!-- İlk başlık bileşeni: Varsayılan olarak "Hello world!" metnini kullanır. -->
<title />

<!-- İkinci başlık bileşeni: 'name' parametresi ile "Hello Renit!" metnini kullanır. -->
<title name="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// 'app' bileşenini içeri aktarıyoruz.
import app from "./app.nit";

// 'app' bileşenini belirlenen hedefe (document.body) yerleştiriyoruz.
app(document.body);
```

</div>

</div>

### 2. Parça Bileşenler

Parça bileşenler, bir sayfada birden fazla bileşenin bir araya getirilerek oluşturulduğu yapıdır. Her bir parça bileşen, kendi içinde mantığı (logic), görünüşü (markup) ve stil tanımlarını (style) içerir.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<element @name="">
  <!-- Parça bileşenin HTML işaretlemesi -->

  <script>
    // Parça bileşenin JavaScript mantığı
  </script>

  <style>
    /* Parça bileşenin stil tanımları */
  </style>
</element>
```

</div>

#### Örnek

Parça bileşenlerde, bileşen adı `@name` özniteliği aracılığıyla belirlenir.

<div class="file file-multi">
<div class="file-line"><span id="p1">header.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<!-- Başlık parça bileşeni -->
<h1 @name="title">
  Hello {name}!

  <script>
    // Başlık parça bileşenine ait 'name' değişkeni
    export let name = "world";
  </script>

  <style>
    /*  Başlık parça bileşenin görünümü ".this" <h1> elementini hedef alır. */
    .this {
      color: blue;
    }
  </style>
</h1>

<!-- Açıklama parça bileşeni -->
<div @name="description">
  <p>{text}</p>
  <script>
    // Açıklama parça bileşenine ait 'text' değişkeni
    export let text = "renit";
  </script>
</div>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // 'header.nit' dosyasından 'title' ve 'description' bileşenlerini içeri aktarıyoruz.
  import { title, description } from "./header.nit";
</script>

<!-- İlk başlık bileşeni: Varsayılan olarak tanımlı 'name' değişkenini kullanır. -->
<title />

<!-- İlk açıklama bileşeni: Varsayılan olarak tanımlı 'text' değişkenini kullanır. -->
<description />

<!-- İkinci başlık bileşeni: 'name' parametresi ile "Renit" metnini kullanır. -->
<title name="Renit" />

<!-- İkinci açıklama bileşeni: 'text' parametresi ile "Renit" metnini kullanır. -->
<description text="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// 'app' bileşenini içeri aktarıyoruz.
import app from "./app.nit";

// 'app' bileşenini belirlenen hedefe (document.body) yerleştiriyoruz.
app(document.body);
```

</div>

</div>

### 3. Bileşik Bileşenler

Bileşik bileşenler, daha karmaşık ve yapısal olarak zengin bileşenler oluşturmak için kullanılan yapıdır. Bu bileşenler, içlerinde birden çok parça bileşeni barındırabilir ve daha karmaşık işlevselliği temsil edebilirler.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<script>
  // Standart bileşenin JavaScript mantığı
</script>

<!-- Standart bileşenin HTML işaretlemesi -->

<element @name="">
  <!-- Parça bileşenin HTML işaretlemesi -->

  <script>
    // Parça bileşenin JavaScript mantığı
  </script>

  <style>
    /* Parça bileşenin stil tanımları */
  </style>
</element>

<!-- Standart bileşenin HTML işaretlemesi -->

<style>
  /* Standart bileşenin stil tanımları */
</style>
```

</div>

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">header.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<script>
  // 'name' ve 'text' adında değişkenler oluşturuyoruz
  export let name = "header";
  export let text = "renit";
</script>

<!-- Başlık standart bileşenine başlıyoruz -->
<div>
  <p>Start</p>
</div>

<!-- Başlık bileşeni -->
<h1 @name="title">
  Hello {name}!

  <script>
    // Parça bileşenin 'name' değişkenini tanımlanıyoruz
    export let name = "world";
  </script>

  <style>
    /* Başlık bileşeninin görünümü: h1 elementini hedef alıyor */
    .this {
      color: blue;
    }
  </style>
</h1>

<!-- Açıklama bileşeni -->
<div @name="description">
  <p>{text}</p>
  <script>
    // Parça bileşenin 'text' değişkenini tanımlanıyoruz
    export let text = "renit";
  </script>
</div>

<!-- Parça Başlık bileşenine Standart bileşenin "name" değişkeninin gönderiyoruz -->
<title name="{name}" />

<!-- Parça Açıklama bileşenine standart bileşenin "text" değişkenini gönderiyoruz -->
<description text="{text}" />

<!-- Başlık standart bileşenine ekleme yapıyoruz -->
<div>
  <p>End</p>
</div>

<!-- Standart bileşenin stil tanımları parça bileşenlere etki etmez -->
<style>
  /* Başlık standart bileşeninin içinde bulunan div > p elementlerini hedef alıyoruz */
  .this div p {
    font-size: 12px;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // 'header.nit' dosyasından 'header', 'title' ve 'description' bileşenlerini içeri aktarıyoruz.
  import header, { title, description } from "./header.nit";
</script>

<!-- 'header' bileşenini çağırıyoruz -->
<header />

<!-- Varsayılan 'title' bileşenini çağırıyoruz -->
<title />

<!-- Varsayılan 'description' bileşenini çağırıyoruz -->
<description />

<!-- 'name' parametresi ile 'title' bileşenini çağırıyoruz -->
<title name="Renit" />

<!-- 'text' parametresi ile 'description' bileşenini çağırıyoruz -->
<description text="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// 'app' bileşenini içeri aktarıyoruz.
import app from "./app.nit";

// 'app' bileşenini belirlenen hedefe (document.body) yerleştiriyoruz.
app(document.body);
```

</div>

</div>
