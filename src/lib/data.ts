import type { Post, Author, Category } from '@/lib/types';

const authors: Record<string, Author> = {
  'velluraju': {
    id: 'velluraju',
    name: 'Velluraju',
    avatarUrl: 'https://ik.imagekit.io/ps8bybjwy/Screenshot%202025-06-11%20101654.png?updatedAt=1750819846177',
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
<h1>A Declaration of Digital Independence</h1>
<p>They told me it was impossible.</p>
<p>A single person couldn't build an operating system, a next-gen AI, and an autonomous security platform from scratch. You need hundreds of engineers, millions in funding, and years of development.</p>
<p>They were wrong.</p>
<p>Ryha is my answer. It's a testament to the power of a singular vision fueled by raw determination. I didn't have a team. I didn't have funding. But I had a mission: to build a world where technology serves humans, not the other way around.</p>
<h2>The Problem with Modern Tech</h2>
<p>Today's digital world is broken. It's built on a foundation of surveillance capitalism. Your data is the product. Your privacy is an illusion. You are tracked, analyzed, and manipulated by algorithms designed to keep you engaged, not empowered. Bloated operating systems, intrusive cloud services, and AI models that learn from your private conversations are the status quo.</p>
<p>This is not the future we were promised.</p>
<h2>The Ryha Philosophy: A Digital Rebellion</h2>
<p>Ryha is a rebellion against this system. It's built on a few core principles:</p>
<ol>
  <li><p><strong>You Own Your Data. Period.</strong> Ryha OS and Ryha AI are designed to use your private cloud (like Google Drive) as a secure vault that only you can access. We never see your data, we never use it for training, and we never will.</p></li>
  <li><p><strong>Security is Not a Feature.</strong> It's the foundation. Every layer of Ryha, from the kernel to the UI, is engineered with a zero-trust, hyper-secure architecture.</p></li>
  <li><p><strong>Performance Through Purity.</strong> No bloatware. No background trackers. No unnecessary processes. Just pure, unadulterated speed and efficiency. Ryha OS is 10x faster because it does only what you tell it to do.</p></li>
  <li><p><strong>AI as a Tool, Not a Master.</strong> Ryha AI is an extension of your will. It has infinite context and stays active until your task is done. It's a tireless, intelligent agent that works for you, not on you.</p></li>
</ol>
<p>This isn't just about building better software. It's about restoring digital sovereignty. It's about creating tools that feel like magic you own, not chains that bind you.</p>
<p>This is just the beginning. Welcome to the revolution.</p>
    `,
    imageUrl: 'https://ik.imagekit.io/ps8bybjwy/Screenshot%202025-06-11%20101654.png?updatedAt=1750819846177',
    imageHint: 'lone developer code',
    author: authors['velluraju'],
    category: categories['manifesto'],
    tags: ['Manifesto', 'Privacy', 'Ryha OS', 'AI'],
    publishedAt: '2024-07-22T09:00:00Z',
    status: 'published',
    isFeatured: true,
    featuredOrder: 1,
    views: 12456,
    ratings: { '😠': 5, '😕': 10, '🤔': 50, '😊': 300, '😍': 150 },
  },
  {
    id: '1',
    slug: 'critical-vulnerability-in-nova-framework',
    title: 'Critical RCE Vulnerability in Nova-Framework (CVE-2024-12345)',
    excerpt: 'A critical remote code execution vulnerability has been discovered in the popular Nova-Framework. All users are urged to update immediately.',
    content: `
<h1>Critical RCE Vulnerability in Nova-Framework (CVE-2024-12345)</h1>
<p>A critical remote code execution (RCE) vulnerability, identified as CVE-2024-12345, has been discovered in the popular Nova-Framework. This vulnerability affects all versions prior to 3.1.5 and allows an unauthenticated attacker to execute arbitrary code on the server.</p>
<h3>Technical Details</h3>
<p>The vulnerability exists in the file upload module, where improper validation of file types allows an attacker to upload a malicious script disguised as an image. Once uploaded, the script can be executed by accessing its direct URL.</p>
<h3>Example Payload</h3>
<pre><code class="language-php">&lt;?php
  // Malicious code here
  system($_GET['cmd']);
?&gt;
</code></pre>
<h2>Mitigation</h2>
<p>The Ryha Security team urges all users of Nova-Framework to <strong>update to version 3.1.5 or later immediately</strong>. This version includes a patch that correctly validates file MIME types and enforces stricter file permission policies.</p>
<p>For those unable to update immediately, a temporary workaround is to disable the file upload module in your application's configuration.</p>
<blockquote><p>"Security is the bedrock of digital trust. Vulnerabilities like this are a stark reminder of why our autonomous, AI-driven security approach is critical for the future. We don't just patch problems; we build systems where they can't exist." – Velluraju, Founder</p></blockquote>
<p>We will continue to monitor the situation and provide updates as they become available. Stay vigilant.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'server room',
    author: authors['ryha-team'],
    category: categories['cve'],
    tags: ['RCE', 'Vulnerability', 'Nova-Framework'],
    publishedAt: '2024-07-20T10:00:00Z',
    status: 'published',
    focusKeyword: 'Nova-Framework Vulnerability',
    isFeatured: true,
    featuredOrder: 3,
    views: 8765,
    ratings: { '😠': 15, '😕': 30, '🤔': 120, '😊': 250, '😍': 90 },
  },
  {
    id: '2',
    slug: 'the-rise-of-ai-in-cyberwarfare',
    title: 'The Rise of AI in Modern Cyberwarfare',
    excerpt: 'Artificial intelligence is no longer science fiction. It\'s the new frontier in cyber offense and defense, changing the game for nations and corporations alike.',
    content: `
<h1>The Rise of AI in Modern Cyberwarfare</h1>
<p>Artificial intelligence (AI) is rapidly transforming the landscape of digital conflict. From automated vulnerability discovery to sophisticated, adaptive malware, AI is becoming the weapon of choice for state-sponsored actors and the ultimate shield for defenders.</p>
<h2>AI-Powered Offense</h2>
<p>Attackers are leveraging AI to:</p>
<ul>
  <li><p><strong>Automate Phishing Campaigns:</strong> AI can generate highly convincing, personalized phishing emails at a massive scale.</p></li>
  <li><p><strong>Develop Polymorphic Malware:</strong> AI algorithms create malware that constantly changes its code to evade detection by traditional antivirus software.</p></li>
  <li><p><strong>Discover Zero-Day Vulnerabilities:</strong> Large language models (LLMs) can analyze source code to find previously unknown vulnerabilities faster than human researchers.</p></li>
</ul>
<h2>The Defensive Arms Race</h2>
<p>In response, defenders are also turning to AI. This is where Ryha's philosophy shines. Our systems are built to:</p>
<ul>
  <li><p><strong>Detect Anomalies in Real-Time:</strong> Ryha OS's integrated AI monitors every process, flagging deviations from normal behavior instantly.</p></li>
  <li><p><strong>Predict and Neutralize Threats:</strong> By analyzing global threat data, Ryha's AI can predict future attack vectors and proactively harden the system.</p></li>
  <li><p><strong>Automate Penetration Testing:</strong> The Ryha Human Pentesting Agent continuously probes for weaknesses, thinking like a human hacker but operating at machine speed.</p></li>
</ul>
<p>The age of AI cyberwarfare is here. Preparing for this new reality is not just an option; it's a necessity for national security.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract AI',
    author: authors['velluraju'],
    category: categories['ai'],
    tags: ['AI', 'Cyberwarfare', 'Machine Learning'],
    publishedAt: '2024-07-18T14:30:00Z',
    status: 'published',
    focusKeyword: 'AI Cyberwarfare',
    isFeatured: true,
    featuredOrder: 2,
    views: 10987,
    ratings: { '😠': 8, '😕': 20, '🤔': 80, '😊': 400, '😍': 180 },
  },
  {
    id: '3',
    slug: 'pentesting-report-q2-2024',
    title: 'Ryha Security: Q2 2024 Pentesting Report',
    excerpt: 'Our latest quarterly report reveals the most common vulnerabilities discovered during our penetration testing engagements in Q2 2024.',
    content: `
<h1>Ryha Security: Q2 2024 Pentesting Report</h1>
<p>Our Human Pentesting Agent, alongside our security team, conducted over 50 penetration tests in the second quarter of 2024. This report summarizes our findings and highlights the most prevalent security weaknesses across various industries.</p>
<h2>Top 5 Vulnerabilities</h2>
<ol>
  <li><p><strong>Outdated Components:</strong> 78% of applications tested were using libraries with known critical vulnerabilities. This remains the number one attack vector.</p></li>
  <li><p><strong>Insecure Deserialization:</strong> A persistent threat, often leading to Remote Code Execution, discovered in 45% of tested applications.</p></li>
  <li><p><strong>Cross-Site Scripting (XSS):</strong> Still a major issue, found in 62% of web applications, allowing attackers to inject malicious scripts.</p></li>
  <li><p><strong>Security Misconfiguration:</strong> Improperly configured cloud services, exposed databases, and default credentials remain a common entry point.</p></li>
  <li><p><strong>Broken Access Control:</strong> Flaws in authentication and authorization logic allowing unauthorized users to access sensitive data and functionality.</p></li>
</ol>
<h3>Key Takeaway</h3>
<p>The data shows a clear and worrying trend: a lack of basic security hygiene is the root cause of most breaches. While sophisticated attacks grab headlines, it's the simple, unpatched vulnerabilities that provide the easiest path for attackers. Continuous, automated security analysis, like that provided by the Ryha ecosystem, is no longer optional.</p>
    `,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'code security',
    author: authors['ryha-team'],
    category: categories['pentesting'],
    tags: ['Pentesting', 'Security Report', 'Vulnerabilities'],
    publishedAt: '2024-07-15T09:00:00Z',
    status: 'published',
    focusKeyword: 'Pentesting Report',
    views: 7654,
    ratings: { '😠': 12, '😕': 40, '🤔': 95, '😊': 180, '😍': 70 },
  },
  {
    id: '5',
    slug: 'the-future-of-autonomous-code',
    title: 'The Future of Autonomous Code Generation',
    excerpt: 'Exploring how AI is moving beyond code assistance to fully autonomous development cycles, and what that means for the future of software.',
    content: `<h1>The Future of Autonomous Code Generation</h1><p>The world of software development is on the brink of another paradigm shift. For years, AI has served as a capable assistant, a "copilot" that suggests code snippets and completes lines. But the true revolution lies in the next step: fully autonomous code generation. This isn't just about writing code faster; it's about reimagining the entire development lifecycle.</p><h2>From Copilot to Pilot</h2><p>Imagine giving an AI a high-level goal: "Build me a secure e-commerce platform with a recommendation engine." An autonomous agent would then be able to:</p><ul><li>Design the system architecture.</li><li>Write the front-end and back-end code.</li><li>Provision the necessary cloud infrastructure.</li><li>Write and execute comprehensive tests.</li><li>Deploy the application.</li></ul><p>This is the future Ryha is building towards. Our goal is to create AI that doesn't just assist, but leads the development process, allowing human engineers to focus on high-level strategy, creativity, and problem-solving.</p>`,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ai writing code',
    author: authors['velluraju'],
    category: categories['ai'],
    tags: ['AI', 'Development', 'Future', 'Autonomous Systems'],
    publishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    status: 'scheduled',
    views: 0,
    ratings: { '😠': 0, '😕': 0, '🤔': 0, '😊': 0, '😍': 0 },
  },
];

export async function getPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // Return only published posts that are not in the future
  return posts
    .filter(post => post.status === 'published' && new Date(post.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFeaturedPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts
    .filter(post => post.isFeatured && post.status === 'published' && new Date(post.publishedAt) <= new Date())
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const post = posts.find(post => post.slug === slug);
  // For admin purposes, we return the post regardless of status.
  // Public-facing pages should add their own checks to prevent showing drafts or scheduled posts.
  return post;
}

export async function getScheduledPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts
    .filter(post => post.status === 'scheduled')
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
}

export async function getAdminPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts
    .filter(post => post.status !== 'scheduled')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Object.values(categories);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Object.values(categories).find(cat => cat.id === id);
}

export async function getAuthors(): Promise<Author[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Object.values(authors);
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Object.values(authors).find(auth => auth.id === id);
}
