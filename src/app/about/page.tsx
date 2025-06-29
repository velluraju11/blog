import { ShieldCheck, BrainCircuit, Zap, Users, Code, Globe, MonitorSmartphone, Bot, ScanSearch, Key, Lightbulb, Lock, Rocket, Scale, Repeat, UserCog, HeartHandshake, Server, Cloud, Brain, TestTube, Briefcase, Hospital, Building, Plane, Cog as CogIcon, Users as UsersIcon, BookOpen, Banknote, Landmark, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import React from "react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const whatRyhaBuilds = [
    { icon: <Zap />, text: "Automate repetitive and technical tasks in real time" },
    { icon: <BrainCircuit />, text: "Continuously optimize workflows without relying on user pattern learning" },
    { icon: <Lock />, text: "Embed military-grade security at every layer — by default" },
    { icon: <Server />, text: "Deliver extreme performance with an ultra-light system footprint" },
    { icon: <HeartHandshake />, text: "Fuse human creativity with machine precision" },
    { icon: <Code />, text: "Assist in coding, UI/UX, cybersecurity, DevOps, testing, and more" },
    { icon: <Globe />, text: "Serve all industries — from students to defense" },
  ];

  const coreValues = [
    { icon: <Lock />, title: "Security by Design", description: "Not an afterthought, but a foundation." },
    { icon: <BrainCircuit />, title: "AI-First Thinking", description: "Every layer is smart, from kernel to UI." },
    { icon: <UserCog />, title: "User-Driven Interfaces", description: "Designed for experience, not complexity." },
    { icon: <Rocket />, title: "Boundless Innovation", description: "No barriers. No limits." },
    { icon: <Scale />, title: "Affordable Power", description: "Elite tech made accessible." },
    { icon: <Repeat />, title: "Autonomous Evolution", description: "Self-updating and self-improving systems." },
    { icon: <Key />, title: "True Freedom", description: "No surveillance. No vendor lock-ins." },
    { icon: <Lightbulb />, title: "Real Utility", description: "Not just hype. Tangible results." },
  ];

  const whoWeServe = [
    { icon: <BookOpen />, name: "Students & Learners" },
    { icon: <Code />, name: "Developers & Cybersecurity Experts" },
    { icon: <TestTube />, name: "Researchers & Innovators" },
    { icon: <Hospital />, name: "Healthcare & Medical Platforms" },
    { icon: <Landmark />, name: "Governments & Public Systems" },
    { icon: <CogIcon />, name: "Designers, Engineers & Architects" },
    { icon: <Briefcase />, name: "Businesses, Startups & Enterprises" },
    { icon: <Banknote />, name: "Banks, Fintech & Corporate Firms" },
    { icon: <Plane />, name: "Aerospace, Defense & Military" },
  ];


  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
        
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">Ryha – The Future, Engineered for Everyone</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Ryha isn’t just a startup — it’s a visionary force reshaping the digital era through cutting-edge AI, autonomous systems, and hyper-secure architecture.
          </p>
          <blockquote className="mt-8 text-lg italic text-foreground/80 max-w-3xl mx-auto">
            “We don’t build tools. We build digital worlds where machines work for you — intelligently, securely, and forever.”
            <cite className="block not-italic mt-2 text-base text-muted-foreground">– Velluraju C, Founder of Ryha</cite>
          </blockquote>
        </section>

        <section className="text-center bg-card/50 rounded-lg p-8 md:p-12 border border-border">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Explore the Full Ecosystem</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                For a deeper dive into our revolutionary technology and to see our products in action, visit our official company website.
            </p>
            <Button asChild size="lg">
                <a href="https://ryha.tech" target="_blank" rel="noopener noreferrer">
                    Visit ryha.tech <ExternalLink />
                </a>
            </Button>
        </section>
        
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
                To engineer ultra-intelligent, self-optimizing ecosystems that eliminate complexity, remove digital stress, and make every interaction fast, secure, and human-focused.
            </p>
        </section>

        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">What Ryha Builds</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center">
                <p className="text-muted-foreground mb-6">
                Ryha creates AI-native, autonomous digital ecosystems that think, work, and evolve — like a human. They:
                </p>
                <ul className="space-y-4">
                {whatRyhaBuilds.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                        {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                    </div>
                    <span className="flex-1 text-base">{item.text}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div>
              <Image src="https://ik.imagekit.io/ps8bybjwy/Generated%20image%201%20(1).png?updatedAt=1750854478428" data-ai-hint="digital ecosystem" alt="Ryha Ecosystem" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Flagship Products</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col border-primary/20 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <MonitorSmartphone className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Ryha OS</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">The World’s Smartest Operating System</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                    <li>Voice-controlled, self-modifying, and 100% user-customizable.</li>
                    <li>10x faster than traditional OSes with zero bloatware.</li>
                    <li>Automates tasks via Ryha AI with simple voice commands.</li>
                    <li>Embedded real-time threat detection and classified security architecture.</li>
                    <li>Intelligent private cloud integration; you control your data.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-primary/20 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <Bot className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Ryha AI</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">The Infinite Agent, Reimagined</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                    <li>Infinite contextual memory and autonomous learning.</li>
                    <li>Memory and history stored securely in your private cloud.</li>
                    <li>Never collects or uses your data for training—100% secure by design.</li>
                    <li>Remains active 24/7 until every task is complete.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-primary/20 hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <ScanSearch className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Human Pentesting Agent</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">AI That Hacks Like a Human</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                    <li>Self-operating cybersecurity expert with 1000+ tools.</li>
                    <li>Simulates human penetration testing behavior with precision.</li>
                    <li>Generates full reports, screen recordings, and log histories.</li>
                    <li>Operates silently and is 100x faster than human testers.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Who We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {whoWeServe.map((sector) => (
              <div key={sector.name} className="flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                    {React.cloneElement(sector.icon, { className: 'w-7 h-7' })}
                </div>
                <span className="font-medium text-sm">{sector.name}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreValues.map((value) => (
                <div key={value.title} className="text-center p-4">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full text-primary">
                        {React.cloneElement(value.icon, { className: 'w-8 h-8' })}
                    </div>
                </div>
                <h3 className="font-headline font-semibold text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
            ))}
            </div>
        </section>
        
        <section className="bg-card/50 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">About the Founder</h2>
                <Image src="https://placehold.co/150x150.png" data-ai-hint="founder portrait" alt="Velluraju C" width={150} height={150} className="rounded-full mx-auto my-6 shadow-lg" />
                <h3 className="text-2xl font-headline font-semibold">Velluraju C</h3>
                <p className="text-primary mb-6">Solo Architect of the Ryha Revolution</p>
                <p className="text-muted-foreground mb-6">
                    I’m Velluraju C — the solo architect, student, and world’s number one hacker aspirant behind Ryha. I didn’t have a team or funding. I had a vision and the hunger to build a revolution. Everything Ryha is today was designed, developed, and optimized by me alone: line by line, system by system. No shortcuts. No compromises.
                </p>
                <blockquote className="text-lg italic text-foreground/80">
                “Ryha isn’t just a startup. It’s my rebellion—against surveillance, against complexity, against control. It’s the future I want to live in, where machines serve, not spy.”
                <cite className="block not-italic mt-2 text-base text-muted-foreground">– Velluraju C</cite>
                </blockquote>
            </div>
        </section>

      </div>
    </div>
  );
}
