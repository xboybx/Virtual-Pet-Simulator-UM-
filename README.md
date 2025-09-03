# Virtual Dog Simulator 🐕

A delightful and interactive web-based virtual pet simulator built with React.js, featuring an adorable animated dog that you can feed, play with, and care for. Experience the joy of pet ownership without the real-world responsibilities!

## 🎮 Game Overview

The Virtual Dog Simulator is an engaging web application that simulates the experience of caring for a virtual dog. Your digital companion has three core needs - hunger, happiness, and energy - that you must manage through various interactions. The game features a dynamic day-night cycle, achievement system, and responsive animations that bring your virtual pet to life.

## ✨ Key Features

### 🐶 Interactive Virtual Dog
- **Animated Character**: Beautiful dog animations with smooth transitions between different emotional states
- **Personality-Rich Responses**: Your dog communicates through expressive messages and visual cues
- **State-Based Behavior**: Dog's appearance and animations change based on its current needs and mood

### 📊 Dynamic Attribute System
- **Hunger (🍖)**: Decreases over time; feed your dog to keep it satisfied
- **Happiness (❤️)**: Affected by play time and overall care quality
- **Energy (🔋)**: Depletes through activities; restored through sleep

### 🎯 Core Interactions
1. **Feed Dog**: Increases hunger (+30) and provides a small happiness boost (+10)
2. **Play**: Significantly boosts happiness (+25) but consumes energy (-15)
3. **Sleep**: Fully restores energy and provides a happiness bonus over 8 seconds

### 🌅 Environmental Features
- **Day-Night Cycle**: Automatic transition every 2 minutes with beautiful gradient backgrounds
- **Weather Indicators**: Sun and moon icons show current time of day
- **Adaptive UI**: Interface colors and themes change with the time cycle

### 🏆 Achievement System
Unlock special achievements by providing excellent care:
- **Happiness Master**: Achieve 95% happiness
- **Dedicated Caretaker**: Play for over 5 minutes
- **Perfect Care**: Maintain all stats above 90%
- **Dedicated Owner**: Play for over 10 minutes

## 🎯 How to Play

### Getting Started
1. Your virtual dog starts with moderate stats across all attributes
2. Monitor the three status bars: Hunger, Happiness, and Energy
3. Watch your dog's animations and messages for clues about its needs

### Caring for Your Dog
- **When Hungry** (🐶): Your dog will appear sad and ask for food - click "Feed Dog"
- **When Sad** (😢): Low happiness means your dog needs attention - click "Play"
- **When Tired** (😴): Low energy requires rest - click "Sleep"
- **When Happy** (🐕): Your dog is content and may want to play!

### Understanding the Stats
- **Green Bars (70-100%)**: Your dog is doing great!
- **Yellow Bars (40-69%)**: Attention needed soon
- **Red Bars (0-39%)**: Immediate care required!

### Pro Tips
- **Balance is Key**: Don't let any stat get too low
- **Regular Interaction**: Stats decay faster if you ignore your dog for 30+ seconds
- **Energy Management**: Playing requires energy, so ensure your dog is well-rested
- **Achievement Hunting**: Consistent care unlocks special recognition badges

## 🏗️ Technical Architecture

### Project Structure
```
virtual-pet-simulator/
├── public/
│   └── vite.svg                 # Vite favicon
├── src/
│   ├── components/
│   │   └── VirtualPet.jsx       # Main game component
│   ├── App.jsx                  # Root application component
│   ├── App.css                  # Legacy styles (minimal usage)
│   ├── index.css                # Global styles and Tailwind imports
│   └── main.jsx                 # Application entry point
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js              # Vite build configuration
└── README.md                   # This documentation
```

### Core Technologies

#### Frontend Framework
- **React 18.3.1**: Modern React with hooks for state management
- **Vite**: Lightning-fast development server and build tool
- **JavaScript (ES6+)**: No TypeScript for simplified development

#### Styling & UI
- **Tailwind CSS 3.3.5**: Utility-first CSS framework for rapid styling
- **Custom Animations**: Extended Tailwind with custom keyframes and animations
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Gradient Backgrounds**: Dynamic color schemes for day/night cycles

#### Animation & Graphics
- **Lottie React 2.4.0**: Smooth, scalable animations (with emoji fallbacks)
- **Lucide React 0.263.1**: Beautiful, consistent icons for UI elements
- **CSS Animations**: Custom bounce, wiggle, float, and glow effects

