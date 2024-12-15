"use client"

import styles from "./page.module.css";
import dynamic from "next/dynamic";
import TopographySvg from '@/components/TopographySvg/TopographySvg'
import About from "@/components/About";
import Contact from "@/components/Contact";


const Portfolio = dynamic(
  () => import('@/components/Portfolio/index'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

const Expertise = dynamic(
  () => import('@/components/Expertise/index'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

export default function Home() {
  return (
    <div>
      <TopographySvg />
      {/* <Expertise /> */}
      {/* <Portfolio /> */}
      <About />
      <Contact />
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '10px 0', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Catamaran, sans-serif'}}>
        <p>©{new Date().getFullYear()} Aled Jones</p>
      </div>
    </div>
  );
}
