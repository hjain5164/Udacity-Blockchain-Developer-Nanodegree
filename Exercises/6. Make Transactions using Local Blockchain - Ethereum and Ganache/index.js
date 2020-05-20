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
var sendingAddress = "0x7dA7d97F9659f0171489B1BB5f114000E929c4a7";
var receivingAddress = "0xAE3a7bA45459b35fCB566D71EE922DEA0324E962";

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
  nonce: ascii_2_0xhex(3),
  to: receivingAddress,
  gasPrice: ascii_2_0xhex(20000000),
  gasLimit: ascii_2_0xhex(30000),
  value: ascii_2_0xhex(1000000000000000000),
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
  "dbecc9513a7c53c69860a8b6e5f2cddc895cae8d3ebcf6d54e0c4fdcd71f17d7";
var privateKeySenderHex = new Buffer(privateKeySender, "hex");
var transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

/*#########################################
Send the transaction to the network

#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);

console.log("Transaction Done!!");
console.log("Gas Price of the Network is:");
web3.eth.getGasPrice().then(console.log);
