pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";
import {RequestEthereum} from "./requestNetwork/contracts/synchrone/RequestEthereum.sol";
import {RequestCore} from "./requestNetwork/contracts/core/RequestCore.sol";

contract InvoicingApp is AragonApp {
  // ACL
  bytes32 constant public CREATE_PAYMENT_ROLE = keccak256("CREATE_PAYMENT_ROLE");

  RequestEthereum public requestEthereum;
  RequestCore public requestCore;
  bytes32[] public requests;
  uint256 counter;

  event DummyRequestCreated(address _address, uint val);
  event RequestCreated(bytes32 indexed requestId, uint indexed fee, address payer, int256 amount, string data);

  function initialize(address _requestCore, address _requestEthereum) external onlyInit {
    initialized();
    requestCore = RequestCore(_requestCore);
    requestEthereum = RequestEthereum(_requestEthereum);
    // requestEthereum = RequestEthereum(0xf2e08e3deb03d02d63a586296b2c691e6e49c973);
    // requestCore = RequestCore(0x677b89ac909215b7e6b6ba46e229ebce08d25e79);
  }

  function setRequestEthereumAddress(address _requestEthereum, address _requestCore) { // onlyDaoOwner?
    requestEthereum = RequestEthereum(_requestEthereum);
    requestCore = RequestCore(_requestCore);
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
		address[] memory _payeesPaymentAddress = new address[](1);
    _payeesPaymentAddress[0] = msg.sender;
    // msg.value is the fee for creating the request
    requestId = requestEthereum.createRequestAsPayee.value(msg.value)(
      _payeesIdAddress,
      _payeesPaymentAddress, // _payeesPaymentAddress - make this the finance app address
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
    emit RequestCreated(requestId, msg.value, _payer, _expectedAmounts[0], _data);
	}

  function getRequestsCount() public view returns(uint) {
    return requests.length;
  }

  function getRequest(bytes32 _requestId)
  returns(address payer, address currencyContract, RequestCore.State state, address payeeAddr, int256 payeeExpectedAmount, int256 payeeBalance) {
    return requestCore.getRequest(_requestId);
  }

  function collectEstimation(int256 _expectedAmount)
    public
    view
    returns(uint256 fee)
  { 
    fee = requestEthereum.collectEstimation(_expectedAmount);
  }
}