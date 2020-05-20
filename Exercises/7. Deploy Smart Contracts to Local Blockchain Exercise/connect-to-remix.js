// Step 1 - Setup the Configurations
var Web3 = require("web3");
var web3 = new Web3("HTTP://127.0.0.1:7545");

web3.eth
  .getTransactionCount("0x7dA7d97F9659f0171489B1BB5f114000E929c4a7")
  .then(console.log);
