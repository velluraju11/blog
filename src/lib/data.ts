import type { Post, Author, Category } from '@/lib/types';

const authors: Record<string, Author> = {
  'admin-01': {
    id: 'admin-01',
    name: 'Ryha Security Team',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Core security research and development team at Ryha. Specializing in offensive security and threat intelligence.',
  },
  'ai-dev': {
    id: 'ai-dev',
    name: 'Dr. Evelyn Reed',
    avatarUrl: 'https://placehold.co/100x100.png',
    bio: 'Lead AI researcher focusing on the intersection of artificial intelligence and cybersecurity warfare.',
  },
};

const categories: Record<string, Category> = {
  'cve': { id: 'cve', name: 'CVE' },
  'ai-sec': { id: 'ai-sec', name: 'AI Security' },
  'pentesting': { id: 'pentesting', name: 'Pentesting' },
  'updates': { id: 'updates', name: 'Updates' },
};

const posts: Post[] = [
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

The Ryha Security Team urges all users of Nova-Framework to **update to version 3.1.5 or later immediately**. This version includes a patch that correctly validates file MIME types and enforces stricter file permission policies.

For those unable to update immediately, a temporary workaround is to disable the file upload module in your application's configuration.

> "This is one of the most severe vulnerabilities we've seen this year. The ease of exploitation makes it a prime target for attackers," says our lead security analyst.

We will continue to monitor the situation and provide updates as they become available. Stay vigilant.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'server room',
    author: authors['admin-01'],
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

Artificial intelligence (AI) is rapidly transforming the landscape of digital conflict. From automated vulnerability discovery to sophisticated, adaptive malware, AI is becoming the weapon of choice for state-sponsored actors.

## AI-Powered Offense

Attackers are leveraging AI to:
- **Automate Phishing Campaigns:** AI can generate highly convincing, personalized phishing emails at a massive scale.
- **Develop Polymorphic Malware:** AI algorithms create malware that constantly changes its code to evade detection by traditional antivirus software.
- **Discover Zero-Day Vulnerabilities:** Large language models (LLMs) can analyze source code to find previously unknown vulnerabilities faster than human researchers.

## The Defensive Arms Race

In response, defenders are also turning to AI. Machine learning models are being trained to:
- **Detect Anomalies:** AI can monitor network traffic for unusual patterns that may indicate a breach.
- **Predict Threats:** By analyzing global threat data, AI can predict future attack vectors and methods.

The age of AI cyberwarfare is here. Preparing for this new reality is not just an option; it's a necessity for national security.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract AI',
    author: authors['ai-dev'],
    category: categories['ai-sec'],
    tags: ['AI', 'Cyberwarfare', 'Machine Learning'],
    publishedAt: '2024-07-18T14:30:00Z',
    focusKeyword: 'AI Cyberwarfare',
  },
  {
    id: '3',
    slug: 'pentesting-report-q2-2024',
    title: 'Ryha Pulse: Q2 2024 Pentesting Report',
    excerpt: 'Our latest quarterly report reveals the most common vulnerabilities discovered during our penetration testing engagements in Q2 2024.',
    content: `
# Ryha Pulse: Q2 2024 Pentesting Report

Our team conducted over 50 penetration tests in the second quarter of 2024. This report summarizes our findings and highlights the most prevalent security weaknesses across various industries.

## Top 5 Vulnerabilities

1.  **Outdated Components:** 78% of applications tested were using libraries with known critical vulnerabilities.
2.  **Insecure Deserialization:** A persistent threat, often leading to Remote Code Execution.
3.  **Cross-Site Scripting (XSS):** Still a major issue, found in 62% of web applications.
4.  **Security Misconfiguration:** Improperly configured cloud services and servers remain a common entry point.
5.  **Broken Access Control:** Flaws in authentication and authorization logic allowing privilege escalation.

### Key Takeaway

The data shows a clear trend: a lack of basic security hygiene is the root cause of most breaches. Regular patching, secure configuration, and developer training are essential.
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code security',
    author: authors['admin-01'],
    category: categories['pentesting'],
    tags: ['Pentesting', 'Security Report', 'Vulnerabilities'],
    publishedAt: '2024-07-15T09:00:00Z',
  },
];

export async function getPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts.find(post => post.slug === slug);
}
