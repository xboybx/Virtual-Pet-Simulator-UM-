import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedDog = ({ state, size = 200 }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Dog body parts with different states
  const getDogVariants = () => {
    const baseVariants = {
      happy: {
        body: { rotate: [0, -2, 2, 0], scale: [1, 1.05, 1] },
        tail: { rotate: [10, 45, 10], originX: 0, originY: 1 },
        ears: { rotate: [0, -5, 5, 0] },
        eyes: { scaleY: [1, 0.8, 1] },
        tongue: { scaleY: [0, 1, 0] }
      },
      hungry: {
        body: { y: [0, 5, 0], rotate: [0, -1, 1, 0] },
        tail: { rotate: [0, -10, 0] },
        ears: { rotate: [0, 10, 0] },
        eyes: { scaleY: [1, 1.2, 1] },
        tongue: { scaleY: [0, 0, 0] }
      },
      sleepy: {
        body: { y: [0, 10], rotate: [0, 5] },
        tail: { rotate: [0, -5] },
        ears: { rotate: [0, 15] },
        eyes: { scaleY: [1, 0.1] },
        tongue: { scaleY: [0, 0, 0] }
      },
      playing: {
        body: { 
          y: [0, -20, 0, -15, 0], 
          rotate: [0, -10, 10, -5, 0],
          scale: [1, 1.1, 1, 1.05, 1]
        },
        tail: { rotate: [10, 60, 10, 45, 10] },
        ears: { rotate: [0, -15, 15, -10, 0] },
        eyes: { scaleY: [1, 0.7, 1, 0.8, 1] },
        tongue: { scaleY: [0, 1, 0, 0.5, 0] }
      },
      sad: {
        body: { y: [0, 8], rotate: [0, 2] },
        tail: { rotate: [0, -20] },
        ears: { rotate: [0, 20] },
        eyes: { scaleY: [1, 1.3] },
        tongue: { scaleY: [0, 0, 0] }
      },
      sleeping: {
        body: { y: [10, 12, 10], rotate: [5, 7, 5] },
        tail: { rotate: [-5, -8, -5] },
        ears: { rotate: [15, 18, 15] },
        eyes: { scaleY: [0.1, 0.05, 0.1] },
        tongue: { scaleY: [0, 0, 0] }
      }
    };

    return baseVariants[state] || baseVariants.happy;
  };

  const variants = getDogVariants();

  const getAnimationDuration = () => {
    switch (state) {
      case 'playing': return 0.8;
      case 'happy': return 1.5;
      case 'hungry': return 1.2;
      case 'sleepy': return 3;
      case 'sleeping': return 4;
      case 'sad': return 2;
      default: return 2;
    }
  };

  const transition = {
    duration: getAnimationDuration(),
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="overflow-visible"
      >
        {/* Dog Shadow */}
        <ellipse
          cx="100"
          cy="180"
          rx="60"
          ry="15"
          fill="rgba(0,0,0,0.1)"
          className="drop-shadow-sm"
        />

        {/* Dog Body */}
        <motion.g
          animate={variants.body}
          transition={transition}
          style={{ originX: "50%", originY: "50%" }}
        >
          {/* Main Body */}
          <ellipse
            cx="100"
            cy="120"
            rx="45"
            ry="35"
            fill="#D2691E"
            stroke="#A0522D"
            strokeWidth="2"
          />
          
          {/* Chest */}
          <ellipse
            cx="100"
            cy="105"
            rx="25"
            ry="20"
            fill="#F4E4BC"
          />
        </motion.g>

        {/* Dog Head */}
        <motion.g
          animate={variants.body}
          transition={transition}
          style={{ originX: "50%", originY: "50%" }}
        >
          {/* Head */}
          <ellipse
            cx="100"
            cy="80"
            rx="35"
            ry="30"
            fill="#D2691E"
            stroke="#A0522D"
            strokeWidth="2"
          />
          
          {/* Snout */}
          <ellipse
            cx="100"
            cy="95"
            rx="15"
            ry="12"
            fill="#F4E4BC"
          />
          
          {/* Nose */}
          <ellipse
            cx="100"
            cy="90"
            rx="4"
            ry="3"
            fill="#000"
          />
        </motion.g>

        {/* Left Ear */}
        <motion.g
          animate={variants.ears}
          transition={transition}
          style={{ originX: "85px", originY: "65px" }}
        >
          <ellipse
            cx="85"
            cy="65"
            rx="12"
            ry="20"
            fill="#A0522D"
            stroke="#8B4513"
            strokeWidth="1"
          />
          <ellipse
            cx="85"
            cy="65"
            rx="6"
            ry="12"
            fill="#DEB887"
          />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={variants.ears}
          transition={transition}
          style={{ originX: "115px", originY: "65px" }}
        >
          <ellipse
            cx="115"
            cy="65"
            rx="12"
            ry="20"
            fill="#A0522D"
            stroke="#8B4513"
            strokeWidth="1"
          />
          <ellipse
            cx="115"
            cy="65"
            rx="6"
            ry="12"
            fill="#DEB887"
          />
        </motion.g>

        {/* Eyes */}
        <motion.g
          animate={variants.eyes}
          transition={transition}
        >
          {/* Left Eye */}
          <ellipse
            cx="90"
            cy="75"
            rx="6"
            ry="8"
            fill="#000"
          />
          <ellipse
            cx="92"
            cy="73"
            rx="2"
            ry="3"
            fill="#FFF"
          />
          
          {/* Right Eye */}
          <ellipse
            cx="110"
            cy="75"
            rx="6"
            ry="8"
            fill="#000"
          />
          <ellipse
            cx="112"
            cy="73"
            rx="2"
            ry="3"
            fill="#FFF"
          />
        </motion.g>

        {/* Tongue (appears when happy/playing) */}
        <motion.g
          animate={variants.tongue}
          transition={transition}
          style={{ originY: "100px" }}
        >
          <ellipse
            cx="100"
            cy="105"
            rx="8"
            ry="6"
            fill="#FF69B4"
          />
        </motion.g>

        {/* Tail */}
        <motion.g
          animate={variants.tail}
          transition={transition}
          style={{ originX: "140px", originY: "130px" }}
        >
          <ellipse
            cx="140"
            cy="115"
            rx="8"
            ry="25"
            fill="#D2691E"
            stroke="#A0522D"
            strokeWidth="2"
          />
          <ellipse
            cx="140"
            cy="105"
            rx="4"
            ry="15"
            fill="#F4E4BC"
          />
        </motion.g>

        {/* Legs */}
        <g>
          {/* Front Left Leg */}
          <ellipse cx="80" cy="150" rx="8" ry="20" fill="#D2691E" stroke="#A0522D" strokeWidth="1"/>
          <ellipse cx="80" cy="165" rx="10" ry="8" fill="#8B4513"/>
          
          {/* Front Right Leg */}
          <ellipse cx="120" cy="150" rx="8" ry="20" fill="#D2691E" stroke="#A0522D" strokeWidth="1"/>
          <ellipse cx="120" cy="165" rx="10" ry="8" fill="#8B4513"/>
          
          {/* Back Left Leg */}
          <ellipse cx="70" cy="140" rx="10" ry="18" fill="#D2691E" stroke="#A0522D" strokeWidth="1"/>
          <ellipse cx="70" cy="155" rx="12" ry="8" fill="#8B4513"/>
          
          {/* Back Right Leg */}
          <ellipse cx="130" cy="140" rx="10" ry="18" fill="#D2691E" stroke="#A0522D" strokeWidth="1"/>
          <ellipse cx="130" cy="155" rx="12" ry="8" fill="#8B4513"/>
        </g>

        {/* Special Effects for Different States */}
        {state === 'sleeping' && (
          <motion.g
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <text x="130" y="50" fontSize="20" fill="#4A90E2">💤</text>
            <text x="140" y="35" fontSize="16" fill="#4A90E2">💤</text>
            <text x="125" y="25" fontSize="12" fill="#4A90E2">💤</text>
          </motion.g>
        )}

        {state === 'hungry' && (
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <text x="120" y="40" fontSize="16" fill="#FF6B6B">🦴</text>
          </motion.g>
        )}

        {state === 'playing' && (
          <motion.g
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ originX: "150px", originY: "60px" }}
          >
            <text x="150" y="60" fontSize="20" fill="#4ECDC4">🎾</text>
          </motion.g>
        )}

        {state === 'happy' && (
          <motion.g
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <text x="60" y="50" fontSize="16" fill="#FFD93D">✨</text>
            <text x="140" y="45" fontSize="14" fill="#FFD93D">✨</text>
            <text x="75" y="30" fontSize="12" fill="#FFD93D">✨</text>
          </motion.g>
        )}
      </svg>
    </div>
  );
};

export default AnimatedDog;