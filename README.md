## Heroku demo

https://react-demo-gfoo.herokuapp.com

Users :

- `admin@nowhere.org / admin`
- `demo@nowhere.org / demo`

(possibly wait a while if service is stopped...)

## Local dev

Create a `.env.development.local` file contaning dev configurations (required backend [here](https://github.com/gfoo/fastapi-demo)) :

```
REACT_APP_API_URL="http://localhost:8000"
```

Install dependencies and launch:

```shell
$ npm install
$ npm start
```
