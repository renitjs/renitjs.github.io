# Bindings

We use bindings to facilitate communication between JavaScript expressions and HTML elements.

## One-way binding

In the view section, you can bind a JavaScript expression to the content of an HTML element or to the element's attribute in a one-way manner.

```nit
<script>
  const name = "hello";
</script>

<p class={name}>{name}</p>
<p class="mt-1 {name}">{name}</p>
```

If the name of the JavaScript expression is the same as the element's attribute name, you can bind it using just the expression.

```nit
<script>
  const value = "Hello World!";
</script>

<input type="text" {value} />
```

## Two-way binding

To update a JavaScript expression when making a change in the view section, you should prefix the attribute with `:`.

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
