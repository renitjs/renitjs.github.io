# Event Listeners

A small and customizable event listener.

## Import

```js
import { on, emit } from "renit/event";
```

## Global Listeners

### Defining a Listener

You can define a listener function to be executed when your custom event is triggered using the `on` function. This function allows you to add one or more listeners for a specific event.

```js
on("tick", (number) => {
  console.log(number);
});

emit("tick", 1);
//=> 1

emit("tick", 5);
//=> 5
```

### Removing a Listener

The `on` function returns an `unbind` function that can be used to remove a specific listener when needed.

```js
const tickOff = on("tick", (number) => {
  console.log(number);
});

emit("tick", 1);
//=> 1

// Remove the listener.
tickOff();

emit("tick", 5);
//=> The tick listener is not triggered.
//=> Nothing is logged.
```

### Triggering a Listener

To trigger a specific event and execute its associated listeners, use the `emit` function. The first argument is the event name, and the other arguments are the data to be passed to the listener.

```js
on("tick", (a, b) => {
  console.log(a, b);
});

emit("tick", 1, "one");
//=> 1, one
```

### Listening Once

If you want an event to be listened to only once, use the `once` function. This function defines a listener that will execute only the first time the event is triggered.

```js
once("tick", (a, b) => {
  console.log(a, b);
});

emit("tick", 1, "one");
//=> 1, one

emit("tick", 1, "one");
//=> The tick listener is not triggered.
//=> Nothing is logged.
```

## Custom Listeners

You can create a new event listener using the `event` function. This function returns an event bus that can be used to listen for and trigger events.

```js
const bus = event();

bus.on("tick", (number) => {
  console.log(number);
});

bus.emit("tick", 1);
//=> 1
```

In this example, the `bus` object is a custom event bus with its own listeners and emitters, independent of the global event listeners.
