import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LayoutDashboardIcon,
  LogIn,
  LogOut,
  Menu,
  Moon,
  School,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { DarkMode } from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Label } from "./label";
import { Input } from "./input";
import { Separator } from "@base-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authapi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await logoutUser().unwrap();
      toast.success(response.message || "Logged Out");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged Out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 text-black dark:text-white">
      {/*for destop */}
      {/* Desktop Navbar */}
      <div className="mx-auto hidden h-full max-w-7xl items-center justify-between px-6 md:flex">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <School size={25} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <Link to="/">E-Learning</Link>

            <span className="text-blue-600 dark:text-blue-400">.</span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-1.5 pr-3 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback className="bg-blue-100 font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                        CN
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      My Account
                    </span>

                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                }
              />

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-[#111827] dark:text-gray-100"
              >
                {/* Profile Header */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-3 font-normal">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          My Account
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Manage your account
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link to="profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  {user.role === "instructor" ? (
                    <DropdownMenuItem>
                      <Link to="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    ""
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-lg border-gray-300 bg-white px-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
              >
                <Link to="login">Login</Link>
              </Button>
            </div>
          )}

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

          <DarkMode />
        </div>
      </div>
      {/*for mobile */}
      <MobileNavbar />
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await logoutUser().unwrap();
      toast.success(response.message || "Logged Out");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Failed");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged Out");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="flex md:hidden items-center justify-between h-full px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <School size={28} />
        <h1 className="font-extrabold text-xl">
          <Link to="/">E-Learning</Link>
        </h1>
      </div>

      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger
          render={
            <Button size="icon" variant="outline" className="rounded-full">
              <Menu size={20} />
            </Button>
          }
        />
        {user ? (
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] flex flex-col p-0
          bg-white text-black dark:bg-[#0A0A0A] dark:text-white
          border-l border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <SheetHeader className="p-6 pb-4 text-left">
              <div className="flex items-center gap-3">
                <School size={28} />
                <SheetTitle className="text-xl font-bold text-black dark:text-white">
                  <Link to="/">E-Learning</Link>
                </SheetTitle>
              </div>
              <SheetDescription className="text-gray-500 dark:text-gray-400">
                Your learning space, all in one place.
              </SheetDescription>
            </SheetHeader>

            <Separator className="bg-gray-200 dark:bg-gray-800" />

            {/* Profile */}
            <div className="flex items-center gap-3 p-5">
              <Avatar className="h-11 w-11">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-800" />

            {/* Navigation */}
            <nav className="flex flex-col gap-2 p-4 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 mb-2">
                Menu
              </p>

              <SheetClose
                render={
                  <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <BookOpen size={19} />
                    <Link to="my-learning">My Learning</Link>
                  </button>
                }
              />

              <SheetClose
                render={
                  <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <LayoutDashboardIcon size={19}/>
                    <Link to="admin">Dashboard</Link>
                  </button>
                }
              />

              <SheetClose
                render={
                  <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <User size={19} />
                    <Link to="profile">Profile</Link>
                  </button>
                }
              />

              <SheetClose
                render={
                  <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Settings size={19} />
                    Settings
                  </button>
                }
              />

              <Separator className="my-3 bg-gray-200 dark:bg-gray-800" />

              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-3">
                  <Moon size={19} />
                  <span>Appearance</span>
                </div>
                <DarkMode />
              </div>
            </nav>

            {/* Footer */}
            <SheetFooter className="border-t border-gray-200 dark:border-gray-800 p-4 mt-auto">
              <SheetClose
                render={
                  <Button
                    variant="outline"
                    onClick={logoutHandler}
                    className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950"
                  >
                    <LogOut size={18} />
                    Log Out
                  </Button>
                }
              />
            </SheetFooter>
          </SheetContent>
        ) : (
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] flex flex-col p-0
          bg-white text-black dark:bg-[#0A0A0A] dark:text-white
          border-l border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <SheetHeader className="p-6 pb-4 text-left">
              <div className="flex items-center gap-3">
                <School size={28} />
                <SheetTitle className="text-xl font-bold text-black dark:text-white">
                  <Link to="/">E-Learning</Link>
                </SheetTitle>
              </div>
              <SheetDescription className="text-gray-500 dark:text-gray-400">
                Your learning space, all in one place.
              </SheetDescription>
            </SheetHeader>

            <Separator className="bg-gray-200 dark:bg-gray-800" />

            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-3">
                <Moon size={19} />
                <span>Appearance</span>
              </div>
              <DarkMode />
            </div>
            <SheetClose
              render={
                <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <LogIn size={18} />
                  <Link to="login">Login</Link>
                </button>
              }
            />
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};
