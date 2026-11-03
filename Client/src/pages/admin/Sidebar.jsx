
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  ChartNoAxesColumn,
  SquareLibrary,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex mt-16 min-h-screen w-full">

      {/* Mobile menu button */}
<div className="fixed top-16 left-0 z-50 w-full lg:hidden bg-white dark:bg-gray-950 border-b dark:border-gray-700 p-3">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-40
          w-[250px] h-[calc(100vh-4rem)]
          border-r border-gray-300 dark:border-gray-700
          bg-gray-100 dark:bg-gray-900 dark:text-white p-5
          transition-transform duration-300
          lg:sticky lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="space-y-4">

          <Link
            to="dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-800 sm:my-20"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>

          <Link
            to="courses"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>

        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 w-full bg-white dark:bg-gray-950 dark:text-gray-300 p-4 md:p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default Sidebar;
