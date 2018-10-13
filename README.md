# ArQuest
Create smart invoices for your Decentralized Autonomous Organization (DAO). Building on [Aragon](https://aragon.org/) and [Request Network](https://request.network/#/).


1. [Proposal](https://github.com/Blockternship/projects/issues/11)
2. [PoC Demo Video](https://www.youtube.com/watch?v=E0p5Bjhkb30&feature=youtu.be)
3. [Project updates](https://docs.google.com/document/d/1QoL9Q5Fu-3Qqg6huvk5ySPkHUZLmnqKoZxwPe49pLis/edit?usp=sharing)

### Development
#### DAO and app
```shell
(start aragon environment)
npm run ganache

(deploy request network smart contracts)
truffle compile
truffle migrate --reset

(Serve app)
npm run start:app
aragon apm publish InvoicingApp --http localhost:8001 --http-served-from ./dist
(if above errors with a version problem try aragon apm version major)

cd kit
npm run publish:kit

./node_modules/@aragon/cli/dist/cli.js dao new arquest-kit-dev --fn "newInstance" --fn-args <requestCoreContractAddress> <requestEthereumContractAddress>
```
`✔ Created DAO: 0x20Ca2F1781E6312cb9109fA227C52e23FEe7F272`

```shell
aragon run --app-init-args 0x24fb684237f8b1835d2e85ce35b729002a88e526 0x2b6953ba77dcdc967a2ac2e8d3d8dc34e015a996 --http localhost:8001 --http-served-from ./dist

Replace with DAO address created above
```

=== Older ===
```shell
npm run start:aragon:http -- --app-init-args "0xbcfddf0fb6a918cb1e5040b9f0f529cbb930e23a" "0x97d0cab15baac862aa32679562e02200d2abe0fa"
Or to create DAO from kit see [deploy notes](./README_deploy.md)
~~npm run start:aragon:http:kit~~
```
#### Request Network UI
```shell
node init-request-ui.js
cd Request_App
npm run start
```

### Test
```shell
truffle exec test/callCreateRequestAsPayee.js
```

### Request UI
```shell
cd Request_App
npm i
```