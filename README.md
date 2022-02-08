# JustWatchIt
A lightweight app made using EJS to watch movies using an external API. Any external movie streaming API can be used which sends an iframe for the respective movie. After that using the built in system, you can send a request to the app at `<your_url>/movie` to add your movie using the link, your decided password and the movie name. This was just a method of me learning EJS, there are much better alternatives.

## Adding a movie
Send a request:

`<BASE_URL>/movie?name=<NAME>&link=<LINK>&pass=<PASSWD>`

I opted for such a system just so I can add movies programmatically using an easy script in basically any language

## Setup

Environment Variables:

__.env (Example)__

```
passwd=Platypus
baseurl=platypus.com
```

Install dependencies:

`npm install package.json`

Start the app:

`node .`
