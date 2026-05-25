import { BrowserRouter, Route, Routes } from "react-router";
import CreateLine from "../../features/create-line/views/create-line";
import Lines from "../../features/lines/views/lines";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterContents />
    </BrowserRouter>
  );
};

export const RouterContents = () => {
  return (
    <Routes>
      <Route path="/" element={<Lines />} />
      <Route path="/create" element={<CreateLine />} />
    </Routes>
  );
};
