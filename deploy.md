# Deploying an Aragon App

## development
```
npm run ganache
ipfs daemon
```

Build and serve app frontend over http
`npm run start:app`
```shell
$ aragon --version
4.2.1
```
Publish the app
```shell
$ aragon apm publish --http localhost:8001 --http-served-from ./dist > output.txt
[?25l[17:05:35] Preflight checks for publishing to APM [started]
[17:05:35] Check version is valid [started]
[17:05:35] Check version is valid [completed]
[17:05:35] Checking version bump [started]
[17:05:35] Checking version bump [completed]
[17:05:35] Preflight checks for publishing to APM [completed]
[17:05:35] Deploy contract [started]
[17:05:35] Compile contracts [started]
[17:05:55] Compile contracts [completed]
[17:05:55] Deploy 'InvoicingApp' to network [started]
[17:05:55] → Deploying 'InvoicingApp' to network
[17:05:55] Deploy 'InvoicingApp' to network [completed]
[17:05:55] Deploy contract [completed]
[17:05:55] Determine contract address for version [started]
[17:05:55] Determine contract address for version [completed]
[17:05:55] Check for --http-served-from argument and copy manifest.json to destination [started]
[17:05:55] Check for --http-served-from argument and copy manifest.json to destination [completed]
[17:05:55] Generate application artifact [started]
[17:05:55] Generate application artifact [completed]
[17:05:55] Publish arquest-dev.aragonpm.eth [started]
[17:05:55] → Generating transaction and waiting for confirmation
 ❯ {"to":"0xD33824d26df396F04Dba40e709f130D86a2F5Ddd","data":"0x32ab6af000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000b4124ceb3451635dacedd11767f004d8a28c6ee70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ccf98ce5ac3ded3dab947f66cd721d01ff0c6c30000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000b617271756573742d6465760000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013687474703a6c6f63616c686f73743a3830303100000000000000000000000000","gas":1721285,"gasPrice":"19000000000","nonce":31,"from":"0xb4124cEB3451635DAcedd11767f004d8a28c6eE7"}
[17:05:59] Publish arquest-dev.aragonpm.eth [completed]
```
Spin up a new dao
```shell
$ aragon dao new bare-kit
✔ Fetching kit bare-kit.aragonpm.eth@latest
✔ Create new DAO from kit
✔ Checking DAO
✔ Created DAO: 0xCb0FF465e3847606603A51cc946353A41Fea54c0
```
Install the app
```shell
$ aragon dao install 0xCb0FF465e3847606603A51cc946353A41Fea54c0 arquest-dev.aragonpm.eth
✔ Fetching arquest-dev.aragonpm.eth@latest
✔ Upgrading app
✔ Deploying app instance
✔ Set permissions
✔ Installed arquest-dev.aragonpm.eth at: 0xa1958D24A9afecB1FaE17eD7A6D2cb6DB3E4b43A
```
Verify installed apps

```shell
$ aragon dao apps 0xCb0FF465e3847606603A51cc946353A41Fea54c0
✔ Inspecting DAO
✔ Successfully fetched DAO apps for 0xCb0FF465e3847606603A51cc946353A41Fea54c0
┌────────────────────┬────────────────────────────────────────────┬────────────────────────┐
│ App                │ Proxy address                              │ Content                │
├────────────────────┼────────────────────────────────────────────┼────────────────────────┤
│ acl                │ 0xB9A34A79eD122554029b0fC04Be431E671133bD3 │ (No UI available)      │
├────────────────────┼────────────────────────────────────────────┼────────────────────────┤
│ evmreg             │ 0x7af161003a74D1d63F89fa72d617841e9ACbAca7 │ (No UI available)      │
├────────────────────┼────────────────────────────────────────────┼────────────────────────┤
│ arquest-dev@v1.0.0 │ 0xa1958D24A9afecB1FaE17eD7A6D2cb6DB3E4b43A │ http:localhost:8001... │
└────────────────────┴────────────────────────────────────────────┴────────────────────────┘
```

## rinkeby
change `appName` to `arquest-dev.open.aragonpm.eth` (add the `open`)
Publish the app
```shell
$ aragon apm version minor
✔ New version: 1.1.0

$ aragon apm publish InvoicingApp --network rinkeby --apm.ens-registry "0xfbae32d1cde62858bc45f51efc8cc4fa1415447e" --http localhost:8001 --http-served-from ./dist
```
I understand serving from `localhost:8001` doesn't make sense. Just wanted a faster publish.

Fails with `Error: Transaction would not succeed ("Returned values aren't valid, did it run Out of Gas?")` See [apm.js](https://github.com/aragon/apm.js/blob/1bd8eaad5a3f2cf7ac2585e6800120993a2c8618/src/index.js#L298)
See [output_out_of_gas](./output_out_of_gas)

[This](https://github.com/ethereum/web3.js/issues/1916) issue suggested that it could be a problem with recent `beta` versions of `web3` so I downgraded to `web3@1.0.0-beta.10` and ran into `please check your gas limit`. See [output_check_gas_limit](./output_check_gas_limit) 