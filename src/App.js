import { Route, BrowserRouter } from "react-router-dom";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <BrowserRouter>
      <Route exact path={["/", "/:countryId", "/:countryId/airports"]}>
        <MainComponent />
      </Route>
    </BrowserRouter>
  );
}

export default App;
