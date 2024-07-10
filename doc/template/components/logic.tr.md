# Mantık Bölümü

Bileşenin ana JavaScript kodlarının yazıldığı bölümdür.

```nit
<script>
  // JavaScript
</script>
```

`script` elementi sayfanın en üstünde olmak zorunda değildir; sadece ilk ulaşılan `script` elementi ana mantık kodlarını içermelidir.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">standart2.nit</span><span id="p3">fragment.nit</span><span id="p4">fragment2.nit</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  const name = "world";
</script>

<h1>Hello {name}!</h1>
```

</div>

<div class="file-page" id="p2c">

```nit
<div>
  <script>
    const name = "world";
  </script>

  <h1>Hello {name}!</h1>
</div>
```

</div>

<div class="file-page" id="p3c">

```nit
<div @name="hello">
  <h1>Hello {name}!</h1>

  <script>
    const name = "world";
  </script>
</div>
```

</div>

<div class="file-page" id="p4c">

```nit
<div @name="hello">
  <script>
    const name = "world";
  </script>

  <h1>Hello {name}!</h1>
</div>
```

</div>
</div>

Özetle, ana mantık kodlarını içeren `script` elementinin yerinin bir önemi yoktur. Yukarıdan aşağıya doğru giderken ilk bulunması yeterlidir.

> Ancak bu kural, ikinci bir `script` elementi kullanıldığında değişir.

Yine aynı şekilde ilk bulunan `script` elementi ana mantık kodlarıdır. Özellikle ikinci bir kullanımda, parça bileşenlerde `script` elementi son sırada kullanılamaz.

#### Örnek

<div class="file file-multi">
<div class="file-line"><span id="p1">standart.nit</span><span id="p2">fragment.nit</span></div>

<div class="file-page" id="p1c">

```nit
<script>
  let name = "world";
</script>

<h1>Hello {name}!</h1>
<!-- Hello world! -->

<script>
  name = "everyone";
</script>

<h2>Hello {name}!</h2>
<!-- Hello everyone! -->
```

</div>

<div class="file-page" id="p2c">

```nit
<div @name="hello">
  <script>
    let name = "world";
  </script>

  <h1>Hello {name}!</h1>
  <!-- Hello world! -->

  <script>
    name = "everyone";
  </script>

  <h2>Hello {name}!</h2>
  <!-- Hello everyone! -->
</div>

<hello />
```

</div>

</div>

İlk kullanılan `script` elementi dışında kalan diğer `script` elementleri, araya istediğiniz JavaScript kodunu yerleştirmenize olanak tanır.
