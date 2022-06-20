const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync('package.json');
let package = JSON.parse(rawdata);
let version = package.version;
let a = version.split('.');
let major = parseInt(a[0]);
let minor = parseInt(a[1]);
let patch = parseInt(a[2]);

minor += 1;
patch = 0;

let newVersion = `${major}.${minor}.${patch}`;

package.version = newVersion;
let newPackage = JSON.stringify(package);

let packagePathBuild = path.join(
  __dirname,
  '/../',
  'build',
  'app',
  'package.json'
);
let rawdataBuild = fs.readFileSync(packagePathBuild);
let packageBuild = JSON.parse(rawdataBuild);
packageBuild.version = newVersion;
let newPackageBuild = JSON.stringify(packageBuild);

fs.writeFileSync('package.json', newPackage);
fs.writeFileSync(packagePathBuild, newPackageBuild);
