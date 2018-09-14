pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";
import {RequestEthereum} from "./requestNetwork/contracts/synchrone/RequestEthereum.sol";
import {RequestCore} from "./requestNetwork/contracts/core/RequestCore.sol";

contract InvoicingApp is AragonApp {
  // enum State {Pending, Fulfilled}
  // enum Status {Fulfilled, Pending}

  // struct PaymentRequest {
  //   address payer;
  //   int256 amount;
  //   Status status;
  //   string data;
  // }

  RequestEthereum public requestEthereum;
  RequestCore public requestCore;
  // mapping(bytes32 => PaymentRequest) public requests;
  bytes32[] public requests;
  uint256 counter;

  event DummyRequestCreated(address _address, uint val);
  event RequestCreated(bytes32 indexed requestId, uint indexed fee, address payee, address payer, int256 amount, string data);
  event PaymentReceived(address indexed sender, uint256 amount);

  function InvoicingApp() public {
    // address _requestEthereum = 0x497d9c622bc27efd06d2632021fdc3cc5038e420;
    // requestEthereumAddress = _requestEthereum;
    // requestEthereum = RequestEthereum(_requestEthereum);
  }

  function initialize() external onlyInit {
    initialized();
    requestEthereum = RequestEthereum(0x28b68ea37934c3e11835e6405d2f54dd56e873eb);
    requestCore = RequestCore(0x548b9f0a280eadb4081d4d85923c1860e1719063);
  }

  function setRequestEthereumAddress(address _requestEthereum, address _requestCore) { // onlyDaoOwner?
    requestEthereum = RequestEthereum(_requestEthereum);
    requestCore = RequestCore(_requestCore);
  }

  // function transfer() public payable {
  //   emit PaymentReceived(msg.sender, msg.value); 
  // }

  function() external payable {
    emit PaymentReceived(msg.sender, msg.value); 
  }

  function createRequestAsPayee(
		int256[] 	_expectedAmounts,
		address 	_payer,
		string 		_data)
		public payable
		returns(bytes32 requestId)
	{
		address[] memory _payeesIdAddress = new address[](1);
    _payeesIdAddress[0] = address(this);
    // msg.value is the fee for creating the request
    requestId = requestEthereum.createRequestAsPayee.value(msg.value)(
      _payeesIdAddress,
      _payeesIdAddress, // _payeesPaymentAddress - make this the finance app address
      _expectedAmounts,
      _payer,
      _payer, // _payerRefundAddress,
      _data
    );
    requests.push(requestId);
    // requestId = keccak256(counter++);
    // requestId = bytes32(counter++);
    // PaymentRequest memory paymentRequest = PaymentRequest(
    //   _payer, _expectedAmounts[0], Status.Pending, _data);
    // requests[requestId] = paymentRequest;
    emit RequestCreated(requestId, msg.value, _payeesIdAddress[0], _payer, _expectedAmounts[0], _data);
	}

  function getRequestsCount() public view returns(uint) {
    return requests.length;
  }

  function getRequest(bytes32 _requestId)
  returns(address payer, address currencyContract, RequestCore.State state, address payeeAddr, int256 payeeExpectedAmount, int256 payeeBalance) {
    return requestCore.getRequest(_requestId);
  }

  // function dummyCreateRequestAsPayee() {
  //   DummyRequestCreated(requestEthereumAddress, 5);
  // }

  function collectEstimation(int256 _expectedAmount)
    public
    view
    returns(uint256 fee)
  { 
    fee = requestEthereum.collectEstimation(_expectedAmount);
  }
}