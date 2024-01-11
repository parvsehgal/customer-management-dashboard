import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/finCustomer.css";
export default function Findcustomer() {
  const [records, setRecords] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const getData = async () => {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/getRecords",
      { phoneNumber: phoneNumber }
    );
    setRecords(data);
    console.log(records);
  };

  const changeHandler = (event) => {
    const num = event.target.value;
    setPhoneNumber(num);
    if (num == "") {
      setRecords([]);
    }
  };

  const toDisplay = records.map((data) => {
    return (
      <div className="entity">
        <div>Name: {data.name}</div>
        <div>Date: {data.date}</div>
        <div>
          <div>Services opted: {data.Treatments}</div>
        </div>
        <div className="treat">
          <div>Bill: Rs.{data.paymentDetails.amountCalculated} </div>
          <div>AmountPaid: Rs.{data.paymentDetails.amountPaid}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="back">
      <div className="blueDiv">
        <div className="stuff">
          <h2>Search history of a customer</h2>
          <input
            type="text"
            placeholder="enter Phone Number"
            onChange={changeHandler}
          ></input>
          <button onClick={getData}>Find</button>
        </div>
        <div className="box">{toDisplay}</div>
      </div>
    </div>
  );
}
