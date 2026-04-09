import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#070B1F] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-16 pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">

          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} PT. JAYA RIZKY ALEXANDRA. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-slate-400 hover:text-blue-400 transition"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-blue-400 transition"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-blue-400 transition"
            >
              Cookies
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
