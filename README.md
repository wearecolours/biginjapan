### What it is

biginjapan.js sets the height of an element based on the height of the browser window.


### Installation

biginjapan.js is available as an [npm package](https://www.npmjs.com/package/biginjapan).

```
npm install biginjapan --save
```

Add **biginjapan.min.js** to the bottom of the `<body>` like this:

```html
	<script src="biginjapan.min.js"></script>
</body>
```


### Usage

```html
<div data-biginjapan></div>
```


### Options

Options can be passed via data attributes. Append the option name to `data-biginjapan-`, as in `data-biginjapan-percentage=""`.

| Name       | Type     | Default | Description                                                                         |
|------------|----------|---------|-------------------------------------------------------------------------------------|
| percentage | number   | 100     | 0 - 100%                                                                            |
| exclude    | selector | false   | A valid CSS selector of an element you want biginjapan to exclude from it's height. |


### Events

| Function                | Description                  |
|-------------------------|------------------------------|
| BigInJapan.update()     | Run after DOM has changed    |
| BigInJapan.pause()      | Pauses resize event listener |


### Browser Support

Coming soon


### License

The code is available under the [MIT License](https://github.com/cferdinandi/smooth-scroll/blob/master/LICENSE.md).

