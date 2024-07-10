# Logic Section

This section contains the main JavaScript code for the component.

```nit
<script>
  // JavaScript
</script>
```

The `script` element does not need to be at the top of the page; it simply needs to be the first `script` element encountered to contain the main logic code.

#### Example

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

In summary, the placement of the `script` element containing the main logic code does not matter. It just needs to be the first `script` element encountered while moving from top to bottom.

> However, this rule changes when a second `script` element is used.

Similarly, the first `script` element encountered contains the main logic code. Specifically, in the case of a second usage, the `script` element cannot be used at the end in fragment components.

#### Example

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

Other `script` elements, apart from the first `script` element used, allow you to insert any JavaScript code you want.
