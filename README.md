MAIN: [![Build Status](https://travis-ci.org/jlopinto/ned.svg?branch=main)](https://travis-ci.org/github/jlopinto/ned)
DEV: [![Build Status](https://travis-ci.org/jlopinto/ned.svg?branch=dev)](https://travis-ci.org/github/jlopinto/ned/dev)

# Namespaced event delegation
<!--{h1:.massive-header.-with-tagline}-->
> Hail ot jquery


Ned handle non delegated event aswel !
## Table of Contents

* [What is it](#what-is-it)
* [Usage](#usage)
* [documentation](#documentation)
* [About event delegation](#about-event-delegation)

# Whats is it
Namespaced event delegation, Ned, extend the HTMLElement prototype and provide new `on`, `once` and `off` methods on any element.
As it provide namespaces, event management become dead easy.

Ned API is indeed heavily inspired by jquery API, but is vanilla and dependences free !
# Usage

## example base markup
``` html
<html>
    <body>
        <button class="btn js-btn--nav"></button>
    </body>
<html>
```

## On
``` js
document.body.on('click.openNav', '.js-btn--nav', function(event) {
    console.log(this, event);
    /**
     * this: is the current .js-btn--nav element
     * event: {
     *  "eventNamespace": "click.openNav",
     *  "delegatedTarget": document.body,
     *  "originalEvent": { click {...} }
     * }
     * */
});
```

## Once
``` js
document.body.on('click.openNav', '.js-btn--nav', function(event) {
    console.log(this, event);
});
```

## off
``` js
document.body.off('click.openNav')
```

## Handling non-delegated events

### On
``` js
document.querySelectorAll('.js-btn--nav')[0].on('click.openNav', function(event) {
    console.log(this, event);
    /**
    * `this` is the current `.js-btn--nav` element
    * `event`: {
    *   "eventNamespace": the event name string, 
    *   "delegatedTarget": the DOM element on which `on` is called,
    *   "originalEvent": the orginal Event on `delegatedTarget`
    * }
    **/
});
```

### Once
``` js
document.querySelectorAll('.js-btn--nav')[0].once('click.openNav', function(event) {
    console.log(this, event);
});
```

### off
``` js
document.querySelectorAll('.js-btn--nav')[0].off('click.openNav')
```

# Documentation

## element.on(eventName [, selector][, handler])
- `eventName` (type: `<string>`): One event types and optionnal namespaces, such as `"click"` or `"click.myNamespace"`
- `selector` (type: `<string>`): A selector string to filter the descendants of the selected elements that trigger the event.
- `handler` (type: `Function(Event)`): A function to execute when the event is triggered

## element.once(eventName [, selector][, handler])
- `eventName` (type: `<string>`): One event types and optionnal namespaces, such as `"click"` or `"click.myNamespace"`
- `selector` (type: `<string>`): A selector string to filter the descendants of the selected elements that trigger the event.
- `handler`: A function to execute when the event is triggered

## element.off(eventName)
- `eventName` (type: `<string>`): One event types and optionnal namespaces, such as 

## IE 11 support
IE11 require this polyfill (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
``` js
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
```
## About event delegation
TODO