import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "../../constants/paths";
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
      <Route path={PATHS.index} element={<Lines />} />
      <Route path={PATHS.create} element={<CreateLine />} />
    </Routes>
  );
};
