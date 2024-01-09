import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/newcustomer.css";

export default function Newcustomer() {
  const [treatments, setTreatments] = useState([]);
  const [addedTreatments, setAdded] = useState([]);

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
    setAdded(intermediate);
    console.log(intermediate);
  }

  function removeTreatment(value) {
    let filtered = addedTreatments.filter((data) => {
      return data !== value;
    });
    setAdded(filtered);
  }

  const viewAdded = addedTreatments.map((data) => {
    return (
      <div className="bl">
        {data[0]} {data[1]}
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
      <div className="window">
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addedTreatments == "") {
      alert("no treatments added");
      return;
    }
  };

  return (
    <div className="wrapper">
      <h2 className="heading">Add Record</h2>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input placeholder="PhoneNumber"></input>
          <input placeholder="Name"></input>
          <input placeholder="Date"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="choose">
        <h3 className="head">choose treatments</h3>
        {toDisplay}
      </div>
      <div className="choosed">
        <h3>treatments added</h3>
        {viewAdded}
      </div>
    </div>
  );
}
