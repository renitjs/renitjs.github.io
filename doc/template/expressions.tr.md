# İfadeler

Görünüm bölümünde HTML şablonuna süslü parantez kullanarak JavaScript ifadelerini bağlayabilirsiniz.

```nit
<script>
  const name = "Hi";
</script>

<div>{name}</div>
```

## İfade içeriği

Bir ifadenin içeriği, JavaScript'in sözdizimi kullanımına benzer şekilde desteklenir.

```nit
<script>
  import { ucwords } from "renit/to";
  const name = "hello world!";
</script>

<div>{ucwords(name)}</div>
<!-- <div>Hello World!</div> -->
```

```nit
<script>
  const num1 = 1;
  const num2 = 10;
</script>

<div>{num1} + {num2} = {num1 + num2}</div>
<!-- <div>1 + 10 = 11</div> -->
```

```nit
<script>
  const type = 1;
</script>

<div>{type == 1 ? 'hello' : 'world'}</div>
<!-- <div>hello</div> -->
```

### Statik ifadeler

Bir ifadenin değişiklik kontrolünü atlamak ve statik olduğunu belirtmek için süslü parantezlerin başına (`=`) işareti ekleriz. Bu, `name` ifadesini herhangi bir fonksiyona eklenmeyeceğini ve bir değişiklik kontrolüne tabi tutulmayacağını belirttiğinden dolayı bize performans artışı sağlar.

```nit
<script>
  const name = "Hello World!";
</script>

<div>{=name}</div>
```

Aşağıdaki bileşen ile yukarıdaki bileşen aynı sonucu verir, ancak yukarıdaki bileşen daha hızlı çalışır.

```nit
<script>
  const name = "Hello World!";
</script>

<div>{name}</div>
```

### HTML ifadeler

Bir bileşenin içeriğine HTML eklemek istediğimizde `@html` ifadesini kullanırız.

```nit
<script>
  const tag = "<p>Hello World!</p>";
</script>

<div>{@html tag}</div>
```
