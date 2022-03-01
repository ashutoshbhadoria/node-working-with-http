const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Concurrent requests.
axios
  .all([
    axios.get('https://localhost/metadata?id=1'),
    axios.get('https://localhost/metadata?id=2'),
    axios.get('https://localhost/metadata?id=3'),
  ])
  .then((responseArray) => {
    console.log(responseArray[0].data.description);
    console.log(responseArray[1].data.description);
    console.log(responseArray[2].data.description);
  });
