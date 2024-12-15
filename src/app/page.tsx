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
    </div>
  );
}
