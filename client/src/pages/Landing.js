import "../css/landing.css";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  let navigator = useNavigate();
  return (
    <div className="main">
      <div className="container">
        <div
          className="common blue"
          onClick={() => {
            navigator("/findCustomer");
          }}
        >
          Find customer
        </div>
        <div
          className="common red"
          onClick={() => {
            navigator("/newCustomer");
          }}
        >
          New Customer
        </div>

        <div
          className="common new"
          onClick={() => {
            navigator("/checkDues");
          }}
        >
          Check Balance
        </div>
        <div
          className="common yell"
          onClick={() => navigator("/makeTreatment")}
        >
          Add Treatment
        </div>
      </div>
    </div>
  );
}
