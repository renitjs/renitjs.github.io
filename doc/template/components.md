# Components

In the world of web development, one way to make complex applications more manageable and scalable is to use component-based architectures. Components are structural units that divide a web application into small, independent pieces, each defining its own functionality, appearance, and behavior.

Renit components should have a `.nit` file extension. Components are created in three different types to suit your needs.

## Common Structure of Components

A component structure consists of three main sections:

1. **Logic Section**: This section contains JavaScript code that defines the functionality of the component. User interactions, data processing, and other dynamic features are defined here.

2. **Markup Section**: This section defines the HTML structure of the component. It specifies how the user interface will look, which elements make up the component, and how these elements are arranged.

3. **Style Section**: This section contains CSS code that shapes the appearance of the component. Colors, sizes, backgrounds, and other style properties of the component are specified here.

## Types of Components

Components can be of three different types:

### 1. Standard Components

Standard components are the basic building blocks used to create a single component. Each component contains its own logic, markup, and style definitions.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<script>
  // JavaScript logic for the standard component
</script>

<!-- HTML markup for the standard component -->

<style>
  /* Style definitions for the standard component */
</style>
```

</div>

#### Example

In standard components, the component name is the file name.

<div class="file file-multi">
<div class="file-line"><span id="p1">title.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<script>
  // Define a variable called 'name'.
  export let name = "world";
</script>

<!-- Create a heading using the 'name' variable. -->
<h1>Hello {name}!</h1>

<style>
  /* Define the appearance of the <h1> element in the title component. */
  .this h1 {
    color: blue;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // Import the title component.
  import title from "./title.nit";
</script>

<!-- First title component: Uses "Hello world!" text by default. -->
<title />

<!-- Second title component: Uses "Hello Renit!" text with the 'name' parameter. -->
<title name="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// Import the app component.
import app from "./app.nit";

// Mount the app component to the specified target (document.body).
app(document.body);
```

</div>

</div>

### 2. Fragment Components

Fragment components are structures where multiple components come together on a page. Each fragment component contains its own logic, markup, and style definitions.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<element @name="">
  <!-- HTML markup for the fragment component -->

  <script>
    // JavaScript logic for the fragment component
  </script>

  <style>
    /* Style definitions for the fragment component */
  </style>
</element>
```

</div>

#### Example

In fragment components, the component name is specified through the `@name` attribute.

<div class="file file-multi">
<div class="file-line"><span id="p1">header.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<!-- Title fragment component -->
<h1 @name="title">
  Hello {name}!

  <script>
    // Define the 'name' variable for the title fragment component.
    export let name = "world";
  </script>

  <style>
    /* Define the appearance of the title fragment component targeting the <h1> element. */
    .this {
      color: blue;
    }
  </style>
</h1>

<!-- Description fragment component -->
<div @name="description">
  <p>{text}</p>
  <script>
    // Define the 'text' variable for the description fragment component.
    export let text = "renit";
  </script>
</div>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // Import the title and description components from 'header.nit'.
  import { title, description } from "./header.nit";
</script>

<!-- First title component: Uses the default 'name' variable. -->
<title />

<!-- First description component: Uses the default 'text' variable. -->
<description />

<!-- Second title component: Uses the 'name' parameter with the value "Renit". -->
<title name="Renit" />

<!-- Second description component: Uses the 'text' parameter with the value "Renit". -->
<description text="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// Import the app component.
import app from "./app.nit";

// Mount the app component to the specified target (document.body).
app(document.body);
```

</div>

</div>

### 3. Composite Components

Composite components are used to create more complex and structurally rich components. These components can contain multiple fragment components and represent more complex functionality.

<div class="file">
<div class="file-line"><span>structure.nit</span></div>

```html
<script>
  // JavaScript logic for the standard component
</script>

<!-- HTML markup for the standard component -->

<element @name="">
  <!-- HTML markup for the fragment component -->

  <script>
    // JavaScript logic for the fragment component
  </script>

  <style>
    /* Style definitions for the fragment component */
  </style>
</element>

<!-- HTML markup for the standard component -->

<style>
  /* Style definitions for the standard component */
</style>
```

</div>

#### Example

<div class="file file-multi">
<div class="file-line"><span id="p1">header.nit</span><span id="p2">app.nit</span><span id="p3">app.js</span></div>

<div class="file-page" id="p1c">

```html
<script>
  // Define variables 'name' and 'text'.
  export let name = "header";
  export let text = "renit";
</script>

<!-- Start of the standard header component -->
<div>
  <p>Start</p>
</div>

<!-- Title component -->
<h1 @name="title">
  Hello {name}!

  <script>
    // Define the 'name' variable for the fragment component.
    export let name = "world";
  </script>

  <style>
    /* Define the appearance of the title component targeting the <h1> element. */
    .this {
      color: blue;
    }
  </style>
</h1>

<!-- Description component -->
<div @name="description">
  <p>{text}</p>
  <script>
    // Define the 'text' variable for the fragment component.
    export let text = "renit";
  </script>
</div>

<!-- Pass the "name" variable from the standard component to the title fragment component -->
<title name="{name}" />

<!-- Pass the "text" variable from the standard component to the description fragment component -->
<description text="{text}" />

<!-- End of the standard header component -->
<div>
  <p>End</p>
</div>

<!-- Style definitions in the standard component do not affect fragment components -->
<style>
  /* Targeting div > p elements within the standard header component */
  .this div p {
    font-size: 12px;
  }
</style>
```

</div>

<div class="file-page" id="p2c">

```html
<script>
  // Import the header, title, and description components from 'header.nit'.
  import header, { title, description } from "./header.nit";
</script>

<!-- Call the 'header' component -->
<header />

<!-- Call the default 'title' component -->
<title />

<!-- Call the default 'description' component -->
<description />

<!-- Call the 'title' component with the 'name' parameter -->
<title name="Renit" />

<!-- Call the 'description' component with the 'text' parameter -->
<description text="Renit" />
```

</div>

<div class="file-page" id="p3c">

```js
// Import the app component.
import app from "./app.nit";

// Mount the app component to the specified target (document.body).
app(document.body);
```

</div>

</div>
