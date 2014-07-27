
var app = app || {};

$(function(){

    /*
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
    */


    // ===========
    // Ajax Setup
    // https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
    // ===========
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    // ===========
    // http://plugins.jquery.com/cookie/
    var csrftoken = $.cookie('csrftoken');
    // ===========





    new app.SnippetsView(snippets);


});