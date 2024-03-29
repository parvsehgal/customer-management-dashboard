import Landing from "./pages/Landing";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Newcustomer from "./pages/Newcustomer";
import Findcustomer from "./pages/Findcustomer";
import CheckBalance from "./pages/CheckBalance";
import CreatTreatment from "./components/CreatTreatment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route
          path="/newCustomer"
          element={<Newcustomer></Newcustomer>}
        ></Route>
        <Route
          path="/findCustomer"
          element={<Findcustomer></Findcustomer>}
        ></Route>
        <Route
          path="/checkDues"
          element={<CheckBalance></CheckBalance>}
        ></Route>
        <Route
          path="/makeTreatment"
          element={<CreatTreatment></CreatTreatment>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
