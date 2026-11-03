import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

import { useTheme } from "./components/ui/theme-provider";

export function DarkMode() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md
            border border-gray-200 bg-white text-gray-800
            hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900
            dark:text-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </button>
        }
      />

      <DropdownMenuContent
        align="end"
        className="z-50 min-w-36 rounded-lg border border-gray-200
        bg-white p-1 text-gray-900 shadow-xl
        dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer rounded-md px-3 py-2 outline-none
          hover:bg-gray-100 focus:bg-gray-100
          dark:hover:bg-gray-800 dark:focus:bg-gray-800"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer rounded-md px-3 py-2 outline-none
          hover:bg-gray-100 focus:bg-gray-100
          dark:hover:bg-gray-800 dark:focus:bg-gray-800"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-md px-3 py-2 outline-none
          hover:bg-gray-100 focus:bg-gray-100
          dark:hover:bg-gray-800 dark:focus:bg-gray-800"
        >
          <span className="mr-2 text-sm">◐</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
