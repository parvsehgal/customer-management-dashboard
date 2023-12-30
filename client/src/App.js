import Landing from "./pages/Landing";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Newcustomer from "./pages/Newcustomer";
import Findcustomer from "./pages/Findcustomer";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
