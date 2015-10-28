/*

 Written by Justin Winthers

 "A quick Node.js template compiler using Angular.JS notation"

 Most common example of how to use this tool follows.  Send in a
 an object literal and path to an html template.  The default
 tokens for finding a variable to replace are {{ and }}.  The object
 property names must match the variable names in the template.  The object
 can be an infinite number of levels deep.

 Example program:

 var quickTemplate = require('quickTemplate');
 var json = require('somefile_with_json_in_it.json');  //this can be a json file or any object literal

 quickTemplate(json, __dirname + '/partial.html', function(err, data){
 console.log (data);
 });

 You can send in an html string as well instead of a path to a file.
 If so, you must send in the options parm with 'string' set to true.
 Additionally, you can override the tokens used for variable replacement
 as part of the options object as well by substituting your preferred values
 for the tokenLeft and tokenRight properties.

 var data = quickTemplate(json, "<p><% foo  %>  <span> <% bar %> </span></p>", {string:true, tokenLeft:'<%', tokenRight:'%>'});

 in the above example the json object would look like:

 {"foo":"some value","bar":"some other value"}

 */


module.exports = function (scope, path, options){

    var fs = require('fs'), tokenLeft = '\\${', tokenRight = '}', counter, html;

    if (options){
        tokenLeft = options.tokenLeft || tokenLeft;
        tokenRight = options.tokenRight || tokenRight;
    }

    if (typeof scope !== 'object') { return 'Quicktemplate object parameter is not an object'; }

    if (options && options.string) formatHTML(path);
    else {
        getHTMLFile();
    }

    return html;

    function getHTMLFile(){
        var data = fs.readFileSync (path, 'utf8');
        formatHTML(data)
    }

    function formatHTML(data){

        html = data;
        html = (function removeAngularFilters(){
            html = html.replace(new RegExp("\\|.*"+tokenRight),function(str){
                return str.substr(str.indexOf(tokenRight));
            });
            if (html.match(new RegExp("\\|.*"+tokenRight))) removeAngularFilters();
            return html;
        })().replace(new RegExp(tokenLeft+"\\s+", "g"),tokenLeft)
            .replace(new RegExp("\\s+"+tokenRight, "g"),tokenRight);

        parser(scope);

    }

    function parser(obj, depth, parents){
        if (parents===undefined && depth===undefined){parents=[]; depth=0; counter=0}

        for (keys in obj){
            if (obj.hasOwnProperty(keys) && typeof obj[keys]) {
                if ( (typeof obj[keys]==='object') && !(obj[keys] instanceof Array) ){
                    parents[depth]=keys;
                    parser(obj[keys], depth+1, parents);
                } else {
                    var name =  depth ? (depth?parents.join('.'):'') + '.' + keys : keys;
                    var re = new RegExp(tokenLeft+name+tokenRight, 'g');
                    html = html.replace(re, obj[keys]);
                }
                parents.splice(depth, Object.keys(obj).length - depth);
                if (depth===0 ) counter += 1;
            }}}
};