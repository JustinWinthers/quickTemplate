## quickTemplate.js - A light micro templating engine for your NodeJS applications using Angular Notation.

[quickTemplate.js](https://github.com/JustinWinthers/quickTemplate) is a A quick Node.js
template compiler whereby you can easily use Angular.JS notation or simply specify the type
of notation you prefer to use.

## Notes about this verion 2.+

If you are using earlier versions of quickTemplate, this is a BREAKING change so don't upgrade until you've
read the documentation below.  Major changes include getting rid of callbacks all together.  A promise
is NOT returned since this is primarily non IO code with the exception of reading a file with your template
(for which quickTemplate now reads synchronously).  Additionally, the default tokens for variable replacement
in your template are now the ES6 tokens ${foo}.

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
token delimeters for finding a variable to replace are ES6 tokens ${ and } for easy
transition to ES6 templates.  The object property names must match the variable
names in the template.  The object
can be an infinite number of levels deep.


```js
 var quickTemplate = require('quickTemplate');
 var json = require('some_file_with_json_in_it.json');  //this can be a json file or any object literal

 var html = quickTemplate(json, __dirname + '/partial.html');
```

## Sending in an html string instead of file

You can send in an html string as well instead of a path to a file.
 If so, you must send in the options parm with 'string' set to true.
 Additionally, you can override the tokens used for variable replacement
 as part of the options object as well by substituting your preferred values
 for the tokenLeft and tokenRight properties.

```js
 var html = quickTemplate(json, "<p> ${foo}  <span> ${bar} </span></p>", {string:true});

```

in the above example the json object would look like:

```
 {"foo":"some value","bar":"some other value"}
```

## Customize your token delimeters to use Angular or Handlebars style

Using the example above, you can use any delimiter you choose in your document.  quickTemplate defaults to
ES6 delimiters, but you can use the tokenLeft and tokenRight options to customize the tokens used as
in this example....

```js
 var html = quickTemplate(json, "<p><% foo  %>  <span> <% bar %> </span></p>", {string:true, tokenLeft:'<%', tokenRight:'%>'});

```

or if you want to use some Angular views you have laying around...
```js
 var html = quickTemplate(json, "<p>{{foo}}  <span> {{bar}} </span></p>", {string:true, tokenLeft:'<%', tokenRight:'%>'});

```

in the above examples the json object would still look exactly the same:

```
 {"foo":"some value","bar":"some other value"}
```


## Authors

**Justin Winthers**

+ https://github.com/JustinWinthers


## License

Copyright 2014 Digital Advisors, LLC

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0