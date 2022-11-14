var satellite = require('satellite.js');
var math = require("mathjs")
//import gsSearching from "./gsSearching";
const geolib = require('geolib');
const fetch = require('node-fetch');
const clientId = "7lt20kki6n7q458euonhpgfd4e"
const clientSecret = "4iq8jsp2j0bb7ag4acugstcqirmk39arvv4ck0qij5r81eas0nc"

const gsSearching = (long, lat, positionEcf) => {
  var observerGd = {
    longitude: satellite.degreesToRadians(long),
    latitude: satellite.degreesToRadians(lat),
    height: 0.370
  };
  var lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf)
  return satellite.radiansToDegrees(lookAngles.elevation)
}

let cachedAccessToken;
async function getAccessToken(clientId, clientSecret) {
  if (cachedAccessToken && isTokenStillValid(cachedAccessToken)) {
    console.log("returning token from cache")
    return cachedAccessToken;
  }
  console.log("there is no token in cache or it has expired, getting a new one.")
  const response = await fetch('https://hkickers-demo.auth.eu-central-1.amazoncognito.com/oauth2/token?scope=https://api.leanspace.io/READ&grant_type=client_credentials',
    {
      method: 'POST',
      headers: {
        "Authorization": 'Basic ' + Buffer.from(clientId + ":" + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  if (response.status != 200) throw Error(`Problem with authentication! Http code from service: ${response.status}`)
  accessTokenWrapper = await response.json();
  cachedAccessToken = accessTokenWrapper.access_token;
  return cachedAccessToken
}

function isTokenStillValid(accessToken) {
  const tokenSections = (accessToken || '').split('.');
  if (tokenSections.length < 2) {
    return false;
  }
  const payloadJSON = JSON.parse(Buffer.from(tokenSections[1], 'base64').toString('utf8'));
  const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
  if (currentSeconds > payloadJSON.exp || currentSeconds < payloadJSON.auth_time) {
    return false;
  }
  return true;
}
async function getAssetTree(accessToken) {
  const params = new URLSearchParams({})
  const response = await fetch('https://api.demo.leanspace.io/asset-repository/properties?query=TLE&size=100' + params,
    {
      method: 'GET',
      headers: {
        "Authorization": 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });
  return response.json();
}
(async () => {
  //lets get a access token
  let accessToken = await getAccessToken(clientId, clientSecret)
  //lets use this token to get some assets
  const assetTree = await getAssetTree(accessToken);
  var prop = null;
  var propIndex = 0;
  var date = new Date()
  var sats = {}
  var temp = 1440
  var flag = 0
  var cnt = 0
  let satOps = null

  // grand station location needed
  var gslat = 20
  var gslong = 30

  // user input example

  // picture postion angle in radian.
  var longSiteRad = satellite.degreesToRadians(120),
    latSiteRad = satellite.degreesToRadians(90)

  var satsOfInterest = []
  var passTimeOriginal = new Date();
  for (propIndex in assetTree.content) {

    //Prepare TLE
    prop = assetTree.content[propIndex];
    // here 
    var tleLine1 = prop.value[0];
    var tleLine2 = prop.value[1];
    const noradId = parseInt(tleLine1.split(' ')[1].slice(0, -1))
    //Propagate the TLE for some time

    var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    var passTime = new Date();
    for (var timeAdjust = 0; timeAdjust < 120; timeAdjust++) {



      // Loop at 30 second intervals for 1 day

      passTime = new Date(passTimeOriginal.getTime() + (timeAdjust) * 60000)
      console.log(passTime)
      var positionAndVelocity = satellite.propagate(satrec, passTime);

      // The position_velocity result is a key-value pair of ECI coordinates.
      // These are the base results from which all other coordinates are derived.
      var positionEci = positionAndVelocity.position,
        velocityEci = positionAndVelocity.velocity;
      var gmst = satellite.gstime(passTime);

      // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
      var positionEcf = satellite.eciToEcf(positionEci, gmst),
        positionGd = satellite.eciToGeodetic(positionEci, gmst)

      // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
      var satLongitude = positionGd.longitude,
        satLatitude = positionGd.latitude,
        height = positionGd.height;

      // calculate distance between sat and user req

      const distance = geolib.getDistance(
        { latitude: satLatitude, longitude: satLongitude },
        { latitude: latSiteRad, longitude: longSiteRad }
      );

      if (distance < 224000) // and time less then 20 mins
      {
        satsOfInterest.push({ "noradId": noradId, "executionTime": passTime, "distance": distance })
        break
        // break and get the satellite id
        // give a flag to activate downlink comand function
      }

    }
  }
  console.log(satsOfInterest)

  // for (var gsID in gsAPI) {

  // var elevation = gsSearching(gslong, gslat, positionEcf)
  if (satFound = 1) {
    // if (elevation > -30) {

    // get the gs station and time
    // raise a flag for activate the satellite commanding
    //   console.log(noradId, "command uplink")
    //   break
    // }
    // }end loop

    // for (var gsID in gsAPI) {

    var elevation = gsSearching(gslong, gslat, positionEcf)
    if (elevation > -30) {// use the flag that gave by the commaniding with delay 
      // find gs to downlink
      console.log(noradId, " is downlinking")
    }
    // }end loop
  }

})();