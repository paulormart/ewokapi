

define([
    'jquery',
    '$cookie',
    'underscore',
    'backbone',
    'views/snippets'

    ],
    function($, $cookie, _, Backbone, SnippetsView) {

        'use strict';

        var snippets = [
            {"id": 3, "url": "http://localhost:8000/api/snippets/3/", "highlight": "http://localhost:8000/api/snippets/3/highlight/", "owner": "social", "title": "okidoki", "code": "def okidoki(self):\r\n    return 4", "linenos": false, "language": "python", "style": "manni"},
            {"id": 5, "url": "http://localhost:8000/api/snippets/5/", "highlight": "http://localhost:8000/api/snippets/5/highlight/", "owner": "dev", "title": "ddddd", "code": "dddd", "linenos": false, "language": "python", "style": "manni"},
            {"id": 6, "url": "http://localhost:8000/api/snippets/6/", "highlight": "http://localhost:8000/api/snippets/6/highlight/", "owner": "dev", "title": "Teste Class", "code": "dede", "linenos": false, "language": "python", "style": "manni"},
            {"id": 7, "url": "http://localhost:8000/api/snippets/7/", "highlight": "http://localhost:8000/api/snippets/7/highlight/", "owner": "dev", "title": "ttt", "code": "ddd", "linenos": false, "language": "python", "style": "manni"}]

        return SnippetsView(snippets);

    });