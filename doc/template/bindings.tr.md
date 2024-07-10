# Bağlamalar

JavaScript ifadeleri ile HTML elementleri arasındaki iletişimi sağlamak için bağlamaları kullanırız.

## Tek yönlü bağlama

Görünüm bölümünde bir JavaScript ifadesini HTML elementin içeriğine veya elementin özniteliğine tek yönlü bağlayabilirsiniz.

```nit
<script>
  const name = "hello";
</script>

<p class={name}>{name}</p>
<p class="mt-1 {name}">{name}</p>
```

Eğer JavaScript ifadesinin adı elementin öznitelik adı ile aynıysa sadece ifade kullanarak bağlayabilirsiniz.

```nit
<script>
  const value = "Hello World!";
</script>

<input type="text" {value} />
```

## Çift yönlü bağlama

Görünüm bölümünde yapılacak bir değişiklikte JavaScript ifadesini güncellemek için `:` karakterini özniteliğin başına eklemelisiniz.

```nit
<script>
  let value = "Hello World!";
  let checked = false;
</script>

<p>{value}</p>
<input type="text" :value={value} />

<p>{checked}</p>
<input type="checkbox" :checked />
```
