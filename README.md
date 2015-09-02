# angular-baron-scrollbar
A wrapper around [baron](https://github.com/Diokuz/baron) scrollbar library.

### Usage
1. `npm install angular-baron-scrollbar`
2. In app code:
  ```
  angular.module('app', [ require('angular-baron-scrollbar') ])
  ```
  or replace `require()` by `'angular-baron-scrollbar'` and put appropriate `<script src='.../dist/index.js'>` tag in your html.
3. Use `<baron-scrollbar>` directive in your templates:
```
<style type="text/css">
	.scroll-wrapper {
		position: relative;
		overflow: hidden;
		height: 300px;
	}
</style>

<baron-scrollbar class="scroll-wrapper" opts="..." hopts="..." direction="x | y | xy" update="update">
	... SCROLLABLE CONTENT HERE ...
</baron-scrollbar>
```

The `opts`/`hopts` attributes allow to configure vertical/horizontal scrollbar instances
(see [baron](https://github.com/Diokuz/baron) for configuration options).
For example:
```
// in controller:
$scope.scrollopts = {
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

<!-- in template -->
<baron-scrollbar opts="scrollopts">
	...
</baron-scrollbar>
```

Or you may pass an object directly within template:
```
<baron-scrollbar opts="{minScrollBarLength: 20}">
	...
</baron-scrollbar>
```

The `update` attribute may point to a variable from $scope. Setting this variable to
`true` forces scrollbar update. The variable is set to `false` automatically afterwards.

### Example
A working example can be found in the `example` directory. Just open `index.html` in browser.

### Notes
* This is a UMD module, so it can be used in a stript tag and as a CommonJS/RequireJS module.
* The CSS is prepended to `<head>` automatically (so that you can override it if you want;
  see `example/index.html` for example).

### License
MIT
