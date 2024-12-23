import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";

import { ROUTES } from "~/router";

export const Sidebar = () => {
  const location = useLocation();
  const current = location.pathname;
  const navigation = [
    { name: "Home", href: ROUTES.home },
    { name: "Cities", href: ROUTES.cities },
    { name: "Airlines", href: ROUTES.airlines },
    { name: "Flights", href: ROUTES.flights },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {/* Static sidebar for desktop */}
      <button
        className="p-4 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      <div
        className={tw(
          "lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col",
          isSidebarOpen ? "block" : "hidden",
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <p className="text-white">Travel Agency</p>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={tw(
                      current === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
