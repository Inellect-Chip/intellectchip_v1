'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10 mt-16">
      <div className="body max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo / Site Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Intellect Chip</h2>
          <p className="text-sm text-white/80">
            Empowering the future through intelligent content. Learn. Build. Lead.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/trendings" className="hover:underline">Trendings</Link></li>
            <li><Link href="/hotDeals" className="hover:underline">Hot Content</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
          </ul>
        </div>

        {/* Social or Newsletter Placeholder */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm text-white/80 mb-3">Subscribe to our newsletter or follow us on socials.</p>
          {/* Placeholder for future inputs or icons */}
          <div className="flex space-x-3">
            <span className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">F</span>
            <span className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">X</span>
            <span className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">I</span>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/60 px-4">
        © {new Date().getFullYear()} Intellect Chip. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