#### State Management
- **React Hooks**: useState and useEffect for component state
- **Local State**: All game data stored in component state (no external state management)
- **Real-time Updates**: Interval-based stat decay and game time tracking

### Component Architecture

#### VirtualPet.jsx - Main Game Logic
The core component manages all game functionality:

**State Variables:**
- `petStats`: Object containing hunger, happiness, and energy values
- `petState`: Current emotional state ('happy', 'hungry', 'sleepy', etc.)
- `isDay`: Boolean for day/night cycle
- `achievements`: Array of unlocked achievements
- `gameTime`: Total seconds played
- `lastInteraction`: Timestamp for decay calculation
- `isPlaying`/`isSleeping`: Activity state booleans

**Key Functions:**
- `feedPet()`: Increases hunger and happiness
- `playWithPet()`: Boosts happiness, reduces energy, triggers play animation
- `putPetToSleep()`: Initiates sleep cycle with energy restoration
- `getPetAnimation()`: Returns appropriate CSS animation class
- `getStatColor()`/`getStatBorderColor()`: Dynamic styling based on stat values

**Game Loops:**
- **Stat Decay**: Every 2 seconds, reduces stats based on time and interaction
- **Day/Night Cycle**: Every 120 seconds (2 minutes), toggles time of day
- **Achievement Checking**: Continuously monitors for achievement conditions

### Styling System

#### Tailwind Configuration
- **Custom Colors**: Extended palette with primary, secondary, and accent colors
- **Custom Animations**: Added bounce-slow, pulse-slow, wiggle, float, and glow
- **Responsive Breakpoints**: Mobile-first design with md: and lg: breakpoints

#### Animation Classes
- `animate-bounce-slow`: Gentle bouncing for happy states
- `animate-pulse-slow`: Slow pulsing for sleeping
- `animate-wiggle`: Side-to-side motion for hungry state
- `animate-float`: Gentle up-down motion for neutral state
- `animate-glow`: Glowing effect for special elements

#### Color System
- **Stat Colors**: Green (good), Yellow (warning), Red (critical)
- **Background Gradients**: Blue/purple/pink for day, indigo/purple/pink for night
- **Interactive Elements**: Gradient buttons with hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```
The game will be available at `http://localhost:5173`

### Building for Production
Create a production build:
```bash
npm run build
```

### Linting
Check code quality:
```bash
npm run lint
```

## 🎨 Customization Options

### Adding New Pet States
1. Add new state to `petState` logic in useEffect
2. Create corresponding animation in `getPetAnimation()`
3. Add new message in `getPetMessage()`
4. Update DogAnimation component with new emoji/animation

### Modifying Game Balance
Adjust these values in the stat decay useEffect:
- **Decay Rates**: Currently 0.8 (hunger), 0.5 (happiness), 0.6 (energy)
- **Interaction Values**: feedPet (+30 hunger), playWithPet (+25 happiness, -15 energy)
- **Sleep Duration**: Currently 8 seconds for full energy restoration

### Adding New Achievements
1. Add achievement condition in achievements useEffect
2. Update `getAchievementName()` function with display name
3. Achievement automatically appears when condition is met

## 🔧 Performance Considerations

- **Efficient Intervals**: Single interval for all game logic updates
- **Conditional Rendering**: Components only re-render when necessary
- **Optimized Animations**: CSS-based animations for smooth performance
- **Fallback Systems**: Emoji fallbacks ensure functionality without external dependencies

## 🌟 Future Enhancement Ideas

- **Multiple Pet Types**: Cats, birds, or other animals
- **Pet Customization**: Colors, accessories, names
- **Mini-Games**: Interactive activities for happiness
- **Save System**: Persistent pet data across sessions
- **Social Features**: Share achievements or pet photos
- **Advanced Stats**: Health, cleanliness, training levels
- **Pet Evolution**: Growth stages based on care quality

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Responsive**: Optimized for phones and tablets
- **Progressive Enhancement**: Core functionality works without advanced features

## 🤝 Contributing

This project is perfect for learning React and game development concepts. Feel free to:
- Add new features or pet types
- Improve animations and visual effects
- Enhance the achievement system
- Optimize performance and code structure

---

**Enjoy caring for your virtual dog! 🐕❤️**

*Remember: A happy dog is a well-cared-for dog. Keep those stats green and watch your furry friend thrive!*