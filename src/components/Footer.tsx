
import { Twitter, Github, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import ScrollToTopButton from "./ScrollToTopButton"; 
const Footer = () => {
 const currentYear = new Date().getFullYear();

 

  return (
     <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 min-h-[420px]">
      <div className="container mx-auto px-6 grid min-h-[420px] content-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/"prefetch={false}  className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
              <span>ONEWEB<span className="text-indigo-600">SOLUTION</span></span>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
            Discover, access, and explore the web with ease. Our platform removes the hassle of searching by giving you direct access to websites across categories, all in one streamlined interface
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="mailto:contact@onewebsolution.com" 
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/50 border border-slate-800 hover:border-[#eb442c] hover:text-white transition-all text-sm font-bold group">
                <Mail size={18} className="text-[#eb442c]" />
               websonesolutions@gmail.com
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Explore */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
                Explore
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/" prefetch={false} className="hover:text-[#eb442c] transition-colors">All Categories</Link>
                </li>
                <li>
                  <Link
                   href="/category/aitools" prefetch={false} className="hover:text-[#eb442c] transition-colors">AI tools</Link>
                </li>
                <li>
                  <Link href="/category/vibecoding" prefetch={false} className="hover:text-[#eb442c] transition-colors">Vibe Coding</Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
                Company
              </h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about"prefetch={false} className="hover:text-[#eb442c] transition-colors">About Us</Link></li>
                <li><Link href="/contact" prefetch={false} className="hover:text-[#eb442c] transition-colors">Contact Us</Link></li>
                <li><Link href="/disclaimer" prefetch={false} className="hover:text-[#eb442c] transition-colors">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Social Connect */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">
                Follow Us
              </h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-[#eb442c] hover:text-[#eb442c] transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-[#eb442c] hover:text-[#eb442c] transition-all">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-medium">
            © {currentYear} OneWebSolution. Empowering the next web.
          </p>
          
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/terms" prefetch={false} className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" prefetch={false} className="hover:text-white transition-colors">Cookies</Link>
          </div>

          {/* Scroll to Top Button */}
           <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;