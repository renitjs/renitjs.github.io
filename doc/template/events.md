# Events

To listen for an event, you can use the `@` attribute. The event name should follow the `@` symbol. For example, `@click`, `@keyup`, etc. You can review the event names at <a href="https://www.w3schools.com/jsref/dom_obj_event.asp" target="_blank">this link</a>.

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

If your function name is the same as the event name, you can use just the `@` expression.

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

You can also use it as a lambda function.

```nit
<script>
  let num = 1;
</script>

<p>{num}</p>
<button @click={num++}>Add</button>
<button @click={() => num++}>Add</button>
<button @click="num++">Add</button>
```

## Function properties

To pass properties to a function, both methods below achieve the same result.

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

## Event reference

There are two different methods to access an event reference: using a lambda function and using the `$event` property.

```nit
<button @click={(e) => fn(e)}>Click</button>
<button @click={fn($event)}>Click</button>
```

## Element reference

To obtain a reference to the current element, you can use the `$element` property.

```nit
<button @click={(e) => fn(e, $element)}>Click</button>
<button @click={fn($event, $element)}>Click</button>
<button @click={fn($element)}>Click</button>
```

## Modifiers

Additionally, you can use modifiers for events: `prevent` or `preventDefault`, and `stop` or `stopPropagation`.

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

## Keyboard shortcuts

For keyboard events: `ctrl`, `alt`, `shift`, `enter`, `tab`, `esc`, `space`, `up`, `down`, `left`, `right`, and `delete` can be used individually or in combination.

```nit
<button @click|ctrl={add}>Add</button>
<button @click|ctrl|shift={add}>Add</button>
```
