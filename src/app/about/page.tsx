import { ShieldCheck, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About Ryha Pulse</h1>
          <p className="text-xl text-muted-foreground">
            The intersection of technology, security, and intelligence. We are the architects of a safer digital future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-20 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
            </div>
            <h2 className="text-2xl font-headline font-semibold mb-2">Who We Are</h2>
            <p className="text-muted-foreground">
              Ryha Pulse is the public-facing intelligence arm of Ryha, a leader in offensive security and cyber defense solutions. Our team comprises elite security researchers, ethical hackers, and AI specialists.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <Target className="w-10 h-10 text-primary" />
                </div>
            </div>
            <h2 className="text-2xl font-headline font-semibold mb-2">Our Mission</h2>
            <p className="text-muted-foreground">
              To demystify complex security threats and provide actionable intelligence to the public. We believe in transparency and education as the first line of defense in the evolving landscape of cyber warfare.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <Users className="w-10 h-10 text-primary" />
                </div>
            </div>
            <h2 className="text-2xl font-headline font-semibold mb-2">Our Vision</h2>
            <p className="text-muted-foreground">
              A digitally-aware community resilient to threats. Through Ryha Pulse, we aim to share our expertise, report on critical vulnerabilities, and explore the future of technology and its security implications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
