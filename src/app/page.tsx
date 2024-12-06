"use client"

import styles from "./page.module.css";
import dynamic from "next/dynamic";
import TopographySvg from '@/components/TopographySvg/TopographySvg'


const Portfolio = dynamic(
  () => import('@/components/Portfolio/index'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

export default function Home() {
  return (
    <div>
      <TopographySvg />
      <Portfolio />
    </div>
  );
}
