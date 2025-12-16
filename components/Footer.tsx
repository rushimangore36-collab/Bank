import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-[#0B1C2D]">
              Bank<span className="text-[#2563EB]">X</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-sm">
              A modern digital banking platform built for speed, security, and
              simplicity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <Link
              href="#"
              className="text-gray-600 hover:text-[#2563EB] transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-[#2563EB] transition"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-[#2563EB] transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 flex justify-between flex-wrap gap-4">
          <span>© {new Date().getFullYear()} BankX. All rights reserved.</span>
          <span>Built for portfolio purposes only</span>
        </div>
      </div>
    </footer>
  );
}
