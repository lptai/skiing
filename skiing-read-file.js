const fs = require('fs');
const algorithm = require('./RouteAlgorithm');

fs.readFile('map.txt', 'utf8', (error, data) => {
  if (error) {
    throw error;
  }

  // get number of rows
  let areaData = data.split('\n').map(element => element.split(' ').map(area => Number(area)));

  const startTime = new Date();
  const longestRoute = algorithm.findLongestRoute(areaData);

  console.log("LONGEST ROUTE's LENGTH IS", longestRoute.length, 'ROUTE: ', longestRoute.join('-'));
  console.log(`Time consuming, ${(new Date() - startTime) / 1000}s`);

  console.log(
    "Let's sent an email to: ",
    [longestRoute[0], longestRoute.length, '@redmart.com'].join(''),
  );
});
