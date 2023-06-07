// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Routes,
//   BrowserRouter,
// } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "App.css";
import {
  Home,
  Login,
  PopularCard,
  Search,
  TripRegistration,
} from "pages/index";
import Sidebar from "components/common/Sidebar";
import NotFound from "NotFound";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/searh" element={<Search />} />
          <Route path="/tripregistration" element={<TripRegistration />} />
          <Route path="/popularcard" element={<PopularCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
