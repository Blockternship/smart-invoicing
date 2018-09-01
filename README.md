# ArQuest
Create smart invoices for your Decentralized Autonomous Organization (DAO). Building on [Aragon](https://aragon.org/) and [Request Network](https://request.network/#/).


1. [Proposal](https://github.com/Blockternship/projects/issues/11)
2. [PoC Demo Video](https://www.youtube.com/watch?v=E0p5Bjhkb30&feature=youtu.be)

### Development
```shell
(start aragon environment)
ganache-cli --db node_modules/@aragon/aragen/aragon-ganache -m "explain tackle mirror kit van hammer degree position ginger unfair soup bonus" -i 15 -l 100000000

(deploy request network smart contracts)
truffle compile
truffle migrate

npm run start
```

### Test
```shell
truffle exec test/callCreateRequestAsPayee.js
```
