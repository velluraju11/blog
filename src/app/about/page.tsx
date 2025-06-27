import { ShieldCheck, BrainCircuit, Zap, Users, Code, Globe, MonitorSmartphone, Bot, ScanSearch, Key, Lightbulb, Lock, Rocket, Scale, Repeat, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import React from "react";

export default function AboutPage() {
  const whatRyhaBuilds = [
    { icon: <Zap />, text: "Automate repetitive and technical tasks in real time" },
    { icon: <BrainCircuit />, text: "Continuously optimize workflows without relying on user pattern learning" },
    { icon: <ShieldCheck />, text: "Embed military-grade security at every layer — by default" },
    { icon: <Zap />, text: "Deliver extreme performance with an ultra-light system footprint" },
    { icon: <Users />, text: "Fuse human creativity with machine precision" },
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


  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
        
        {/* Hero Section */}
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
        
        {/* Mission Section */}
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
                To engineer ultra-intelligent, self-optimizing ecosystems that eliminate complexity, remove digital stress, and make every interaction fast, secure, and human-focused.
            </p>
        </section>

        {/* What Ryha Builds Section */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">What Ryha Builds</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center">
                <p className="text-muted-foreground mb-6">
                Ryha creates AI-native, autonomous digital ecosystems that:
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
              <Image src="https://placehold.co/600x400.png" data-ai-hint="digital ecosystem" alt="Ryha Ecosystem" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Flagship Products Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Flagship Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <MonitorSmartphone className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Ryha OS</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">The World’s Smartest Operating System</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Fully integrated with Ryha AI for AI-assisted operations.</li>
                    <li>Voice-controlled, self-modifying, and 100% user-customizable.</li>
                    <li>10x faster than traditional OSes with zero bloatware.</li>
                    <li>Embedded real-time threat detection and classified security architecture.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <Bot className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Ryha AI</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">The Infinite Agent, Reimagined</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Next-gen AI with infinite contextual memory and autonomous learning.</li>
                    <li>Memory and history stored securely in your private cloud.</li>
                    <li>Never collects or uses your data for training—100% secure by design.</li>
                    <li>Remains active until every task is complete.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                    <ScanSearch className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">Human Pentesting Agent</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">AI That Hacks Like a Human</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Self-operating cybersecurity expert with 1000+ tools.</li>
                    <li>Simulates human penetration testing behavior.</li>
                    <li>Generates full reports, screen recordings, and log histories.</li>
                    <li>Operates silently and is 100x faster than human testers.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values Section */}
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
        
        {/* About the Founder Section */}
        <section className="bg-card/50 rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">About the Founder – Velluraju C</h2>
                <Image src="https://placehold.co/150x150.png" data-ai-hint="founder portrait" alt="Velluraju C" width={150} height={150} className="rounded-full mx-auto my-6 shadow-lg" />
                <p className="text-muted-foreground mb-6">
                    I’m Velluraju C — the solo architect, student, and world’s number one hacker aspirant behind Ryha. I didn’t have a team. I didn’t have funding. But I had a vision — and the hunger to build a revolution. Everything Ryha is today was designed, developed, and optimized by me alone: line by line, system by system. No shortcuts. No compromises.
                </p>
                <blockquote className="text-lg italic text-foreground/80">
                “I didn’t just want to build an OS, an AI, or a tool. I wanted to build a world — where humans and machines thrive together. And that’s what Ryha is.”
                <cite className="block not-italic mt-2 text-base text-muted-foreground">– Velluraju C</cite>
                </blockquote>
            </div>
        </section>

      </div>
    </div>
  );
}
