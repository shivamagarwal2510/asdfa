import React from 'react';
import { motion } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import ImageSpawner from './components/ImageSpawner';
import BlobCursor from './components/BlobCursor';
import FloatingIcons from './components/FloatingIcons';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <BlobCursor
        blobType="blob"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[20, 40, 60]}
        innerSizes={[8, 16, 24]}
        innerColor="rgba(255,255,255,0.9)"
        opacities={[0.8, 0.6, 0.4]}
        shadowColor="rgba(82, 39, 255, 0.3)"
        shadowBlur={8}
        shadowOffsetX={2}
        shadowOffsetY={2}
        filterStdDeviation={15}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.3}
        zIndex={9999}
      />
      
      <FloatingIcons />

      {/* Navigation */}
      <motion.nav 
        className="flex justify-between items-center p-6 md:p-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-lg md:text-xl font-bold tracking-wide">
          DUALITE ALPHA
        </div>
        <div className="flex gap-3 md:gap-6">
          {['WORK', 'AI EXPERIMENTS', 'ABOUT'].map((item, index) => (
            <motion.button
              key={item}
              className="border-2 border-gray-800 px-4 py-2 rounded-full 
                         hover:bg-gray-800 hover:text-white transition-colors duration-300
                         text-sm md:text-base font-medium tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <ImageSpawner>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 md:px-12 text-center relative z-10">
          {/* Main Heading */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-8">
              <InteractiveText 
                text="DUALITE'S ALPHA"
                className="block mb-4"
              />
              <InteractiveText 
                text="IS AN "
                className="inline"
              />
              <InteractiveText 
                text="AI-POWERED"
                className="inline"
              />
              <br className="hidden md:block" />
              <InteractiveText 
                text="FRONTEND "
                className="inline"
              />
              <InteractiveText 
                text="ENGINEER"
                className="inline"
              />
              <br className="hidden md:block" />
              <InteractiveText 
                text="SPECIALIZING "
                className="inline"
              />
              <InteractiveText 
                text="IN "
                className="inline"
              />
              <InteractiveText 
                text="REACT."
                className="inline"
              />
            </h1>
          </motion.div>

          {/* Instruction Text */}
          <motion.p 
            className="text-gray-500 text-sm md:text-base font-mono tracking-widest mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            ** CLICK ON THE SCREEN TO VIEW PROJECTS **
          </motion.p>
        </div>
      </ImageSpawner>
    </div>
  );
}

export default App;
