import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Upload from "./Upload";
import Home from "./Home";
import Loading from './Loading';

function App() {
  return (
    <div className="App">
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Loading" element={<Loading />} />
            {/* <Route path="upload" element={<Upload />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
