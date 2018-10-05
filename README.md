# ArQuest
Create smart invoices for your Decentralized Autonomous Organization (DAO). Building on [Aragon](https://aragon.org/) and [Request Network](https://request.network/#/).


1. [Proposal](https://github.com/Blockternship/projects/issues/11)
2. [PoC Demo Video](https://www.youtube.com/watch?v=E0p5Bjhkb30&feature=youtu.be)
3. [Project updates](https://docs.google.com/document/d/1QoL9Q5Fu-3Qqg6huvk5ySPkHUZLmnqKoZxwPe49pLis/edit?usp=sharing)

### Development
```shell
(start aragon environment)
npm run ganache

(deploy request network smart contracts)
truffle compile
truffle migrate --reset

-- hardcode the RequestEthereum contract address in InvoicingApp.sol :p
npm run start:app

npm run start:aragon:http -- --app-init-args "0xbcfddf0fb6a918cb1e5040b9f0f529cbb930e23a" "0x97d0cab15baac862aa32679562e02200d2abe0fa"
Or to create DAO from kit see [deploy notes](./README_deploy.md)
~~npm run start:aragon:http:kit~~
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