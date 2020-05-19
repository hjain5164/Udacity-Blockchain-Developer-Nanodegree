/*##########################
CONFIGURATION

##########################*/

// -- Step 1: Set up the appropriate configuration
var Web3 = require("web3");
var EthereumTransaction = require("ethereumjs-tx").Transaction;
var web3 = new Web3("HTTP://127.0.0.1:7545");

// Get All the account addresses available in Ganache.
web3.eth.getAccounts().then((accounts) => console.log(accounts));

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = "0xe275A3B036EA4F6F1cE8a6066710fE1e19B52977";
var receivingAddress = "0x14B83FB3506af0b37De61fc2FCb696Eb83afCc4B";

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/*##########################
CREATE A TRANSACTION

##########################*/
function ascii_2_0xhex(num) {
  return "0x" + num.toString(16);
}
// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = {
  nonce: ascii_2_0xhex(2),
  to: receivingAddress,
  gasPrice: ascii_2_0xhex(20000000),
  gasLimit: ascii_2_0xhex(30000),
  value: ascii_2_0xhex(1),
  data: "0x00",
};

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// Note: They haven't changed because they need to be signed...

/*##########################
Sign the Transaction

##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var privateKeySender =
  "6c6d951bc3af059006a89cfa09315950e988de13dbdd3f3fc1c08d8c9fcbeeac";
var privateKeySenderHex = new Buffer(privateKeySender, "hex");
var transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

/*#########################################
Send the transaction to the network

#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
