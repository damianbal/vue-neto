# vue-neto

Make async http requests inside Vue components, you can use await as well :)

## Features
* Send GET, POST, PUT, PATCH, DELETE asynchronous requests (you can use await)
* Authorization token automatically sent if it exists in localStorage
* You can use try and catch

## Getting Started

```js
methods: {
    async loadArticles: () => {
        this.articles = await this.$neto.getObject('api/articles')
        console.log(this.articles) // articles fetched 
    }
}
```

#### Methods
```js
$neto.get(url) // get request, access data by accessing 'data' property of result
$neto.getObject(url) // returns data of response
$neto.getObjectByIndex(url, index) // returns data of response by index (id or key)
$neto.post(url, data) // post request 
$neto.patch(url, data) // patch request
$neto.put(url, data) // put request
$neto.delete(url) // delete request
```

### Installing

```sh
npm i vue-neto
```

```js
Vue.use(VueNeto. {
    baseURL: "http://your-app.com/", 
    token: true, // optional (default: true), token should be sent or updated?
    tokenPrefix: "Bearer", // optional (default: "Bearer"),
    tokenName: "token", // optional (name of token in localStorage, default: "token")
})
```

### Made with
* [axios](https://github.com/axios/axios)

