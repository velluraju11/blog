"use client";

import React from "react";
import "./chroma-grid.css";

interface ChromaGridItem {
  image: string;
  title: string;
  subtitle: string;
  bio: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  className?: string;
  columns?: number;
}

export const ChromaGrid = ({
  items,
  className = "",
  columns = 3,
}: ChromaGridProps) => {

  return (
    <div
      className={`chroma-grid ${className}`}
      style={
        {
          "--cols": columns,
        } as React.CSSProperties
      }
    >
      {items.map((c, i) => (
        <article key={i} className="chroma-card">
          <img src={c.image} alt={c.title} loading="lazy" className="chroma-card-image" />
          <div className="chroma-card-overlay" />
          <div className="chroma-card-content">
            <header className="chroma-card-header">
              <h3 className="name">{c.title}</h3>
              <p className="role">{c.subtitle}</p>
            </header>
            <p className="chroma-card-bio">{c.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
