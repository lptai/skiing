const storeFoundRoute = {}; // using for storing found route which is longest
let longest = [];

/**
 *
 *
 * @param {Array} arr
 * @returns the longest route
 */
function findLongestRoute(arr) {
  for (i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (j = 0; j < row.length; j++) {
      findLongestElevation(arr, row[j], i, j);
    }
  }

  return longest;
}

/**
 *
 *
 * @param {Array} arr areas data
 * @param {Number} i longtitude of area
 * @param {Number} j latitude of area
 */
function findLongestElevation(arr, currentElevation, i, j) {
  let southRoute = [],
    northRoute = [],
    eastRoute = [],
    westRoute = [];

  const length = arr.length;

  // If already found > we don't re-calculate it.
  const foundRoute = storeFoundRoute[[i, j].join('-')];
  if (foundRoute) {
    return foundRoute;
  }

  // Find all possible routes
  const south = i + 1;
  if (0 <= south && south < length && currentElevation > arr[south][j]) {
    southRoute = findLongestElevation(arr, arr[south][j], south, j);
  }

  const north = i - 1;
  if (0 <= north && north < length && currentElevation > arr[north][j]) {
    northRoute = findLongestElevation(arr, arr[north][j], north, j);
  }

  const east = j + 1;
  if (0 <= east && east < length && currentElevation > arr[i][east]) {
    eastRoute = findLongestElevation(arr, arr[i][east], i, east);
  }

  const west = j - 1;
  if (0 <= west && west < length && currentElevation > arr[i][west]) {
    westRoute = findLongestElevation(arr, arr[i][west], i, west);
  }

  // Find the best of south, north, east, and west
  let longestRoute =
    [northRoute, eastRoute, westRoute].reduce(
      (acc, r) => (r.length > 0 && compareRoute(r, acc) ? r : acc),
      southRoute,
    ) || [];

  // enhance longest route with current area
  longestRoute = [currentElevation, ...longestRoute];

  // Store into a map for re-using
  storeFoundRoute[[i, j].join('-')] = longestRoute;

  // compare with current longest route
  longest = compareRoute(longest, longestRoute) ? longest : longestRoute;

  return longestRoute;
}

const getSteps = route => Math.abs(route[route.length - 1] - route[0]);

/**
  Identify whether route1 is better than route2 or not
  Return true or false
 */
const compareRoute = (route1, route2) =>
  route1.length > route2.length ||
  (route1.length === route2.length &&
    (getSteps(route1) > getSteps(route2) ||
      // Prefer getting lower step so that in the end we have the route with stepest
      (getSteps(route1) === getSteps(route2) && route1[0] < route2[0])));

module.exports.findLongestRoute = findLongestRoute;
