const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');
const jsonBody = require('body/json');
const formidable = require('formidable');
const services = require('./services');

const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem')),
});

server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  req.on('error', (err) => {
    console.error(err);
  });

  res.on('error', (err) => {
    console.error(err);
  });

  if (req.method === 'GET' && parsedUrl.pathname === '/metadata') {
    const { id } = parsedUrl.query;
    const metadata = services.fetchImageMetadata(id);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'nodeJS');
    res.write(JSON.stringify(metadata));
    res.end();
  } else if (req.method === 'POST' && parsedUrl.pathname === '/users') {
    // WORKING WITH BODY AS A STREAM NATIVELY.
    // const data = [];
    // req
    //   .on('data', (chunk) => {
    //     data.push(chunk);
    //   })
    //   .on('end', () => {
    //     const userData = JSON.parse(Buffer.concat(data));
    //     services.createUser(userData.userName);
    //   });
    jsonBody(req, (err, body) => {
      if (err) {
        console.error(err);
      } else {
        services.createUser(body.userName);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Powered-By', 'nodeJS');
        res.write(JSON.stringify(body));
        res.end();
      }
    });
  } else if (req.method === 'POST' && parsedUrl.pathname === '/upload') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, './uploads'),
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
      multiples: true,
      encoding: 'utf-8',
      maxFields: 20,
    });
    // HANDLING VIA CALLBACK INSTEAD OF EVENTS
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('fields\r\n', fields);
    //     console.log('files\r\n', files);
    //     res.statusCode = 200;
    //     res.write('Success!');
    //     res.end();
    //   }
    // });
    form
      .parse(req)
      .on('fileBegin', (name, file) => {
        console.log('Our upload has started');
      })
      .on('file', (name, file) => {
        console.log('Both files and fields recieved');
      })
      .on('field', (name, value) => {
        console.log('Fields received');
        console.log(name, value);
      })
      .on('progress', (bytesReceived, bytesExpected) => {
        console.log(`${bytesReceived}/${bytesExpected}`);
      })
      .on('error', (err) => {
        console.error(err);
        req.resume();
      })
      .on('abort', () => {
        // this falls through to the error event.
        console.log('Request aborted by user');
      })
      .on('end', () => {
        console.log('Done! Request received');
        res.end();
      });
  } else {
    fs.createReadStream(path.join(__dirname, './index.html')).pipe(res);
  }
});

server.listen(443, () => {
  console.log(`The server is listening on port 443`);
});
