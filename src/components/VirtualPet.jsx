import { useState, useEffect } from 'react';
import { Heart, Utensils, Battery, Moon, Gamepad2, Award, Sun } from 'lucide-react';
import AnimatedDog from './AnimatedDog';

const VirtualPet = () => {
  const [petStats, setPetStats] = useState({
    hunger: 75,
    happiness: 70,
    energy: 85,
  });

  const [petState, setPetState] = useState('happy');
  const [isDay, setIsDay] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  // Pet state logic based on stats
  useEffect(() => {
    if (isSleeping) {
      setPetState('sleeping');
      return;
    }
    
    const { hunger, happiness, energy } = petStats;
    
    if (energy < 25) {
      setPetState('sleepy');
    } else if (hunger < 35) {
      setPetState('hungry');
    } else if (happiness < 30) {
      setPetState('sad');
    } else if (isPlaying) {
      setPetState('playing');
    } else if (happiness > 75 && energy > 50) {
      setPetState('happy');
    } else {
      setPetState('happy');
    }
  }, [petStats, isPlaying, isSleeping]);

  // Improved stat decay system
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(prev => prev + 1);
      
      if (!isSleeping) {
        setPetStats(prev => {
          const timeSinceLastInteraction = (Date.now() - lastInteraction) / 1000;
          const decayMultiplier = timeSinceLastInteraction > 30 ? 1.5 : 1;
          
          return {
            hunger: Math.max(0, prev.hunger - (0.8 * decayMultiplier)),
            happiness: Math.max(0, prev.happiness - (0.5 * decayMultiplier)),
            energy: Math.max(0, prev.energy - (0.6 * decayMultiplier)),
          };
        });
      } else {
        // Pet recovers energy while sleeping
        setPetStats(prev => ({
          ...prev,
          energy: Math.min(100, prev.energy + 3),
          happiness: Math.min(100, prev.happiness + 0.5),
        }));
      }

      // Day/night cycle every 2 minutes
      if (gameTime % 120 === 0) {
        setIsDay(prev => !prev);
      }
    }, 2000); // Slower decay - every 2 seconds

    return () => clearInterval(interval);
  }, [gameTime, lastInteraction, isSleeping]);

  // Achievement system
  useEffect(() => {
    const newAchievements = [];
    
    if (petStats.happiness >= 95 && !achievements.includes('happiness_master')) {
      newAchievements.push('happiness_master');
    }
    if (gameTime > 300 && !achievements.includes('caretaker')) {
      newAchievements.push('caretaker');
    }
    if (petStats.hunger >= 90 && petStats.happiness >= 90 && petStats.energy >= 90 && !achievements.includes('perfect_care')) {
      newAchievements.push('perfect_care');
    }
    if (gameTime > 600 && !achievements.includes('dedicated_owner')) {
      newAchievements.push('dedicated_owner');
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  }, [petStats, gameTime, achievements]);

  const feedPet = () => {
    if (petStats.hunger >= 95) return;
    
    setPetStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      happiness: Math.min(100, prev.happiness + 10),
    }));
    setLastInteraction(Date.now());
  };

  const playWithPet = () => {
    if (petStats.energy < 20 || isPlaying) return;
    
    setIsPlaying(true);
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 15),
    }));
    setLastInteraction(Date.now());
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 4000);
  };

  const putPetToSleep = () => {
    if (petStats.energy >= 85 || isSleeping) return;
    
    setIsSleeping(true);
    
    setTimeout(() => {
      setPetStats(prev => ({
        ...prev,
        energy: 100,
        happiness: Math.min(100, prev.happiness + 15),
      }));
      setIsSleeping(false);
    }, 8000);
  };

  const getStatColor = (value) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatBorderColor = (value) => {
    if (value >= 70) return 'border-green-300';
    if (value >= 40) return 'border-yellow-300';
    return 'border-red-300';
  };

  const getPetMessage = () => {
    if (isSleeping) return "Zzz... having sweet dreams! 💤";
    
    switch (petState) {
      case 'hungry': return "Woof! I'm getting hungry! 🦴";
      case 'happy': return "I'm feeling great! Let's play! ✨";
      case 'sleepy': return "I'm getting tired... need some rest 😴";
      case 'playing': return "This is so much fun! Woof woof! 🎉";
      case 'sad': return "I need some love and attention... 💔";
      default: return "I'm your loyal companion! 🐕";
    }
  };

  const getAchievementName = (achievement) => {
    const names = {
      'happiness_master': 'Happiness Master!',
      'caretaker': 'Dedicated Caretaker!',
      'perfect_care': 'Perfect Care!',
      'dedicated_owner': 'Dedicated Owner!'
    };
    return names[achievement] || achievement;
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isDay 
        ? 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {isDay ? <Sun className="text-yellow-500" size={32} /> : <Moon className="text-blue-300" size={32} />}
            <h1 className={`text-4xl font-bold ${isDay ? 'text-gray-800' : 'text-white'}`}>
              Virtual Dog Simulator
            </h1>
          </div>
          <p className={`text-lg ${isDay ? 'text-gray-600' : 'text-gray-300'}`}>
            Take care of your adorable virtual dog!
          </p>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-6 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 animate-bounce">
                  <Award size={16} />
                  {getAchievementName(achievement)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Pet Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
            <div className="text-center">
              <div className="mb-6">
                <AnimatedDog state={petState} size={250} />
              </div>
              <div className={`text-2xl font-bold mb-2 ${isDay ? 'text-gray-800' : 'text-gray-700'}`}>
                Your Dog is {petState.charAt(0).toUpperCase() + petState.slice(1)}
              </div>
              <div className={`text-lg ${isDay ? 'text-gray-600' : 'text-gray-500'}`}>
                {getPetMessage()}
              </div>
            </div>
          </div>

          {/* Stats Display */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'Hunger', value: petStats.hunger, icon: Utensils, color: 'text-orange-600' },
              { name: 'Happiness', value: petStats.happiness, icon: Heart, color: 'text-pink-600' },
              { name: 'Energy', value: petStats.energy, icon: Battery, color: 'text-green-600' },
            ].map((stat) => (
              <div key={stat.name} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`${stat.color}`} size={24} />
                    <span className="font-semibold text-gray-800">{stat.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{Math.round(stat.value)}%</span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-4 border-2 ${getStatBorderColor(stat.value)}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getStatColor(stat.value)}`}
                    style={{ width: `${stat.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={feedPet}
              disabled={petStats.hunger >= 95}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Utensils size={24} />
              Feed Dog
            </button>

            <button
              onClick={playWithPet}
              disabled={petStats.energy < 20 || isPlaying}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Gamepad2 size={24} />
              {isPlaying ? 'Playing...' : 'Play'}
            </button>

            <button
              onClick={putPetToSleep}
              disabled={petStats.energy >= 85 || isSleeping}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Moon size={24} />
              {isSleeping ? 'Sleeping...' : 'Sleep'}
            </button>
          </div>

          {/* Game Info */}
          <div className="text-center mt-8">
            <div className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-300'}`}>
              Game Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')} | 
              {isDay ? ' Day Time ☀️' : ' Night Time 🌙'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet;