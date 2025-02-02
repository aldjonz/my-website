import { useLoading } from '@/context/loadingContext';
import React, { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  baseText: string;
  wrongText?: string;
  correctText?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({ baseText, wrongText, correctText }) => {
  const { isLoading } = useLoading();
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing-wrong' | 'deleting' | 'typing-correct' | 'complete'>('typing-wrong');
  const [cursorVisible, setCursorVisible] = useState(true);
  const currentIndex = useRef(0);

  useEffect(() => {
    
    const animate = () => {
      if (phase === 'complete') return;
      if (!correctText || !wrongText) {
        setDisplayText(baseText.slice(0, currentIndex.current + 1));
        currentIndex.current++;
        setTimeout(animate, 200);
        return;
      };
      if (phase === 'typing-wrong') {
        if (currentIndex.current < (baseText?.length + wrongText?.length) + 1) {
          setDisplayText((`${baseText} ${wrongText}`).slice(0, currentIndex.current + 1));
          currentIndex.current++;
          setTimeout(animate, 200);
        } else {
          setTimeout(() => {
            setPhase('deleting');
            currentIndex.current = baseText.length + wrongText.length;
          }, 1000);
        }
      } else if (phase === 'deleting') {
        if (currentIndex.current > baseText.length) {
          setDisplayText((`${baseText} ${wrongText}`).slice(0, currentIndex.current - 1));
          currentIndex.current--;
          setTimeout(animate, 100);
        } else {
          setTimeout(() => {
            setPhase('typing-correct');
            currentIndex.current = baseText.length;
          }, 600);
        }
      } else if (phase === 'typing-correct') {
        if (currentIndex.current < (baseText.length + correctText.length) + 1) {
          setDisplayText((`${baseText} ${correctText}`).slice(0, currentIndex.current + 1));
          currentIndex.current++;
          setTimeout(animate, 200);
        } else {
          setPhase('complete');
        }
      }
    };
    if (!correctText || !wrongText) {
      setTimeout(animate, 6000);
    } else if (displayText.length === 0) { 
      setTimeout(animate, 3000);
    } else {
      setTimeout(animate, 1000);
    }
    
  }, [baseText, wrongText, correctText, phase, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 700);

    return () => clearInterval(interval);
  }, []);


  const minWidth = baseText && wrongText && correctText ? `${Math.max(
      baseText.length + wrongText.length,
      baseText.length + correctText.length
    )}ch` : baseText.length;

  return (
    <p style={{ minWidth }}>
      {displayText}
      <span style={{ color: 'white', opacity: cursorVisible ? 1 : 0 }}>|</span>
    </p>
  );
};

export default TextScramble; 