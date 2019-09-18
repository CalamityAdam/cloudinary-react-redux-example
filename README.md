## An example of using Cloudinary API to store image files from your frontend

to use:

`npm install`

IF `json-server` not already installed: `npm install -g json-server`

`json-server --watch db.json`

`npm start`


navigate to `localhost:1337` in your browser, chose a file and click upload
:)

### pro-tip
the image that (should) appear when you first run this app is a screenshot of a response from a succesful POST to cloudinary. note that `secure_url` is the direct URL to the image, and the URL that you will use for your `src=` on the `img` element.
IF you have any eager transformations, they will be in a separate key. i.e.: `data.eager[0].secure_url`
