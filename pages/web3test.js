import React, { useState, useEffect } from "react";
import useWeb3Api from "@/pages/hooks/useWeb3Api";

export default function Web3Page() {
  const { web3, account, contract } = useWeb3Api();
  const [note, setNote] = useState();

  useEffect(() => {
    const getNote = async () => {
      try {
        console.log(contract);
        if (contract) {
          const note = await contract.methods
            .getNote()
            .call({ from: account[0] });
          setNote(note);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNote();
  }, [contract]);

  return (
    <div>
      <h1>{account}</h1>
      <h2>{note}</h2>
    </div>
  );
}
