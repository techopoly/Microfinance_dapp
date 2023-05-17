import useMifiApi from './hooks/useMifiApi';
import { useEffect, useState } from "react";


const User = () => {

    const{web3, account, contract} = useMifiApi();
    const [user, setUser] = useState();
    const [vault, setAllVaults] = useState();

    useEffect(() => {
        const getAllUser = async () => {
          
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
        const getAllVaults = async () => {
            try {
              console.log(contract);
              if (contract) {
                const vaults = await contract.methods
                  .show_all_individual_vault()
                  .call({ from: account[0] });
                console.log("vaults: ", vaults);
                setAllVaults(vaults);
                const response = await contract.methods
                  .vaultId_vault(2)
                  .call({ from: account[0] });
                console.log("vault:1 ", response);
              }
            } catch (error) {
              console.log(error);
            }
          };
         getAllUser(); 
        getAllVaults();
      }, [contract]);

    return (
        <p>user</p>
    )
}

export default User;