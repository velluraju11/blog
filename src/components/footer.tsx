import Link from "next/link";
import { ShieldCheck, Linkedin, Instagram, Youtube } from "lucide-react";
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
             A visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/crew" className="hover:text-primary transition-colors">Crew Members</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Join the Revolution</h4>
            <p className="text-sm mb-4">Get the latest dispatches from the front lines of tech.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ryha. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="https://www.youtube.com/@RyhaOfficial" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></Link>
            <Link href="https://instagram.com/vellu.raju" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="https://linkedin.com/in/velluraju" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
