import type { Post, Author, Category } from '@/lib/types';

const authors: Record<string, Author> = {
  'velluraju-c': {
    id: 'velluraju-c',
    name: 'Velluraju C',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Solo architect of the Ryha revolution. Student, hacker, and builder of the future.',
  },
  'ryha-team': {
    id: 'ryha-team',
    name: 'Ryha Security',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'The security and engineering division at Ryha, focused on hyper-secure systems.',
  },
};

const categories: Record<string, Category> = {
  'cve': { id: 'cve', name: 'CVE' },
  'ai': { id: 'ai', name: 'AI' },
  'pentesting': { id: 'pentesting', name: 'Pentesting' },
  'updates': { id: 'updates', name: 'Updates' },
  'cyberwarfare': { id: 'cyberwarfare', name: 'Cyberwarfare' },
  'manifesto': { id: 'manifesto', name: 'Manifesto' },
};

const posts: Post[] = [
  {
    id: '4',
    slug: 'a-declaration-of-digital-independence',
    title: 'Why We Built Ryha: A Declaration of Digital Independence',
    excerpt: 'Ryha isn’t a startup. It’s a rebellion—against surveillance, against complexity, against control. It’s the future I want to live in.',
    content: `
# A Declaration of Digital Independence

They told me it was impossible.

A single person couldn't build an operating system, a next-gen AI, and an autonomous security platform from scratch. You need hundreds of engineers, millions in funding, and years of development.

They were wrong.

Ryha is my answer. It's a testament to the power of a singular vision fueled by raw determination. I didn't have a team. I didn't have funding. But I had a mission: to build a world where technology serves humans, not the other way around.

## The Problem with Modern Tech

Today's digital world is broken. It's built on a foundation of surveillance capitalism. Your data is the product. Your privacy is an illusion. You are tracked, analyzed, and manipulated by algorithms designed to keep you engaged, not empowered. Bloated operating systems, intrusive cloud services, and AI models that learn from your private conversations are the status quo.

This is not the future we were promised.

## The Ryha Philosophy: A Digital Rebellion

Ryha is a rebellion against this system. It's built on a few core principles:

1.  **You Own Your Data. Period.** Ryha OS and Ryha AI are designed to use your private cloud (like Google Drive) as a secure vault that only you can access. We never see your data, we never use it for training, and we never will.
2.  **Security is Not a Feature.** It's the foundation. Every layer of Ryha, from the kernel to the UI, is engineered with a zero-trust, hyper-secure architecture.
3.  **Performance Through Purity.** No bloatware. No background trackers. No unnecessary processes. Just pure, unadulterated speed and efficiency. Ryha OS is 10x faster because it does only what you tell it to do.
4.  **AI as a Tool, Not a Master.** Ryha AI is an extension of your will. It has infinite context and stays active until your task is done. It's a tireless, intelligent agent that works for you, not on you.

This isn't just about building better software. It's about restoring digital sovereignty. It's about creating tools that feel like magic you own, not chains that bind you.

This is just the beginning. Welcome to the revolution.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'lone developer code',
    author: authors['velluraju-c'],
    category: categories['manifesto'],
    tags: ['Manifesto', 'Privacy', 'Ryha OS', 'AI'],
    publishedAt: '2024-07-22T09:00:00Z',
  },
  {
    id: '1',
    slug: 'critical-vulnerability-in-nova-framework',
    title: 'Critical RCE Vulnerability in Nova-Framework (CVE-2024-12345)',
    excerpt: 'A critical remote code execution vulnerability has been discovered in the popular Nova-Framework. All users are urged to update immediately.',
    content: `
# Critical RCE Vulnerability in Nova-Framework (CVE-2024-12345)

A critical remote code execution (RCE) vulnerability, identified as CVE-2024-12345, has been discovered in the popular Nova-Framework. This vulnerability affects all versions prior to 3.1.5 and allows an unauthenticated attacker to execute arbitrary code on the server.

## Technical Details

The vulnerability exists in the file upload module, where improper validation of file types allows an attacker to upload a malicious script disguised as an image. Once uploaded, the script can be executed by accessing its direct URL.

### Example Payload

A simple proof-of-concept involves uploading a PHP file with a \`.jpg\` extension:

\`\`\`php
<?php
  // Malicious code here
  system($_GET['cmd']);
?>
\`\`\`

## Mitigation

The Ryha Security team urges all users of Nova-Framework to **update to version 3.1.5 or later immediately**. This version includes a patch that correctly validates file MIME types and enforces stricter file permission policies.

For those unable to update immediately, a temporary workaround is to disable the file upload module in your application's configuration.

> "Security is the bedrock of digital trust. Vulnerabilities like this are a stark reminder of why our autonomous, AI-driven security approach is critical for the future. We don't just patch problems; we build systems where they can't exist." – Velluraju C, Founder

We will continue to monitor the situation and provide updates as they become available. Stay vigilant.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'server room',
    author: authors['ryha-team'],
    category: categories['cve'],
    tags: ['RCE', 'Vulnerability', 'Nova-Framework'],
    publishedAt: '2024-07-20T10:00:00Z',
    focusKeyword: 'Nova-Framework Vulnerability',
  },
  {
    id: '2',
    slug: 'the-rise-of-ai-in-cyberwarfare',
    title: 'The Rise of AI in Modern Cyberwarfare',
    excerpt: 'Artificial intelligence is no longer science fiction. It\'s the new frontier in cyber offense and defense, changing the game for nations and corporations alike.',
    content: `
# The Rise of AI in Modern Cyberwarfare

Artificial intelligence (AI) is rapidly transforming the landscape of digital conflict. From automated vulnerability discovery to sophisticated, adaptive malware, AI is becoming the weapon of choice for state-sponsored actors and the ultimate shield for defenders.

## AI-Powered Offense

Attackers are leveraging AI to:
- **Automate Phishing Campaigns:** AI can generate highly convincing, personalized phishing emails at a massive scale.
- **Develop Polymorphic Malware:** AI algorithms create malware that constantly changes its code to evade detection by traditional antivirus software.
- **Discover Zero-Day Vulnerabilities:** Large language models (LLMs) can analyze source code to find previously unknown vulnerabilities faster than human researchers.

## The Defensive Arms Race

In response, defenders are also turning to AI. This is where Ryha's philosophy shines. Our systems are built to:
- **Detect Anomalies in Real-Time:** Ryha OS's integrated AI monitors every process, flagging deviations from normal behavior instantly.
- **Predict and Neutralize Threats:** By analyzing global threat data, Ryha's AI can predict future attack vectors and proactively harden the system.
- **Automate Penetration Testing:** The Ryha Human Pentesting Agent continuously probes for weaknesses, thinking like a human hacker but operating at machine speed.

The age of AI cyberwarfare is here. Preparing for this new reality is not just an option; it's a necessity for national security.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract AI',
    author: authors['velluraju-c'],
    category: categories['ai'],
    tags: ['AI', 'Cyberwarfare', 'Machine Learning'],
    publishedAt: '2024-07-18T14:30:00Z',
    focusKeyword: 'AI Cyberwarfare',
  },
  {
    id: '3',
    slug: 'pentesting-report-q2-2024',
    title: 'Ryha Security: Q2 2024 Pentesting Report',
    excerpt: 'Our latest quarterly report reveals the most common vulnerabilities discovered during our penetration testing engagements in Q2 2024.',
    content: `
# Ryha Security: Q2 2024 Pentesting Report

Our Human Pentesting Agent, alongside our security team, conducted over 50 penetration tests in the second quarter of 2024. This report summarizes our findings and highlights the most prevalent security weaknesses across various industries.

## Top 5 Vulnerabilities

1.  **Outdated Components:** 78% of applications tested were using libraries with known critical vulnerabilities. This remains the number one attack vector.
2.  **Insecure Deserialization:** A persistent threat, often leading to Remote Code Execution, discovered in 45% of tested applications.
3.  **Cross-Site Scripting (XSS):** Still a major issue, found in 62% of web applications, allowing attackers to inject malicious scripts.
4.  **Security Misconfiguration:** Improperly configured cloud services, exposed databases, and default credentials remain a common entry point.
5.  **Broken Access Control:** Flaws in authentication and authorization logic allowing unauthorized users to access sensitive data and functionality.

### Key Takeaway

The data shows a clear and worrying trend: a lack of basic security hygiene is the root cause of most breaches. While sophisticated attacks grab headlines, it's the simple, unpatched vulnerabilities that provide the easiest path for attackers. Continuous, automated security analysis, like that provided by the Ryha ecosystem, is no longer optional.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code security',
    author: authors['ryha-team'],
    category: categories['pentesting'],
    tags: ['Pentesting', 'Security Report', 'Vulnerabilities'],
    publishedAt: '2024-07-15T09:00:00Z',
    focusKeyword: 'Pentesting Report',
  },
];

export async function getPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts.find(post => post.slug === slug);
}
