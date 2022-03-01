const https = require('https');

const data = JSON.stringify({
  userName: 'Ashutosh',
});

const requestOptions = {
  hostname: 'localhost',
  port: 443,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    Authorization: Buffer.from(`myUserName:myPassword`).toString('base64'),
  },
};

const request = https.request(requestOptions, (res) => {
  console.log(res.headers);

  res.on('data', (chunk) => {
    console.log('This is a chunk\r\n');
    console.log(chunk.toString());
  });
});

request.on('error', (err) => {
  console.error(err);
});

request.end();
