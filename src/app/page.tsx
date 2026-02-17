"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Zap, Cloud, Github } from 'lucide-react';
import './globals.css';

export default function SynapseDashboard() {
  // 1. State Definitions
  const [time, setTime] = useState(new Date());
  const [repoCount, setRepoCount] = useState<string | number>("...");

  // 2. Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. GitHub Logic (Change 'octocat' to your username)
  useEffect(() => {
    fetch(`https://api.github.com/users/octocat`)
      .then((res) => res.json())
      .then((data) => {
        setRepoCount(data.public_repos ?? 0);
      })
      .catch(() => setRepoCount("Err"));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap color="#3b82f6" fill="#3b82f6" />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>SYNAPSE</h1>
        </div>
      </header>

      <div className="grid-layout">
        {/* Clock Card */}
        <div className="card card-large">
          <Clock color="#3b82f6" size={40} style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '64px', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Weather Card */}
        <div className="card card-accent">
          <Cloud size={40} color="white" />
          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '40px', fontWeight: 'bold' }}>22°C</h3>
            <p>Clear Skies</p>
          </div>
        </div>

        {/* GitHub Card - REPOCOUNT FIXED HERE */}
        <div className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
          <Github size={24} />
          <div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>REPOS</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {repoCount}
            </p>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="card" style={{ justifyContent: 'center' }}>
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            "System optimized. Connection stable."
          </p>
        </div>
      </div>
    </div>
  );
}