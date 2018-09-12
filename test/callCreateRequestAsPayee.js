const InvoicingApp = artifacts.require('InvoicingApp');
const RequestCore = artifacts.require('RequestCore');
const abiDecoder = require('abi-decoder');

async function execute() {
  // console.log(InvoicingApp.abi);
  const instance = await InvoicingApp.deployed();
  // console.log(instance);
  
  const _payeesPaymentAddress = ['0x627306090abaB3A6e1400e9345bC60c78a8BEf57'];
  const expectedAmount = web3.toWei('.012', 'ether');
  const payer = '0xf17f52151EbEF6C7334FAD080c5704D77216b732';
  const data = 'Invoice 1';

  // get fees estimation
  const estimation = await instance.collectEstimation.call(expectedAmount);
  console.log('estimation', estimation);

  const createRequestAsPayee = await instance.createRequestAsPayee(
    [expectedAmount],
    payer,
    data,
    {
      from: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7', // account used to deploy
      value: estimation,
      // gas: 90000000 - 1,
      // gasPrice: web3.toWei('20', 'gwei')
    }
  );
  console.log('createRequestAsPayee tx receipt');
  console.dir(createRequestAsPayee, {depth: null});

  // add RequestCore abi to decode Created event
  abiDecoder.addABI(RequestCore.abi);
  abiDecoder.addABI(InvoicingApp.abi);
  const receipt = createRequestAsPayee.receipt;
  const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
  console.dir(decodedLogs, {depth: null});
  // [ { name: 'Created',
  // events:
  //  [ { name: 'requestId',
  //      type: 'bytes32',
  //      value: '0xdafa7c2690a61ef657584702a48bffb002fcd641000000000000000000000007' },
  //    { name: 'payee',
  //      type: 'address',
  //      value: '0x21722dc5d78334babaa19a0fca5210bd453eaa57' },
  //    { name: 'payer',
  //      type: 'address',
  //      value: '0xf17f52151ebef6c7334fad080c5704d77216b732' },
  //    { name: 'creator',
  //      type: 'address',
  //      value: '0x21722dc5d78334babaa19a0fca5210bd453eaa57' },
  //    { name: 'data', type: 'string', value: 'Invoice 1' } ],
  // address: '0xdafa7c2690a61ef657584702a48bffb002fcd641' } ]

  // const requests = await instance.requests(1);
  // console.dir(requests, {depth: null});
}

module.exports = async function(callback) {
  // perform actions
  await execute();
  callback();
}