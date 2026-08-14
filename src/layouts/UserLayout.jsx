import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Reusable/Navbar";

const UserLayout = () => {
  const { pathname } = useLocation();
  const isYatrasanghi = pathname.startsWith("/yatrasanghi");
  const isSpark = pathname.startsWith("/spark");
  const isMannaBakery = pathname.startsWith("/manna-bakery");

  const lightBg =
    isSpark || isYatrasanghi || isMannaBakery
      ? "#ffffff"
      : "rgba(245,242,234,0.88)";

  return (
    <div>
      <Navbar
        forceTheme={isSpark ? "light" : null}
        lightBg={lightBg}
      />
      <Outlet />
    </div>
  );
};

export default UserLayout;