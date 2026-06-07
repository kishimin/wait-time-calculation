import { BrowserRouter } from "react-router";
import { AppProvider } from "../providers/provider";
import { RouterContents } from "../routes/router";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <RouterContents />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
