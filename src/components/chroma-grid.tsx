
"use client";

import React from "react";
import "./chroma-grid.css";

interface ChromaGridItem {
  image: string;
  title: string;
  subtitle: string;
  bio: string;
  handle?: string;
  borderColor?: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  className?: string;
  columns?: number;
  rows?: number;
}

export const ChromaGrid = ({
  items,
  className = "",
  columns = 3,
  rows = 2,
}: ChromaGridProps) => {

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      className={`chroma-grid ${className}`}
      style={
        {
          "--cols": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
    >
      {items.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          style={
            {
              "--card-border": c.borderColor || "transparent",
            } as React.CSSProperties
          }
        >
          <img src={c.image} alt={c.title} loading="lazy" className="chroma-card-image" />
          <div className="chroma-card-content">
              <div className="chroma-card-header">
                  <h3 className="name">{c.title}</h3>
                  <p className="role">{c.subtitle}</p>
              </div>
              <div className="chroma-card-bio">
                  <p>{c.bio}</p>
              </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
