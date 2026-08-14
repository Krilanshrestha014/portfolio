import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/Reusable/CustomCursor";
import UserLayout from "./layouts/UserLayout";
import Spark from "./pages/Spark";
import Yatrasanghi from "./pages/Yatrasanghi";
import MannaBakery from "./pages/MannaBakery";

const App = () => {
  return (
    <CursorProvider>
      <CustomCursor />
      <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/spark" element={<Spark />} />
        <Route path="/yatrasanghi" element={<Yatrasanghi />} />
        <Route path="/manna-bakery" element={<MannaBakery />} />
      </Route>
      </Routes>
    </CursorProvider>
  );
};

export default App;
