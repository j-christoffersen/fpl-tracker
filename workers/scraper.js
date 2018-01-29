const axios = require('axios');

axios.get('https://fantasy.premierleague.com/drf/elements/')
  .then((res) => {
    const players = JSON.parse(res);
    
  });
