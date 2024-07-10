# Style Definitions Section

This section contains the main CSS code for the component.

```nit
<style>
  /* CSS */
</style>
```

The `style` element does not need to be at the bottom of the page; it simply needs to be the last `style` element encountered to contain the main style definitions.

#### Example

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

In summary, the placement of the `style` element containing the main style definitions does not matter. It just needs to be the last `style` element encountered while moving from top to bottom.

> When a second `style` tag is used, it only affects the section where it is used.

#### Example

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

## Nested Style Definitions

Renit components natively support nested CSS code without the need for any additional plugins.

#### Example

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

## Here's `this`

CSS codes added to components are global, just like in HTML. Thus, they affect subsequent components.

> In the example below, the color of all `div` elements turns blue.

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

If you want to make style definitions specific to a component, you use `this`.

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

#### `this` represents the topmost element it can find in the component.

In the example below, since the topmost element is `p`, `.this` targets the `p` element.

```nit
<p>Hi!</p>

<style>
  .this {
    color: blue;
  }
</style>
```

In the example below, since the topmost element is `div`, `.this` targets the `div` element.

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

If there is no topmost element as in the example below;

```nit
<p>Hi!</p>
<p>Hi!</p>

<style>
  .this p {
    color: blue;
  }
</style>
```

Again, in the same way, `.this` targets an invisible `div` element. The HTML output for the example above would be as follows:

```nit
<div>
  <p>Hi!</p>
  <p>Hi!</p>
</div>
```

### What does `this` do?

You can create a new style identifier simply using `.this` or `#this` without needing to come up with a specific style name.

#### Example

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

## ID and class names

All ID and class names are renamed specifically for each component.

#### Example

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

When styles are renamed, they are kept short for data efficiency.

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

## Global styles

Sometimes we may need to use a style name globally; in such cases, we use `:global()` or `:g()`. Global CSS names are also renamed for data efficiency in the same manner.

#### Example

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

## Static styles

Sometimes we may want to ensure that a style name is not scoped; in such cases, we use `:s()` or `:static()`. Static CSS names are not renamed.

#### Example

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

## Dynamic styles

When we want to specify style names dynamically, we encounter an issue. The following example shouldn't normally work, but Renit checks all string expressions and corrects style names where necessary.

#### Example

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

Renit checks the constant `name` mentioned above. If a style definition is specified as a string, it replaces it with the renamed style name for `.title`.

```js
const name = "a";
```

In this context, things can get complicated. When creating style names, ensure they are used only in contexts related to styling within the logic section.
