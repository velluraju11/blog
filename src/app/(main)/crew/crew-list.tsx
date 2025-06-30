"use client";

import type { CrewMember } from '@/lib/types';
import ChromaGrid from '@/components/chroma-grid';
import { useMemo } from 'react';

interface CrewListProps {
  crewMembers: CrewMember[];
}

const colors = [
  { borderColor: "hsl(var(--primary))", gradient: "linear-gradient(145deg, hsl(var(--primary) / 0.5), hsl(var(--background)))" },
  { borderColor: "hsl(var(--accent))", gradient: "linear-gradient(180deg, hsl(var(--accent) / 0.5), hsl(var(--background)))" },
  { borderColor: "#10B981", gradient: "linear-gradient(210deg, #10B981, hsl(var(--background)))" },
  { borderColor: "#F59E0B", gradient: "linear-gradient(165deg, #F59E0B, hsl(var(--background)))" },
  { borderColor: "#EF4444", gradient: "linear-gradient(195deg, #EF4444, hsl(var(--background)))" },
  { borderColor: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, hsl(var(--background)))" },
];

export default function CrewList({ crewMembers }: CrewListProps) {
  const items = useMemo(() => crewMembers.map((member, index) => ({
    image: member.imageUrl,
    title: member.name,
    subtitle: member.role,
    handle: `@${member.name.toLowerCase().replace(/\s/g, '')}`,
    ...colors[index % colors.length],
  })), [crewMembers]);

  const numColumns = useMemo(() => {
    if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1124) return 2;
    }
    return Math.min(items.length, 3);
  }, [items.length]);

  const numRows = useMemo(() => Math.ceil(items.length / numColumns), [items.length, numColumns]);

  return (
    <section>
        <ChromaGrid 
            items={items}
            radius={350}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            columns={numColumns > 0 ? numColumns : 1}
            rows={numRows > 0 ? numRows : 1}
        />
    </section>
  );
}
