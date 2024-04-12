import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBatch from "./pages/CreateBatch";
import UpdateBatch from "./pages/UpdateBatch";
import ViewBatch from "./pages/ViewBatch";
import GenerateReport from "./pages/GenerateReport";
import NavBar from "./component/NavBar";
import QMHome from "./pages/QMHome";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qm-home" element={<QMHome />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/update-batch/:batchID" element={<UpdateBatch />} />
        <Route path="/view-batch" element={<ViewBatch />} />
        <Route path="/generate-report" element={<GenerateReport />} />
      </Routes>
    </BrowserRouter>
  );
}
