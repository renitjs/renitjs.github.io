# Expressions

In the markup section, you can connect JavaScript expressions to the HTML template using curly braces.

```nit
<script>
  const name = "Hi";
</script>

<div>{name}</div>
```

## Expression content

The content of an expression is supported in a manner similar to JavaScript syntax usage.

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

### Static expressions

To skip change detection and indicate that an expression is static, we prefix curly braces with an equals sign (`=`). This informs us that the `name` expression won't be added to any functions and won't be subject to change detection, providing a performance boost.

```nit
<script>
  const name = "Hello World!";
</script>

<div>{=name}</div>
```

The following component achieves the same result as the above component, but the above component runs faster.

```nit
<script>
  const name = "Hello World!";
</script>

<div>{name}</div>
```

### HTML expressions

When we want to add HTML to a component's content, we use the `@html` expression.

```nit
<script>
  const tag = "<p>Hello World!</p>";
</script>

<div>{@html tag}</div>
```
