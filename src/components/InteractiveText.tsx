import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveTextProps {
  text: string;
  className?: string;
}

const creativeFonts = [
  'Fredoka One',
  'Righteous',
  'Bungee',
  'Kalam',
  'Bangers',
  'Creepster',
  'Freckle Face',
  'Griffy',
  'Lacquer',
  'Orbitron',
  'Permanent Marker',
  'Russo One',
  'Shrikhand',
  'Titan One',
  'Abril Fatface',
  'Alfa Slab One',
  'Anton',
  'Black Ops One',
  'Bowlby One',
  'Bungee Shade',
  'Fredericka the Great',
  'Goblin One',
  'Henny Penny',
  'Kavoon',
  'Luckiest Guy',
  'Modak',
  'Nosifer',
  'Pirata One',
  'Rammetto One',
  'Rubik Bubbles',
  'Rubik Glitch',
  'Sancreek',
  'Special Elite',
  'Squada One',
  'Stalinist One',
  'Ultra',
  'Unlock',
  'Yeseva One'
];

const vibrantColors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
  '#F8C471',
  '#82E0AA',
  '#F1948A',
  '#85C1E9',
  '#F9E79F',
  '#D7BDE2',
  '#A9DFBF',
  '#F9B7B7',
  '#B3E5FC',
  '#FFCC80',
  '#CE93D8',
  '#80CBC4',
  '#FFAB91',
  '#81C784',
  '#64B5F6',
  '#FFD54F',
  '#E1BEE7',
  '#A5D6A7',
  '#FFCDD2',
  '#B39DDB',
  '#FF9800',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF5722'
];

const InteractiveText: React.FC<InteractiveTextProps> = ({ text, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [letterStyles, setLetterStyles] = useState<{ [key: number]: { font: string; color: string } }>({});

  const handleLetterHover = (index: number) => {
    // Always generate new random styles on hover
    const randomFont = creativeFonts[Math.floor(Math.random() * creativeFonts.length)];
    const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    
    setLetterStyles(prev => ({
      ...prev,
      [index]: { font: randomFont, color: randomColor }
    }));
    
    setHoveredIndex(index);
  };

  const handleLetterLeave = () => {
    setHoveredIndex(null);
    // Note: We don't reset the letterStyles, so the font change persists
  };

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="creative-fonts cursor-pointer"
          style={{
            fontFamily: letterStyles[index] 
              ? letterStyles[index].font 
              : 'Oswald',
            color: letterStyles[index] 
              ? letterStyles[index].color 
              : 'inherit',
            fontWeight: letterStyles[index] ? '700' : 'inherit',
            display: 'inline-block',
            verticalAlign: 'baseline',
            lineHeight: '1'
          }}
          onMouseEnter={() => handleLetterHover(index)}
          onMouseLeave={handleLetterLeave}
          whileHover={{ 
            scale: 1.1,
            y: -2,
            transition: { type: 'spring', stiffness: 400, damping: 10 }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default InteractiveText;
