import React, { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [complete, setComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    let currentIndex = 0;
    
    const animate = () => {
      if (complete) return;

      if (currentIndex < text.length) {
        let time = 200;
        if (currentIndex === 22) {
            time = 2800;
        }   
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(animate, time);
      } else {
        setComplete(true);
      }
    };

    setDisplayText('');
    setComplete(false);
    currentIndex = 0;
    setTimeout(animate, 4000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
     style={{ 
      minWidth: `${text.length}ch`,
    }}>
      {displayText}
      <span style={{ color: 'white', opacity: cursorVisible ? 1 : 0 }}>|</span>
    </p>
  );
};

export default TextScramble; 