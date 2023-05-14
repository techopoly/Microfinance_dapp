import React, { useState, useEffect } from "react";
import NoteTakingContract from "../public/contract/Note.json";
import getWeb3 from "./Components/getWeb3";
import styles from "../styles/Home.module.css";

function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [note, setNote] = useState("");
  const [inputNote, setInputNote] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  

  useEffect(() => {
    const init = async () => {
      try {
        const { web3Instance } = await getWeb3();
        const object = await getWeb3();
        console.log(object);
        const accounts = await web3Instance.eth.getAccounts();
        console.log("acc:", accounts);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = NoteTakingContract.networks[networkId];
        const instance = new web3Instance.eth.Contract(
          NoteTakingContract.abi,
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

  const connectAccount = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Manual connect: ", account);
  };

  const saveNote = async () => {
    let response = await contract.methods
      .saveNote(inputNote)
      .send({ from: accounts[0] });
    console.log("response", response);
    setNote(await contract.methods.getNote().call());
  };

  const getNote = async () => {
    try {
      const note = await contract.methods.getNote().call({ from: accounts[0] });
      //{ from: accounts[0] }
      setNote(note);
      console.log(note);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    try {
      const notes = await contract.methods
        .showNotes()
        .call({ from: accounts[0] });
      //{ from: accounts[0] }
      setAllNotes(notes);
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const users = await contract.methods
        .showUser()
        .call({ from: accounts[0] });
      //{ from: accounts[0] }
      setAllUsers(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      const response = await contract.methods
        .register(name, number)
        .send({ from: accounts[0] });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      const addressesArray = await contract.methods
        .getAddress()
        .call({ from: accounts[0] });
      setAddresses(addressesArray);
      console.log(addresses);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const user = await contract.methods
        .getUser(accounts[0])
        .call({ from: accounts[0] });
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const showWalletAccounts = async () => {
    console.log(accounts);
  };

  const checkType = (input) => {
    console.log(typeof input);
  };

  if (!web3) {
    return (
      <div className={styles.loading}>
        Loading Web3, accounts, and contract...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Note Taking DApp</h1>
      <h2>Current Account:{accounts} </h2>
      <button className={styles.button} onClick={connectAccount}>
        Connect Account
      </button>
      <div className={styles.noteTaking}>
        <textarea
          className={styles.facebookTextarea}
          value={inputNote}
          onChange={(e) => setInputNote(e.target.value)}
          placeholder="Write your note here"
        />
        <button className={styles.button} onClick={saveNote}>
          Save Note
        </button>
        <button className={styles.button} onClick={getNote}>
          Load Note
        </button>
      </div>
      <hr className={styles.divider} />
      <h2>Your Note:</h2>
      <p>{note}</p>
      <hr className={styles.divider} />
      <div className={styles.registration}>
        <h2 className={styles.subheading}>Registration</h2>
        <div className={styles.inputs}>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name here"
          />
          <input
            className={styles.input}
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Write your number here"
          />
 <hr className={styles.divider} />
            <button className={styles.button} onClick={register}>
              Register
            </button>
          <hr className={styles.divider} />
          <button className={styles.button} onClick={getUser}>
            Show My Info
          </button>
          <button className={styles.button} onClick={getAddress}>
            Show My Addresses
          </button>
          <button className={styles.button} onClick={showWalletAccounts}>
            Show Metamask Account
          </button>
          {/* <button className={styles.button} onClick={getUser}>
            Show User Info
          </button> */}
        </div>
        {addresses.length > 0 && (
          <div className={styles.addresses}>
            <h2 className={styles.subheading}>Addresses:</h2>
            {addresses.map((address, index) => (
              <p key={index}>{address}</p>
            ))} 
          </div>
        )}
        <h2 className={styles.subheading}>Metamask Account:</h2>
        <p>{accounts}</p>
        {user.length > 0 && (
          <div className={styles.addresses}>
            <h2 className={styles.subheading}>Your Info:</h2>
            {user.map((user, index) => (
              <p key={index}>{user}</p>
            ))}
          </div>
        )}
        <hr className={styles.divider} />
        <button className={styles.button} onClick={getAllNotes}>
          Show All Notes        
        </button>
        <hr className={styles.divider} />
        <button className={styles.button} onClick={getAllUsers}>
          Show All Users        
        </button>
        <hr className={styles.divider} />
          <button className={styles.button} onClick={() => checkType(user)}>
            Check Data Type
          </button>
      </div>
    </div>
  );
}
export default Home;
