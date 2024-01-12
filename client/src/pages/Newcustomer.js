import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/newcustomer.css";

export default function Newcustomer() {
  const [treatments, setTreatments] = useState([]);
  const [addedTreatments, setAdded] = useState([]);

  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    PhoneNumber: "",
    Name: "",
    Date: "",
    AmountPaid: "",
    AmountCalculated: "",
    totalTreatments: [],
  });

  const getData = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/getTreatments"
    );
    setTreatments(data);
  };

  useEffect(() => {
    getData();
  }, []);

  function addTreatment(name, price) {
    const intermediate = [...addedTreatments, [name, price]];
    setFormData((prevData) => ({
      ...prevData,
      totalTreatments: intermediate,
    }));
    setAdded(intermediate);
    console.log(intermediate);
    let sum = 0;
    for (let i = 0; i < intermediate.length; i++) {
      sum += intermediate[i][1];
    }
    setTotal(sum);
  }

  function removeTreatment(value) {
    let filtered = addedTreatments.filter((data) => {
      return data !== value;
    });
    setFormData((prevData) => ({
      ...prevData,
      totalTreatments: filtered,
    }));
    setAdded(filtered);
    let sum = 0;
    for (let i = 0; i < filtered.length; i++) {
      sum += filtered[i][1];
    }
    setTotal(sum);
  }

  const viewAdded = addedTreatments.map((data) => {
    return (
      <div className="bl">
        {data[0]} Rs. {data[1]}
        <button
          onClick={() => {
            removeTreatment(data);
          }}
        >
          remove
        </button>
      </div>
    );
  });

  const toDisplay = treatments.map((data, index) => {
    return (
      <div key={index} className="window">
        <p>{data.name}</p>
        <p>Rs.{data.price}</p>
        <button
          onClick={() => {
            addTreatment(data.name, data.price);
          }}
        >
          Add treatment
        </button>
      </div>
    );
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      totalTreatments: addedTreatments,
    }));
    console.log(formData);
  };

  const uploadData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/newCustomer",
        formData
      );
      console.log(response);
      if (response.status == 200) {
        alert("Data uploaded successfully!");
      } else {
        alert("response not right!!!");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addedTreatments == "") {
      alert("NO TREATMENTS ADDED");
      return;
    }
    uploadData();
  };

  return (
    <div className="wrapper">
      <div className="formContainer">
        <h2 className="heading">Add Record</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="PhoneNumber"
            name="PhoneNumber"
            onChange={inputHandler}
          ></input>
          <input placeholder="Name" name="Name" onChange={inputHandler}></input>
          <input
            placeholder="Date"
            name="Date"
            type="date"
            onChange={inputHandler}
          ></input>
          <input
            placeholder="AmountCalculated"
            name="AmountCalculated"
            onChange={inputHandler}
          ></input>
          <input
            placeholder="AmountPaid"
            name="AmountPaid"
            onChange={inputHandler}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="choose">
        <h3 className="head">choose treatments</h3>
        {toDisplay}
      </div>
      <div className="choosed">
        <h3>total = {total}</h3>
        <h3>treatments added</h3>
        {viewAdded}
      </div>
    </div>
  );
}
