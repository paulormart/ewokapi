
var app = app || {};

$(function(){

    var snippets = [
        {
            "url": "http://localhost:8000/api/snippets/1/",
            "highlight": "http://localhost:8000/api/snippets/1/highlight/",
            "owner": "dev",
            "title": "Hello World",
            "code": "def hello(self):\r\n    return 'hello world'\r\n",
            "linenos": true,
            "language": "python",
            "style": "autumn"
        },
        {
            "url": "http://localhost:8000/api/snippets/2/",
            "highlight": "http://localhost:8000/api/snippets/2/highlight/",
            "owner": "dev",
            "title": "Again - Well Done",
            "code": "def again(self):\r\n     return again()",
            "linenos": true,
            "language": "python",
            "style": "bw"
        }

    ];

    console.log(snippets)

    new app.SnippetsView(snippets);


});