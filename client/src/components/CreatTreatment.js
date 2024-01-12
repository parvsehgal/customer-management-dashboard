import React, { useState } from "react";
import axios from "axios";
import "../css/create.css";

export default function CreatTreatment() {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(form);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/api/v1/makeTreatment",
      form
    );
    if (res.status == 200) {
      alert("created treatmemt sucessfully");
    } else {
      alert("problem creating treatment");
    }
  };

  return (
    <div className="gr">
      <div>
        <h2>Create Treatment</h2>
        <form onSubmit={submitHandler}>
          <input
            placeholder="name of treatment"
            name="name"
            onChange={changeHandler}
          ></input>
          <input
            placeholder="its price"
            name="price"
            onChange={changeHandler}
          ></input>
          <button type="submit">ADD</button>
        </form>
      </div>
    </div>
  );
}
