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
// import RegistrationAll from "pages/RegistrationAll";
import { useState } from "react";
import "style/main.scss";
import Profile from "pages/Profile";

import RegisterAll from "pages/RegisterAll";
import RegisterExp from "components/RegisterExp";
import RegisterSns from "components/RegisterSns";
import S3Upload from "components/S3Upload";
import HashTag from "components/HashTag";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/tripregistration" element={<TripRegistration />} />
            <Route path="/popularcard" element={<PopularCard />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/registerationall"
              element={
                <RegisterAll>
                  <RegisterExp />
                  <RegisterSns>
                    <S3Upload/>
                    <HashTag/>
                  </RegisterSns>
                </RegisterAll>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
