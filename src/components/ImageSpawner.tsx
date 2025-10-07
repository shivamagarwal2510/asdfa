import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpawnedImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

const unsplashImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=200&fit=crop',
	'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1642132652806-8aa09801c2ab?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1690369519543-c81a2121f740?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

interface ImageSpawnerProps {
  children: React.ReactNode;
}

const ImageSpawner: React.FC<ImageSpawnerProps> = ({ children }) => {
  const [spawnedImages, setSpawnedImages] = useState<SpawnedImage[]>([]);

  const spawnImage = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const randomImage = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    const randomWidth = Math.random() * 150 + 100; // 100-250px
    const randomHeight = Math.random() * 100 + 80; // 80-180px
    const randomRotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
    
    const newImage: SpawnedImage = {
      id: `img-${Date.now()}-${Math.random()}`,
      src: randomImage,
      x: x - randomWidth / 2,
      y: y - randomHeight / 2,
      width: randomWidth,
      height: randomHeight,
      rotation: randomRotation
    };

    setSpawnedImages(prev => [...prev, newImage]);
    // Images now stay permanently until reset button is clicked
  }, []);

  const resetImages = () => {
    setSpawnedImages([]);
  };

  return (
    <div 
      className="relative w-full h-full" 
      onClick={spawnImage}
    >
      {children}
      
      {spawnedImages.length > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetImages();
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                     border-2 border-gray-800 px-6 py-2 rounded-full 
                     hover:bg-gray-800 hover:text-white transition-colors duration-300
                     font-mono text-sm tracking-wider z-50 cursor-pointer"
        >
          ↻ RESET ({spawnedImages.length})
        </button>
      )}

      <AnimatePresence>
        {spawnedImages.map((image) => (
          <motion.img
            key={image.id}
            src={image.src}
            className="spawned-image"
            style={{
              left: image.x,
              top: image.y,
              width: image.width,
              height: image.height,
              transform: `rotate(${image.rotation}deg)`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 25 
            }}
            whileHover={{ 
              scale: 1.05,
              zIndex: 1000 
            }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.1}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ImageSpawner;
