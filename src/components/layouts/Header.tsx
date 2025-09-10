'use client';

import { HeaderNavigations } from '@/navigations/header_navigations';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiSearch } from 'react-icons/hi';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';


const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const renderNavLinks = () =>
    HeaderNavigations.map((nav, index) => {
      const isActive = pathname === nav.href;
      return (
        <Link
          key={index}
          href={nav.href}
          className={`nav-link ${isActive ? 'active-link' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          {nav.name}
        </Link>
      );
    });

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm h-[80px] flex items-center">
      <div className="body-content flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo/Logo.png"
            height={50}
            width={400}
            alt="Intellect Chip Logo"
            className="w-[200px] aspect-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {renderNavLinks()}
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="text-2xl text-primary-foreground hover:text-primary transition"
          >
            <HiSearch />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Search Icon for mobile */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="text-2xl text-primary-foreground hover:text-primary transition"
          >
            <HiSearch />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-2xl text-primary-foreground"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-[60px] left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 gap-6 md:hidden z-40">
            {renderNavLinks()}
          </div>
        )}

        {/* Search Popup */}
        {searchOpen && (
          <div className="fixed inset-0 bg-white/40 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <HiSearch className="text-xl text-primary" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="ml-2 text-lg text-gray-500 hover:text-red-500"
                >
                  <HiX />
                </button>
              </div>
              {/* You can add search results here */}
              <div className="text-sm text-gray-400">Type to search...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
