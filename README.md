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

npm run start:aragon:http
Or to create DAO from kit see [deploy notes](./deploy.md)
~~npm run start:aragon:http:kit~~
```

### Test
```shell
truffle exec test/callCreateRequestAsPayee.js
```