VENV

.$source ~/.virtualenv/ewokapi/bin/activate


API
url                 HTTP Method  Operation
/api/snippets       GET          Get an array of all snippets
/api/snippets/:id   GET          Get the snippet with id of :id
/api/snippets       POST         Add a new snippet and return the snippet with an id attribute added
/api/snippets/:id   PUT          Update the snippet with id of :id
/api/snippets/:id   DELETE       Delete the snippet with id of :id

