import getWeb3 from "../Components/getWeb3";
import React, { useState, useEffect } from "react";
import mifiContract from '../../public/contract/Mifi.json';


export default function useWeb3Api() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
  
  
    useEffect(() => {
      const init = async () => {
        try {
          const { web3Instance } = await getWeb3();
          const object = await getWeb3();
          console.log(object);
          const accounts = await web3Instance.eth.getAccounts();
          console.log("acc:", accounts);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = mifiContract.networks[networkId];
          const instance = new web3Instance.eth.Contract(
            mifiContract.abi,
            deployedNetwork && deployedNetwork.address
          );
  
          setWeb3(web3Instance);
          setAccounts(accounts);
          setContract(instance);
        } catch (error) {
          alert("Failed to load web3, accounts, or contract.");
          console.error(error);
        }
      };
  
      init();
  
    }, []);

    return { web3, account, contract };

}


