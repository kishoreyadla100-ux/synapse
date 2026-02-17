"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, Zap, Cloud, Github, Linkedin, 
  Twitter, ExternalLink, ArrowUpRight, Globe 
} from 'lucide-react';
import './globals.css';

export default function SynapseDashboard() {
  // 1. SETTINGS - CHANGE THESE TO YOUR PROFILES
  const GITHUB_USERNAME = "your-username"; 
  const LINKEDIN_URL = "https://linkedin.com/in/your-username";
  const TWITTER_URL = "https://x.com/your-username";

  // 2. STATE
  const [time, setTime] = useState(new Date());
  const [repoCount, setRepoCount] = useState<string | number>("...");

  // 3. LOGIC: TICKING CLOCK
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 4. LOGIC: GITHUB API DATA
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        // Fallback to '0' if user not found, or show real count
        setRepoCount(data.public_repos !== undefined ? data.public_repos : "!");
      })
      .catch(() => setRepoCount("!"));
  }, [GITHUB_USERNAME]);

  return (
    <div className="dashboard-container">
      
      {/* HEADER SECTION */}
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#3b82f6', padding: '8px', borderRadius: '10px' }}>
            <Zap color="white" size={20} fill="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>SYNAPSE</h1>
            <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', margin: 0 }}>● SYSTEM ACTIVE</p>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>V1.0.4 • 2026</div>
      </header>

      {/* BENTO GRID */}
      <div className="grid-layout">
        
        {/* CLOCK CARD */}
        <div className="card card-large" style={{ textAlign: 'center' }}>
          <Clock color="#3b82f6" size={32} style={{ marginBottom: '15px' }} />
          <h2 style={{ fontSize: '64px', fontWeight: '800', fontFamily: 'monospace', margin: 0 }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px', textTransform: 'uppercase' }}>
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* WEATHER CARD */}
        <div className="card card-accent">
          <Cloud size={40} color="white" />
          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '40px', fontWeight: '800', margin: 0 }}>24°C</h3>
            <p>San Francisco, CA</p>
          </div>
        </div>

        {/* GITHUB CARD (LINKED) */}
        <a href={`https://github.com/kishoreyadla100-ux`} target="_blank" rel="noopener noreferrer" className="card link-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Github size={24} color="white" />
            <ArrowUpRight size={16} color="#475569" />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}>REPOSITORIES</p>
            <p style={{ fontSize: '28px', fontWeight: '800' }}>{repoCount}</p>
          </div>
        </a>

        {/* LINKEDIN CARD (LINKED) */}
        <a href={"https://linkedin.com/in/shakina-kishore-yadla-95b49739a"} target="_blank" rel="noopener noreferrer" className="card link-card" style={{ background: '#0077b5' }}>
          <Linkedin size={24} color="white" fill="white" />
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>LinkedIn</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Professional Network</p>
          </div>
        </a>

        {/* TWITTER CARD (LINKED) */}
        <a href={"https://twitter.com/kishore_ya48147"} target="_blank" rel="noopener noreferrer" className="card link-card" style={{ border: '1px solid #333' }}>
          <Twitter size={24} color="white" fill="white" />
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Twitter / X</p>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>Latest Updates</p>
          </div>
        </a>

        {/* DEPLOYMENT CARD */}
        <div className="card" style={{ gridColumn: 'span 2', background: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', height: '100%' }}>
            <Globe color="#3b82f6" size={24} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', margin: 0 }}>LIVE STATUS</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>synapse-v1.vercel.app</p>
            </div>
            <div className="pulse-dot"></div>
          </div>
        </div>

      </div>
    </div>
  );
}