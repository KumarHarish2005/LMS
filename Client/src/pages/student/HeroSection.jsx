import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    console.log("Searching for:", searchQuery);
    // Later: connect this to your course search API
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 px-4 py-16 sm:py-20 lg:py-24 text-center">

      <div className="mx-auto max-w-4xl">

        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Find the Best Courses for You
        </h1>

        <p className="mb-8 text-sm text-blue-100 sm:text-base lg:text-lg dark:text-gray-300">
          Discover, Learn and Upskill with our wide range of courses.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-950"
        >
          <Search className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

          <Input
            type="search"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
            className="h-11 flex-1 border-0 bg-transparent text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white"
          />

          <Button
            type="submit"
            className="h-11 shrink-0 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <span className="hidden sm:inline">Search</span>
            <Search className="h-4 w-4 sm:hidden" />
          </Button>
        </form>

        <Button className='mt-10 bg-white dark:bg-gray- rounded-full hpverLbg-gray-200'>Explore Courses</Button>

      </div>
    </section>
  );
};

export default HeroSection;