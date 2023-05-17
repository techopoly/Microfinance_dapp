import useMifiApi from './hooks/useMifiApi';
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
                .address_user('0xAD12c614ADEEB0352917470e1dCc45E4d3B8eE38')
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
        <p>user</p>
    )
}

export default User;