import React, { useState } from "react";
import axios from "axios";
import "../css/balance.css";
export default function CheckBalance() {
  const [balance, setBalance] = useState([]);
  const [phoneNumber, setPhoneNUmber] = useState("");

  const getBalance = async () => {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/checkBalance",
      {
        phoneNumber: phoneNumber,
      }
    );
    setBalance([data]);
    console.log(balance);
  };

  const changeHandler = (event) => {
    const num = event.target.value;
    setPhoneNUmber(num);
    if (num == "") {
      setBalance([]);
    }
  };

  const toDis = balance.map((data) => {
    return (
      <div>
        <div>Name: {data.name}</div>
        <div>Advance: {data.advance}</div>
        <div>Debt: {data.debt}</div>
        <button>Delete</button>
      </div>
    );
  });

  return (
    <div className="bg">
      <div className="b">
        <div className="mar">
          <h2>Check Balance of Customer</h2>
          <input
            placeholder="enter PhoneNumer"
            onChange={changeHandler}
          ></input>
          <button onClick={getBalance}>Check</button>
        </div>
        <div className="dues">{toDis}</div>
      </div>
    </div>
  );
}
