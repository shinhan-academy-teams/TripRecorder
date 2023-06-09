import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Home,
  Login,
  PopularCard,
  Search,
  TripRegistration,
} from "pages/index";

import NotFound from "NotFound";
import Navbar from "components/common/Navbar";
import RegistrationAll from "pages/RegistrationAll";
import { useState } from "react";
import "style/main.scss";

const App = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        {isShow && <Navbar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsShow={setIsShow} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/tripregistration" element={<TripRegistration />} />
            <Route path="/popularcard" element={<PopularCard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/registerationall" element={<RegistrationAll />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
