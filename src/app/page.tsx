"use client"

import TopographySvg from '@/components/TopographySvg/TopographySvg'
import Contact from "@/components/Contact";
import NavCanvas from "@/components/NavCanvas";
import TopographyBg from '@/components/TopographySvg/TopographyBg';
import ConsoleMessage from '@/components/ConsoleMessage';
import LoadingScreen from '@/components/LoadingScreen';
import { useLoading } from '@/context/loadingContext';

export default function Home() {
  const { isLoading } = useLoading()
  return (
    <>
      <div style={{ position: 'relative', height: '100vh', width: '100vw', opacity: isLoading ? 0 : 1 }}>
        <TopographyBg />
        <NavCanvas />
        <Contact />
        <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '10px 0', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Catamaran, sans-serif', pointerEvents: 'none' }}>
          <p>©{new Date().getFullYear()} Aled Jones</p>
        </div>
        <ConsoleMessage />
      </div>
      <LoadingScreen />
    </>

  );
}
