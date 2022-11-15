var satellite = require('satellite.js');
var math = require("mathjs")
const geolib = require('geolib');
const fetch = require('node-fetch');
const { sort } = require('mathjs');
const { start } = require('repl');
const { Start } = require('@mui/icons-material');
const { startTransition } = require('react');
const clientId = "7lt20kki6n7q458euonhpgfd4e"
const clientSecret = "4iq8jsp2j0bb7ag4acugstcqirmk39arvv4ck0qij5r81eas0nc"
let cachedAccessToken;
async function getAccessToken(clientId,clientSecret){
  if(cachedAccessToken && isTokenStillValid(cachedAccessToken)){
    console.log("returning token from cache")
    return cachedAccessToken;
  }
  console.log("there is no token in cache or it has expired, getting a new one.")
  const response = await fetch('https://hkickers-demo.auth.eu-central-1.amazoncognito.com/oauth2/token?scope=https://api.leanspace.io/READ&grant_type=client_credentials',
    {
      method:'POST',
      headers:{
        "Authorization":'Basic ' + Buffer.from(clientId + ":" + clientSecret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  if(response.status !=200) throw Error(`Problem with authentication! Http code from service: ${response.status}`)
  accessTokenWrapper = await response.json();
  cachedAccessToken = accessTokenWrapper.access_token;
  return cachedAccessToken
}
function isTokenStillValid(accessToken){
  const tokenSections = (accessToken || '').split('.');
  if (tokenSections.length < 2) {
     return false;
  }
  const payloadJSON = JSON.parse(Buffer.from(tokenSections[1], 'base64').toString('utf8'));
  const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
  if (currentSeconds > payloadJSON.exp || currentSeconds < payloadJSON.auth_time) {
      return false;
  }
  return true;
}
async function getAssetTree(accessToken){
   const params = new URLSearchParams({})
   const response = await fetch('https://api.demo.leanspace.io/asset-repository/properties?query=TLE&size=100' + params,
    {
      method:'GET',
      headers:{
        "Authorization":'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    });
  return response.json();
}
(async () => {
  //lets get a access token
  let accessToken = await getAccessToken(clientId,clientSecret)
  //lets use this token to get some assets
  const assetTree = await getAssetTree(accessToken);
var prop = null;
var propIndex = 0;
var sats = [];
var temp = 121;
var IdOfSat = 0;

// user input example

var longSiteRad= 120,
  latSiteRad= 60
  passTimeOriginal = new Date();
for(propIndex in assetTree.content) {

//Prepare TLE
var cnt = 0;
prop = assetTree.content[propIndex];
var tleLine1 = prop.value[0];
var tleLine2 = prop.value[1];
const noradId = parseInt(tleLine1.split(' ')[1].slice(0, -1))
//Propagate the TLE for some time

var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
  
passTime = new Date();
for (timeAdjust = 0; timeAdjust < 120; timeAdjust++) {

  passTime = new Date(passTimeOriginal.getTime() + (60000 * timeAdjust))

  positionAndVelocity = satellite.propagate(satrec, passTime);

var positionEci = positionAndVelocity.position,
  velocityEci = positionAndVelocity.velocity;

// You will need GMST for some of the coordinate transforms.
// http://en.wikipedia.org/wiki/Sidereal_time#Definition
var gmst = satellite.gstime(passTime);

// You can get ECF, Geodetic, Look Angles, and Doppler Factor.
var positionEcf   = satellite.eciToEcf(positionEci, gmst),
//   observerEcf   = satellite.geodeticToEcf(observerGd),
  positionGd    = satellite.eciToGeodetic(positionEci, gmst)


var satLongitude = (positionGd.longitude * 180/math.pi),
  satLatitude  = (positionGd.latitude * 180/math.pi),
  height    = positionGd.height;

const distance = geolib.getDistance(
{ latitude: satLatitude, longitude:satLongitude},
{ latitude:latSiteRad, longitude:longSiteRad }
);

//console.log(latSiteRad, longSiteRad, satLatitude, satLongitude)
if (distance < 834000)
{
  sats.push({noradId, timeAdjust, distance, passTime})
  if (timeAdjust < temp)
  {
    temp = cnt;
    idOfSat = noradId;
  }
  break;
  }
  cnt++;
} 
}

sats.sort((a, b) => a.timeAdjust - b.timeAdjust);


// We have the top 10 sats. Now we want to get the uplink oppourtunity for them.

for (var i = 0; i < 10; i++){
//console.log("All Aviable Sats:", sats[i]);


const fs = require('fs');

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T"];
const nmbr = ["1", "2", "3", "4","5"]
//var gswaiting = null
  var file = sats[i].noradId - 81300; 
  var temp = file % 5;
  const execTime = sats[i].passTime
  console.log("Processing uplinks for " + alphabet[(file - temp)/ 5] + nmbr[temp]);
  var filename = "./Passes/" + alphabet[(file - temp)/ 5] + nmbr[temp] + " Passes.json";
  const fileContent = fs.readFileSync(filename,{encoding:'utf8'})       
  var passesForSat = JSON.parse(fileContent);
  const timeNow = new Date();

  passesForSat.sort((a,b) => new Date(a.start) - new Date (b.start))
  const filteredPasses = passesForSat.filter(pass => new Date(pass.start) >= timeNow && (new Date(pass.start) < new Date(execTime)))

  sats[i].uplinkPass = filteredPasses[0];

}
//console.log(sats)

sats = sats.filter(sat => sat.uplinkPass).sort((a,b) => new Date(a.uplinkPass.start) - new Date(b.uplinkPass.start) )

// improve the algo above
console.log(sats)


})();