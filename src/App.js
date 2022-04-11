import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ViewPage, DocList } from "./pages";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            exact
            path="/print-registration-from-vehicle-checkvalid-or-not/:id"
            element={<ViewPage />}
          />
          <Route exact path="/" element={<DocList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
