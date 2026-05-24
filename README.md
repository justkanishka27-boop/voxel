# 🎤 Voxel - Premium AI Voice Assistant Platform

A futuristic, production-ready AI voice assistant platform with real-time voice interaction, intelligent personalities, and an immersive glassmorphism UI/UX.

## ✨ Features

### 🎯 Core Features
- **Real-Time Voice Interaction** - Seamless speech recognition and synthesis
- **Multiple AI Personalities** - Choose between Mr. Voxel (Professional) and Miss Voxel (Friendly)
- **Intelligent Conversations** - Context-aware responses with personality matching
- **Premium Chat Interface** - Glassmorphic design with smooth animations
- **User Authentication** - Secure login/signup system with session management
- **Dashboard** - Personalized user dashboard with stats and preferences
- **Premium System** - Tiered subscription plans (Free, Pro, Enterprise)

### 🎨 Design System
- **Glassmorphism Effects** - Premium frosted glass UI elements
- **Gradient Aesthetics** - Modern gradient colors and animations
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach for all devices
- **Dark Theme** - Eye-friendly dark interface with vibrant accents
- **Custom Voice Visualization** - Animated bars responding to speech

### ⚙️ Technical Highlights
- **React 18** with TypeScript for type-safe components
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for sophisticated animations
- **Zustand** for state management
- **Web Speech API** for voice recognition and synthesis
- **Modular Architecture** - Clean, scalable component structure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd voxel
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
VITE_API_URL=http://localhost:3000
VITE_OPENAI_API_KEY=your_api_key_here
VITE_ENABLE_VOICE_API=true
```

### Development

**Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

**Build the project:**
```bash
npm run build
```

**Preview the production build:**
```bash
npm run preview
```

## 📁 Project Structure

```
voxel/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx
│   │   ├── VoiceAssistant.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── PersonalitySwitcher.tsx
│   │   └── LoadingScreen.tsx
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── PricingPage.tsx
│   ├── store/              # Zustand stores
│   │   ├── authStore.ts
│   │   └── voxelStore.ts
│   ├── utils/              # Utility functions
│   │   ├── voiceProcessor.ts
│   │   └── aiService.ts
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🎮 Usage Guide

### 1. **Landing Page**
- Explore features and testimonials
- Learn about Voxel's capabilities
- Sign up or login from the navigation

### 2. **Authentication**
- Create new account or login
- Email and password based authentication
- Demo credentials: `demo@voxel.ai` / `demo123`

### 3. **Chat Page** (Main Interface)
- **Voice Interaction**: Click the microphone button to start speaking
- **Real-Time Feedback**: See live listening animation and transcripts
- **Personality Selection**: Switch between Mr. Voxel and Miss Voxel
- **Chat History**: View all conversations in the message feed
- **Settings**: Adjust speech rate and volume

### 4. **Dashboard**
- View conversation statistics
- Recent chat history
- Profile information
- Quick access to features
- Upgrade to premium

### 5. **Pricing Page**
- View subscription plans
- Feature comparison table
- FAQ section
- Upgrade options

## 🔊 Voice Features

### Speech Recognition
- Automatic speech-to-text conversion
- Real-time interim results
- Multiple language support
- Error handling and feedback

### Speech Synthesis
- Text-to-speech output
- Personality-specific voice characteristics
- Adjustable speech rate and volume
- Natural pronunciation

## 🎭 AI Personalities

### Mr. Voxel 🎩
- **Tone**: Calm, Professional, Intelligent
- **Style**: Strategic and thoughtful
- **Use Case**: Business, Analysis, Planning

### Miss Voxel ✨
- **Tone**: Friendly, Elegant, Expressive
- **Style**: Warm and interactive
- **Use Case**: Casual conversation, Creativity, Support

## 🔐 Security Features

- Client-side voice processing (optional external API)
- Session management with localStorage
- Secure authentication flow
- HTTPS ready for deployment
- No sensitive data in client code

## 🎨 Design Specifications

### Color Palette
- **Primary Blue**: `#0ea5e9`
- **Cyan**: `#06b6d4`
- **Purple**: `#a855f7`
- **Pink**: `#ec4899`
- **Dark BG**: `#030712`

### Typography
- **Display Font**: Space Grotesk (headings)
- **Body Font**: Inter (text)
- **Font Sizes**: Responsive scaling

### Animations
- Smooth page transitions
- Pulse glow effects on interactive elements
- Wave animations for voice visualization
- Shimmer loading states
- Hover lift effects

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🚀 Deployment

### Vercel
```bash
npm run build
# Connect your GitHub repo to Vercel
```

### Netlify
```bash
npm run build
# Deploy the `dist` folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# AI Configuration
VITE_OPENAI_API_KEY=your_key_here

# Features
VITE_ENABLE_VOICE_API=true
```

### Tailwind Configuration
Custom extensions in `tailwind.config.ts`:
- Custom animations (pulse-glow, float, wave)
- Glass effect utilities
- Glow shadow effects
- Gradient utilities

## 🐛 Troubleshooting

### Voice Recognition Not Working
- Check browser permissions for microphone
- Ensure HTTPS in production
- Verify browser compatibility (Chrome, Edge, Safari)

### Animations Stuttering
- Reduce background element animations
- Disable certain effects on lower-end devices
- Use `will-change` CSS property sparingly

### Build Size Issues
- Code splitting is automatic with Vite
- Tree-shaking removes unused code
- Production builds are optimized

## 📚 Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Opera**: 76+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Framer Motion** - Advanced animations
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **React** - UI framework
- **Web Speech API** - Voice interaction

## 📞 Support

For support, email support@voxel.ai or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Real API integration with OpenAI/Claude
- [ ] Advanced conversation memory
- [ ] Custom voice profiles
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Voice cloning
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Integration with external services

---

**Made with ❤️ and cutting-edge AI technology**
