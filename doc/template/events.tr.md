# Olaylar

Bir olayı dinlemek için `@` özniteliği kullanabilirsiniz. `@` işaretinden sonra gelen olayın adı olmalıdır. Örneğin; `@click`, `@keyup` gibi. Olay isimlerini <a href="https://www.w3schools.com/jsref/dom_obj_event.asp" target="_blank">bu adresten</a> inceleyebilirsiniz.

```nit
<script>
  let num = 1;
  function add() {
    num++;
  }
</script>

<p>{num}</p>
<button @click={add}>Add</button>
<button @click="add">Add</button>
<button @click:add>Add</button>
```

Fonksiyon adınız olayın adı ile aynıysa sadece `@` ifadesi olarak kullanabilirsiniz.

```nit
<script>
  let num = 1;
  function click() {
    num++;
  }
</script>

<p>{num}</p>
<button @click>Add</button>
```

Lamda fonksiyonu olarakda kullanabilirsiniz.

```nit
<script>
  let num = 1;
</script>

<p>{num}</p>
<button @click={num++}>Add</button>
<button @click={() => num++}>Add</button>
<button @click="num++">Add</button>
```

## Fonksiyon özellikleri

Bir fonksiyona özellik göndermek için aşağıdaki iki yöntem de aynı sonuca varır.

```nit
<script>
  let num = 1;
  function calc(type) {
    if(type == 1) {
      num++;
    } else {
      num--;
    }
  }
</script>

<p>{num}</p>
<button @click={calc(1)}>Add</button>
<button @click={() => calc(2)}>Subtract</button>
```

## Etkinlik referansı

Bir etkinliğin referansına ulaşmak için iki farklı yöntem vardır; birincisi lamda fonksiyonu kullanmak, ikincisi `$event` özelliğini kullanmaktır.

```nit
<button @click={(e) => fn(e)}>Click</button>
<button @click={fn($event)}>Click</button>
```

## Element referansı

Geçerli elementin referansını almak için `$element` özelliğini kullanabilirsiniz.

```nit
<button @click={(e) => fn(e, $element)}>Click</button>
<button @click={fn($event, $element)}>Click</button>
<button @click={fn($element)}>Click</button>
```

## Değiştiriciler

Ayrıca öğeler için değiştiriciler kullanabilirsiniz: `prevent` veya `preventDefault` ve `stop` veya `stopPropagation`.

```nit
<script>
  let num = 1;
  function add() {
    num++;
  }
</script>

<p>{num}</p>
<button @click|prevent={add}>Add</button>
```

## Klavye kısayolları

Klavye olayları için: `ctrl`, `alt`, `shift`, `enter`, `tab`, `esc`, `space`, `up`, `down`, `left`, `right` ve `delete` tek başlarına veya çoklu olarak kullanılabilir.

```nit
<button @click|ctrl={add}>Add</button>
<button @click|ctrl|shift={add}>Add</button>
```
