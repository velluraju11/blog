"use client";

import type { CrewMember } from '@/lib/types';
import ChromaGrid from '@/components/chroma-grid';
import { useMemo, useState, useEffect } from 'react';

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
    bio: member.bio,
    handle: `@${member.name.toLowerCase().replace(/\s/g, '')}`,
    ...colors[index % colors.length],
  })), [crewMembers]);

  // Use a state for the number of columns, default to a server-safe value.
  const [numColumns, setNumColumns] = useState(3); 

  useEffect(() => {
    // This effect runs only on the client side after the component mounts.
    const handleResize = () => {
      let cols = 3;
      if (window.innerWidth < 768) {
        cols = 1;
      } else if (window.innerWidth < 1124) {
        cols = 2;
      }
      setNumColumns(Math.min(items.length, cols) || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items.length]);

  const numRows = useMemo(() => Math.ceil(items.length / numColumns) || 1, [items.length, numColumns]);

  return (
    <section>
        <ChromaGrid 
            items={items}
            radius={350}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            columns={numColumns}
            rows={numRows}
        />
    </section>
  );
}
