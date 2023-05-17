import useMifiApi from '../hooks/useMifiApi';
import { useEffect, useState } from "react";


const User = () => {

    const{web3, account, contract} = useMifiApi();
    const [user, setUser] = useState();

    useEffect(() => {
        const getAllVaults = async () => {
          try {
            console.log(contract);
            if (contract) {
              const user = await contract.methods
                .address_user('0x03255B84155a5a3826b6c1765fC31712d410639B')
                .call({ from: account[0] });
              console.log("user : ", user);
              setUser(user);
              
            }
          } catch (error) {
            console.log(error);
          }
        };
        getAllVaults();
      }, [contract]);

    return (
        <h1>User Page is working</h1>
    )
}

export default User;