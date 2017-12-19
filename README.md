# building Docker
```sh
docker build -t stefans-api .
```

# running Docker
```sh
docker run -p 8080:8080 stefans-api
```

# api
On [localhost:8080](http://localhost:8080). An `X-Api-Key` header with the value 'STEFAN' must be set on all requests.
