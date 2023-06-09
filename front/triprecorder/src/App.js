import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/style/main.scss";
import {
  Home,
  Login,
  PopularCard,
  Search,
  TripRegistration,
} from "pages/index";
//import Sidebar from "components/common/Sidebar";
import NotFound from "NotFound";
import Navbar from "components/common/Navbar";
import RegistrationAll from "pages/RegistrationAll";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tripregistration" element={<TripRegistration />} />
          <Route path="/popularcard" element={<PopularCard />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/registerationall" element={<RegistrationAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
