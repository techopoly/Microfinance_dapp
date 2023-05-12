import Web3 from "web3";

const getWeb3 = async () => {
  let web3Instance;
  let accounts;

  if (window.ethereum) {
    web3Instance = new Web3(window.ethereum);
    try {
      accounts= await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts: ", accounts);
    } catch (error) {
      console.error("User denied account access");
      throw new Error("User denied account access");
    }
  } else if (window.web3) {
    web3Instance = new Web3(window.web3.currentProvider);
  } else {
    console.error("No web3 instance found, please install MetaMask");
    throw new Error("No web3 instance found, please install MetaMask");
  }

  return { web3Instance, accounts };
};

export default getWeb3;
