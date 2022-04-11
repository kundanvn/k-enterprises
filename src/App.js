import { HashRouter, Routes, Route } from "react-router-dom";
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
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
