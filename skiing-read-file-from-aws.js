const fetch = require('node-fetch');
const algorithm = require('./RouteAlgorithm');

const url = 'http://s3-ap-southeast-1.amazonaws.com/geeks.redmart.com/coding-problems/map.txt';

console.log('Start getting data from aws.....');
fetch(url)
  .then(data => data.text())
  .then(data => {
    console.log('Getting data is done... Start calculating.....');
    // get number of rows
    let areaData = data.split('\n').map(element => element.split(' ').map(area => Number(area)));

    const startTime = new Date();
    const longestRoute = algorithm.findLongestRoute(areaData);

    console.log(
      'LONGEST ROUTE HAVE LENGTH',
      longestRoute.length,
      'ROUTE: ',
      longestRoute.join('-'),
    );
    console.log(`Time consuming, ${(new Date() - startTime) / 1000}s`);

    console.log(
      "Let's sent an email to: ",
      [longestRoute[0], longestRoute.length, '@redmart.com'].join(''),
    );
  })
  .catch(error => console.log(error));
