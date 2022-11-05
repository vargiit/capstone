import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          {/* <Route path="shop" element={<Shop />} /> */}
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}
