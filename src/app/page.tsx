"use client"

import TopographySvg from '@/components/TopographySvg/TopographySvg'
import Contact from "@/components/Contact";
import NavCanvas from "@/components/NavCanvas";

export default function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <TopographySvg />
      <NavCanvas />
      <Contact />
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '10px 0', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Catamaran, sans-serif'}}>
        <p>©{new Date().getFullYear()} Aled Jones</p>
      </div>
    </div>
  );
}
