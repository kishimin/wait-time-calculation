import { AppProvider } from "../providers/provider";
import { AppRouter } from "../routes/router";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
