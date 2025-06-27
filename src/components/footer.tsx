import Link from "next/link";
import { ShieldCheck, Github, Twitter, Linkedin } from "lucide-react";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline text-foreground">Ryha</span>
            </div>
            <p className="max-w-md text-sm">
              Engineering ultra-intelligent, self-optimizing ecosystems that eliminate complexity, remove digital stress, and make every interaction fast, secure, and human-focused.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Subscribe</h4>
            <p className="text-sm mb-4">Get the latest posts delivered to your inbox.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ryha. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
