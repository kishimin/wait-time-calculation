import { BrowserRouter, Route, Routes } from "react-router";
import Lines from "../../features/lines/views/lines";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lines />} />
      </Routes>
    </BrowserRouter>
  );
};
