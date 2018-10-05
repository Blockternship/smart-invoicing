// request core add
var fs = require('fs');
 
let contents = fs.readFileSync('./build/contracts/RequestCore.json', 'utf8');
contents = JSON.parse(contents);
// console.log(contents);
requestCoreAddress = contents.networks['15'].address;
console.log('requestCoreAddress', requestCoreAddress);

let _contents = fs.readFileSync('./build/contracts/RequestEthereum.json', 'utf8');
_contents = JSON.parse(_contents);
requestEthereumAddress = _contents.networks['15'].address;
console.log('requestEthereumAddress', requestEthereumAddress);

const reqCoreTestPath = './Request_App/node_modules/requestnetworkartifacts/RequestCore/RequestCore-0.0.5-test.json'
let reqCoreTest = fs.readFileSync(reqCoreTestPath, 'utf8');
reqCoreTest = JSON.parse(reqCoreTest);
// console.log('reqCoreTest', reqCoreTest);
reqCoreTest.networks.private.address = requestCoreAddress;
fs.writeFileSync(reqCoreTestPath, JSON.stringify(reqCoreTest))

const reqEthereumTestPath = './Request_App/node_modules/requestnetworkartifacts/RequestEthereum/RequestEthereum-0.0.5-test.json'
let reqEthereumTest = fs.readFileSync(reqEthereumTestPath, 'utf8');
reqEthereumTest = JSON.parse(reqEthereumTest);
// console.log('reqCoreTest', reqCoreTest);
reqEthereumTest.networks.private.address = requestEthereumAddress;
fs.writeFileSync(reqEthereumTestPath, JSON.stringify(reqEthereumTest))

artifactsPath = './Request_App/node_modules/requestnetworkartifacts/artifacts.json';
let artifacts = fs.readFileSync(artifactsPath, 'utf8');
artifacts = JSON.parse(artifacts);
Object.keys(artifacts.private).forEach(key => {
  if (artifacts.private[key] == 'RequestCore/RequestCore-0.0.5-test.json') {
    artifacts.private[requestCoreAddress] = 'RequestCore/RequestCore-0.0.5-test.json';
  }
  else if (artifacts.private[key] == 'RequestEthereum/RequestEthereum-0.0.5-test.json') {
    artifacts.private[requestEthereumAddress] = 'RequestEthereum/RequestEthereum-0.0.5-test.json';
  }
})
fs.writeFileSync(artifactsPath, JSON.stringify(artifacts))