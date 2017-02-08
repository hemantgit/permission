# Launchpad Mocking
The purpose of this library is to provide JS mocking of portal for standalone development.

## Portal Mocking
### `mock.Portal`
Mocks window.b$.portal

```javascript
window.b$ = {
    portal: mock.Portal() // Returns object.
};
```
### `mock.Bd`
Mocks window.bd

```javascript
window.bd = mock.Bd({}); // Returns object.
```
### `mock.Widget`
Mocks **WIDGET**, and reads preferences from model.xml.

```javascript
mock.Widget().then(function(__WIDGET__){
    // init app
    MyApplication(__WIDGET__)
})
```
```javascript
mock.Widget({ // Returns Promise.
    model: './model.xml',
    body: document.body
}).then(function(__WIDGET__) { ... });
```
## Gadgets Mocking
```javascript
window.gadgets = mock.gadgets;
```
## Full Example Usage
```javascript

window.b$ = { portal: mock.Portal() };
window.bd = mock.Bd();
window.gadgets = mock.gadgets;

var mockConfig = {
    model: './model.xml',
    body: document.body,
    preferences: {
        // Override preferences from model.xml
        'customEndpoint': '/api/v1/my/endpoint'
    }
};

mock.Widget(mockConfig).then(function(widget) {

    myWidgetApp(widget).boostrap()
});
```
### AMD example
```javascript
require(['base', 'mock'], function(base, mock) {
    window.b$ = { portal: mock.Portal() };
    window.bd = mock.Bd();
    window.gadgets = mock.gadgets;

    var mockConfig = {
        model: './model.xml',
        body: document.body,
        preferences: {
            // Override preferences from model.xml
            'customEndpoint': '/api/v1/my/endpoint'
        }
    };

    mock.Widget(mockConfig).then(function(__WIDGET__) {
        // bootstrap widget.
        base.requireWidget(__WIDGET__, 'scripts/main');        
    });
});
```
## Building
To develop this library, first edit the bower.json and change the `main` to point
to the non-dist script. Then you can run `bblp start` and `bblp test -w`.

