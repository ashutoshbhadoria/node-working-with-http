const https = require('https');

// const request = http.request({ hostname: 'www.google.com' }, (res) => {
//   console.log(res.headers);

//   res.on('data', (chunk) => {
//     console.log('This is a chunk\r\n');
//     console.log(chunk.toString());
//   });
// });

const request = https.get('https://www.google.com', (res) => {
  console.log(res.headers);

  res.on('data', (chunk) => {
    console.log('This is a chunk\r\n');
    console.log(chunk.toString());
  });
});

request.on('error', (err) => {
  console.error(err);
});

// NOT needed with http.get
// request.end();
