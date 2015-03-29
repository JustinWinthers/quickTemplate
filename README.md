## quickTemplate.js - A light micro templating engine for your NodeJS applications using Angular Notation.

[quickTemplate.js](https://github.com/JustinWinthers/quickTemplate) is a A quick Node.js
template compiler whereby you can easily use Angular.JS notation or simply specify the type
of notation you prefer to use.

## The low down

QuickTemplate.js is for simple templates.  Currently it will not handle array values in a JavaScript
object literal or JSON object.  It's very fast and lean at only 939 bytes (less than 1K!).  The reason
is that is parses the object first and then applies it's values to the template.  This is not ideal
for a fully baked templating system that typically converts the html to javascript first.  This has
obvious limitations, but the point of this library is to be quick and lean for cases that don't require
dynamic dom generation via for loops.

## How to install

It's simple:


```
npm install quicktemplate
```

### How do I use it?
The most common example of how to use this tool follows.  Send in a
an object literal and path to an html template.  The default
tokens for finding a variable to replace are {{ and }}.  The object
property names must match the variable names in the template.  The object
can be an infinite number of levels deep.


```js
 var quickTemplate = require('./quickTemplate');
 var json = require('./scope.json');  //this can be a json file or any object literal

 quickTemplate(json, __dirname + '/partial.html', function(err, data){
 console.log (data);
 });
```

## Sending in an html string instead of file

You can send in an html string as well instead of a path to a file.
 If so, you must send in the options parm with 'string' set to true.
 Additionally, you can override the tokens used for variable replacement
 as part of the options object as well by substituting your preferred values
 for the tokenLeft and tokenRight properties.

```js
 quickTemplate(json, "<p>{{ foo  }}  <span> {{ bar }} </span></p>", {string:true}, function(err, data){
 console.log (data);
 });

```

in the above example the json object would look like:

```
 {"foo":"some value","bar":"some other value"}
```

## Customize your template tokens

Using the example above, you can use any delimiter you choose in your document.  quickTemplate defaults to
double mustaches, but you can use the tokenLeft and tokenRight options to customize the tokens used as
in this example....

```js
 quickTemplate(json, "<p><% foo  %>  <span> <% bar %> </span></p>", {string:true, tokenLeft:'<%', tokenRight:'%>'}, function(err, data){
 console.log (data);
 });

```

in the above example the json object would still look exactly the same:

```
 {"foo":"some value","bar":"some other value"}
```


## Authors

**Justin Winthers**

+ https://github.com/JustinWinthers


## License

Copyright 2014 Digital Advisors, LLC

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0