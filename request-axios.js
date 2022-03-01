const axios = require('axios');
const fs = require('fs');
const path = require('path');

// axios
//   .get('http://www.google.com')
//   .then((response) => {
//     // console.log(response);
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

axios({
  url: 'http://www.google.com',
  method: 'GET',
  responseType: 'stream',
  // transformRequest: (data, headers) => {},
  // transformResponse: (data) => {},
})
  .then((response) => {
    response.data.pipe(
      fs.createWriteStream(path.join(__dirname, './uploads/google.html'))
    );
  })
  .catch((err) => console.error(err));
