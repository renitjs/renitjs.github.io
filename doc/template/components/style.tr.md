# Stil Tanımları Bölümü

Bileşenin ana CSS kodlarının yazıldığı bölümdür.

```nit
<style>
  /* CSS */
</style>
```

`style` elementi sayfanın en altında olmak zorunda değildir; yalnızca son ulaşılan `style` elementi ana stil tanımlarını içermelidir.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">standart2.nit</span><span id="p3">fragment.nit</span><span id="p4">fragment2.nit</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  const name = "world";
</script>

<h1 class="title">Hello {name}!</h1>

<style>
  .title {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```nit
<div>
  <script>
    const name = "world";
  </script>

  <style>
    .title {
      color: blue;
    }
  </style>

  <h1 class="title">Hello {name}!</h1>
</div>
```

</div>

<div class="file-page" id="p3c">

```nit
<div @name="hello">
  <h1 class="title">Hello {name}!</h1>

  <script>
    const name = "world";
  </script>

  <style>
    .title {
      color: blue;
    }
  </style>
</div>
```

</div>

<div class="file-page" id="p4c">

```nit
<div @name="hello">
  <script>
    const name = "world";
  </script>

  <style>
    .title {
      color: blue;
    }
  </style>

  <h1 class="title">Hello {name}!</h1>
</div>
```

</div>
</div>

Özetle, ana stil tanımlarını içeren `style` elementinin yerinin bir önemi yoktur. Yukarıdan aşağıya doğru giderken son bulunması yeterlidir.

> İkinci bir `style` etiketi kullanıldığında, sadece bulunduğu bölüme etki eder.

#### Örnek

```nit
<script>
  const name = "world";
</script>

<div>
  <p>Hello {name}!</p> <!-- blue -->

  <p> <!-- orange -->
    Hello {name}!
    <style>
      .this {
        color: orange !important;
      }
    </style>
  </p>

</div>

<style>
  .this p {
    color: blue;
  }
</style>
```

## İçe içe geçmiş stil tanımları

Renit bileşenleri hiçbir eklentiye gerek duymadan standart olarak iç içe geçmiş CSS kodlarını destekler.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<div>
  <h1>Hello <span>world</span>!</h1>
</div>

<style>
  div {
    h1 {
      color: blue;
      span {
        color: orange;
        &:hover {
          color: red;
        }
      }
    }
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```css
div h1 {
  color: blue;
}
div h1 span {
  color: orange;
}
div h1 span:hover {
  color: red;
}
```

</div>

</div>

## Karşınızda `this`

Bileşenlere eklenen CSS kodları, HTML'deki gibi globaldir. Yani kendisinden sonra gelen bileşenlere de etki eder.

> Aşağıdaki örnekte tüm `div` elementlerinin rengi mavi olur.

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">sub.nit</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  import sub from "./sub.nit";
</script>

<div>Hello</div>
<sub />

<style>
  div {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```nit
<div>world!</div>
```

</div>

</div>

Eğer stil tanımlarını bileşene özel yapmak istiyorsak, `this` kullanıyoruz.

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">sub.nit</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  import sub from "./sub.nit";
</script>

<div>Hello</div>
<sub />

<style>
  .this div {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```nit
<div>world!</div>

<style>
  .this {
    color: orange;
  }
</style>
```

</div>

</div>

#### `this` bileşende bulabildiği en üst elementi temsil eder.

Aşağıdaki örnekte en üst element `p` olduğundan, `.this` `p` elementini hedef alır.

```nit
<p>Hi!</p>

<style>
  .this {
    color: blue;
  }
</style>
```

Aşağıdaki örnekte en üst element `div` olduğundan, `.this` `div` elementini hedef alır.

```nit
<div>
  <p>Hi!</p>
</div>

<style>
  .this p {
    color: blue;
  }
</style>
```

Aşağıdaki örnekteki gibi en üst element yoksa;

```nit
<p>Hi!</p>
<p>Hi!</p>

<style>
  .this p {
    color: blue;
  }
</style>
```

Yine aynı şekilde, `.this` görünmeyen bir `div` elementini hedef alır. Yukarıdaki örnekte HTML çıktısı aşağıdaki gibi olur:

```nit
<div>
  <p>Hi!</p>
  <p>Hi!</p>
</div>
```

### `this` ne yapıyor?

Kullanımınıza göre bir stil adı düşünmenize gerek duymadan `.this` veya `#this` olarak yeni bir stil adı oluşturabilirsiniz.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">component.nit</span><span id="p2">HTML</span><span id="p3">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<div>
  <p>Hello</p>
  <div>
    <p>world!</p>
    <style>
      .this p {
        color: orange;
      }
    </style>
  </div>
</div>

<style>
  .this p {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```nit
<div class="a">
  <p>Hello</p>
  <div class="b">
    <p>world!</p>
  </div>
</div>
```

</div>

<div class="file-page" id="p3c">

```css
.a p {
  color: blue;
}

.b p {
  color: orange;
}
```

</div>

</div>

## ID ve class isimleri

Tüm ID ve class isimleri, bileşene özel olarak yeniden adlandırılır.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">component.nit</span><span id="p2">HTML</span><span id="p3">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<p id="title">Hello world!</p>
<p class="desc">Lorem ipsum dolar sit amet.</p>

<style>
  #title {
    color: blue;
  }
  .desc {
    color: orange;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```nit
<p id="a">Hello world!</p>
<p class="b">Lorem ipsum dolar sit amet.</p>
```

</div>

<div class="file-page" id="p3c">

```css
#a {
  color: blue;
}

.b p {
  color: orange;
}
```

</div>

</div>

Stiller yeniden adlandırılırken veri tasarrufu için kısa tutulur.

<div class="file file-multi">
<div class="file-line"><span id="p1">component.nit</span><span id="p2">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<style>
  .title {}
  .desc {}
  /* ... */
  .modal {}
  .modal-content {}
  .modal-content .model-close {}
</style>
```

</div>

<div class="file-page" id="p2c">

<!-- prettier-ignore -->
```css
.a {}
.d {}
/* ... */
.aXc {}
.dTaE {}
.dTaE .eioPc {}
```

</div>

</div>

## Global stiller

Bazen bir stil adını global olarak kullanmamız gerekebilir; bu durumda `:g()` veya `:global()` kullanıyoruz. Global CSS adları da aynı şekilde veri tasarrufu için yeniden adlandırılır.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">component.nit</span><span id="p2">sub.nit</span><span id="p3">HTML</span><span id="p4">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  import sub from './sub.nit';
</script>

<div class="title">Hello world!</div>
<p class="desc">Lorem ipsum dolar sit amet.</p>
<sub />

<style>
  .title {
    color: blue;
  }
  :g(.desc) {
    color: orange;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

<!-- prettier-ignore -->
```nit
<p class="desc">Curabitur dapibus purus elit.</p>
```

</div>

<div class="file-page" id="p3c">

<!-- prettier-ignore -->
```nit
<div class="a">Hello world!</div>
<p class="b">Lorem ipsum dolar sit amet.</p>
<p class="b">Curabitur dapibus purus elit.</p>
```

</div>

<div class="file-page" id="p4c">

<!-- prettier-ignore -->
```css
.a {
  color: blue;
}
.b {
  color: orange;
}
```

</div>

</div>

## Statik stiller

Bazen bir stil adına karışılmamasını isteyebiliriz; bu durumda `:s()` veya `:static()` kullanıyoruz. Statik CSS adları yeniden adlandırılmaz.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">component.nit</span><span id="p2">sub.nit</span><span id="p3">HTML</span><span id="p4">CSS</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  import sub from './sub.nit';
</script>

<div class="title">Hello world!</div>
<p class="desc mt-5">Lorem ipsum dolar sit amet.</p>
<sub />

<style>
  .title {
    color: blue;
  }
  :g(.desc) {
    color: orange;
  }
  :s(.mt-5) {
    margin-top: 5px;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

<!-- prettier-ignore -->
```nit
<p class="desc mt-5">Curabitur dapibus purus elit.</p>
```

</div>

<div class="file-page" id="p3c">

<!-- prettier-ignore -->
```nit
<div class="a">Hello world!</div>
<p class="b mt-5">Lorem ipsum dolar sit amet.</p>
<p class="b mt-5">Curabitur dapibus purus elit.</p>
```

</div>

<div class="file-page" id="p4c">

<!-- prettier-ignore -->
```css
.a {
  color: blue;
}
.b {
  color: orange;
}
.mt-5 {
  margin-top: 5px;
}
```

</div>

</div>

## Dinamik stiller

Stil adlarını dinamik olarak belirtmek istediğimizde bir sorunla karşılaşıyoruz. Aşağıdaki örnek normalde çalışmamalıydı, ancak Renit tüm string ifadeleri kontrol ederek stil adlarını kontrol eder ve gerektiği yerde düzeltir.

#### Örnek

```nit
<script>
  const name = "title";
</script>

<div class={name}>Hello world!</div>

<style>
  .title {
    color: blue;
  }
</style>
```

Renit yukarıda bulunan `name` sabitini kontrol eder; eğer bir string olarak bir stil tanımı belirtilmişse, bunu `.title` için yeniden adlandırılan stil adıyla değiştirir.

```js
const name = "a";
```

Bu konu sadece burada karmaşık hale geliyor. Stil adlarını oluştururken, mantık bölümünde stil ile ilgili olmayan şekillerde kullanılmadığından emin olmak gerekiyor.
