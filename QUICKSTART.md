# 🎯 Quick Start Guide

## First-Time Setup (5 minutes)

### 1. Install & Run
```bash
# Navigate to project
cd voxel

# Install dependencies
npm install

# Start development server
npm run dev
```

**Your app is now at:** `http://localhost:5173` 🎉

### 2. Test the App
- **Landing Page**: Explore features and sign up
- **Demo Credentials**: 
  - Email: `demo@voxel.ai`
  - Password: `demo123`
- **Chat**: Click the microphone button to test voice
- **Personality**: Switch between Mr. Voxel and Miss Voxel

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## ✨ Key Features to Try

### 🎤 Voice Interaction
1. Go to Dashboard → Chat
2. Click the large microphone button
3. Speak naturally
4. Watch the voice visualization
5. Get AI responses with personality

### 🎭 Personality Switching
1. In Chat page, look at the right sidebar
2. Click "Mr. Voxel" or "Miss Voxel"
3. Notice the color and style change
4. Ask a question and hear the personality difference

### 💬 Chat Interface
- Messages appear with smooth animations
- User messages are blue, AI responses are glass-morphic
- Timestamps show for each message
- Auto-scroll to latest message

### 📊 Dashboard
- View conversation statistics
- See recent chats
- Access profile settings
- One-click upgrade option

### 💰 Pricing Page
- Three subscription tiers
- Feature comparison table
- FAQ section
- Upgrade buttons

---

## 🔧 Customization

### Change Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#YOUR_COLOR_HERE',
    // ... more colors
  },
}
```

### Modify AI Responses
Edit `src/utils/aiService.ts`:
```typescript
private async simulateAIResponse(message: string) {
  // Add custom response logic here
}
```

### Adjust Voice Settings
Edit `src/utils/voiceProcessor.ts`:
```typescript
this.recognition.language = 'en-US' // Change language
utterance.pitch = 1 // Adjust pitch
utterance.rate = 1 // Adjust speed
```

### Customize Animations
Edit `src/styles/globals.css`:
```css
@keyframes pulse-glow {
  /* Modify animation timing */
}
```

---

## 📱 Mobile Testing

### In Browser DevTools
1. Press `F12`
2. Click device toggle icon
3. Select device type
4. Test responsive design

### On Actual Device
```bash
# Get your machine IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux
ipconfig               # Windows

# Then visit in mobile browser
http://YOUR_IP:5173
```

---

## 🐛 Debugging Tips

### Browser Console
```javascript
// Check authentication
console.log(localStorage.getItem('voxel_token'))

// View app state
console.log(useVoxelStore.getState())

// Check messages
console.log(useVoxelStore.getState().messages)
```

### React DevTools
1. Install React Developer Tools extension
2. Open DevTools
3. Go to React tab
4. Inspect components and props

### Network Tab
1. Open DevTools → Network
2. Check API calls
3. Verify response data

---

## 🎨 Styling Tips

### Global Styles
- Add custom CSS to `src/styles/globals.css`
- Use Tailwind classes in components
- Combine with Framer Motion for animations

### Component Styling
```typescript
// Tailwind classes
<div className="glass-lg p-8 rounded-xl">

// Inline styles with Framer Motion
<motion.div style={{ background: gradient }}>

// Combined approach
<motion.button className="btn-primary hover-lift">
```

### Glass Effect
```typescript
// Apply glassmorphism
<div className="glass-lg">
  // Glass effect with blur and opacity
</div>
```

---

## 🔌 API Integration

### When Ready for Backend
Edit `src/utils/aiService.ts`:
```typescript
async generateResponse(userMessage: string) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    body: JSON.stringify({ message: userMessage }),
  })
  
  return response.json()
}
```

### Auth with Real Backend
Edit `src/store/authStore.ts`:
```typescript
async login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  
  const { token, user } = await response.json()
  // Store token and user
}
```

---

## 📦 Environment Setup

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build  # Creates optimized dist folder
npm run preview  # Preview production build locally
```

### Testing
```bash
npm run lint  # Check code quality
```

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] Update `.env` with production URLs
- [ ] Test all voice features
- [ ] Check responsiveness on mobile
- [ ] Verify API endpoints
- [ ] Remove console.log statements
- [ ] Enable HTTPS certificate
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics

Deploy to Vercel:
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy with one click!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📚 File Structure Quick Reference

```
src/
├── pages/          # Full page components
├── components/     # Reusable components
├── store/          # State management
├── utils/          # Helper functions
├── styles/         # Global CSS
└── types/          # TypeScript types
```

---

## 💡 Pro Tips

1. **Voice isn't working?**
   - Check microphone permissions
   - Ensure HTTPS (or localhost)
   - Try different browser

2. **Animations laggy?**
   - Reduce number of animated elements
   - Use `will-change: transform`
   - Check GPU usage

3. **Build size too large?**
   - Check `dist` folder size
   - Vite auto-optimizes with tree-shaking
   - Consider code splitting

4. **Need to debug Zustand?**
   ```javascript
   import { useVoxelStore } from './store/voxelStore'
   
   // In console:
   useVoxelStore.subscribe(console.log)
   ```

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## ❓ Common Questions

**Q: Can I use a different AI API?**
A: Yes! Edit `src/utils/aiService.ts` and integrate OpenAI, Claude, or any API.

**Q: How do I add a new page?**
A: Create new component in `src/pages/`, add route in `App.tsx`, import in store.

**Q: Can I customize the voices?**
A: Yes! Modify pitch and rate in `src/utils/voiceProcessor.ts`

**Q: How do I add offline support?**
A: Implement Service Workers or use a library like Workbox.

**Q: Can I use this as a template?**
A: Absolutely! Fork, modify, and make it your own.

---

## 🆘 Need Help?

- Check [README.md](./README.md) for detailed docs
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting
- Check GitHub Issues
- Email support@voxel.ai

---

Happy coding! 🚀✨
