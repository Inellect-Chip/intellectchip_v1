'use client';

import { HeaderNavigations } from '@/navigations/header_navigations';
import Image from 'next/image';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';


const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center">
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
      </div>
    </div>
  );
};

export default Header;
