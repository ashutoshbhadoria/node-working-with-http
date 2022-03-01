# node-working-with-http

## Server
1. Implements basic routes using `http` module and not `express`.
2. The headers/method etc. are avaialble immidiately but the body is received via a stream.
3. Use `body` npm package to simplify working with response body.
4. Use `serHeader` and `response.writeHead` to write headers.
5. While working with https just change the module to `https`.
6. Generate self-signed certificates using the following command. 
```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -subj "/"
```

## File Uploads

1. Set the folowing form attributes on client.
   1. `action="/upload"`
   2. `method="POST"`
   3. `enctype="multipart/form-data"`
2. On the server use the `formidable` package, this can work with callbacks as well as events.
   
## Making External API requests
1. Set appropriate parameters in the request options.
2. Use the `axios` package for `promise` support, ability to transform request/response, and concurrent requests.