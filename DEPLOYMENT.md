# 🚀 Deployment Guide

## Deployment Platforms

### Vercel (Recommended)

Vercel offers the best experience for Vite applications with automatic optimizations.

#### Steps:
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Import the project

3. **Configure Environment Variables**
   - Go to Settings → Environment Variables
   - Add your environment variables:
     ```
     VITE_API_URL=https://your-api.com
     VITE_OPENAI_API_KEY=your_key
     VITE_ENABLE_VOICE_API=true
     ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Netlify

Great alternative with excellent performance.

#### Steps:
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Drag and drop the `dist` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   - Go to Site settings → Environment
   - Add your environment variables

### GitHub Pages

Free hosting directly from GitHub.

#### Steps:
1. **Update vite.config.ts**
   ```typescript
   export default {
     base: '/voxel/',
     // ... rest of config
   }
   ```

2. **Build and push**
   ```bash
   npm run build
   git add dist/
   git commit -m "Deploy"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/dist` folder

### Docker

For containerized deployment.

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Build and run
```bash
# Build image
docker build -t voxel:latest .

# Run container
docker run -p 3000:3000 -e VITE_API_URL=https://your-api.com voxel:latest
```

#### Docker Compose
```yaml
version: '3.8'
services:
  voxel:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=https://your-api.com
      - VITE_OPENAI_API_KEY=your_key
    restart: unless-stopped
```

### AWS S3 + CloudFront

Static hosting with CDN.

#### Steps:
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   - AWS Console → S3 → Create bucket
   - Enable static website hosting
   - Upload `dist` folder contents

3. **Set up CloudFront**
   - Create CloudFront distribution
   - Point to your S3 bucket
   - Add custom domain (Route 53)

4. **Cache configuration**
   - Set cache TTL to 31536000 (1 year) for versioned files
   - Set cache TTL to 3600 (1 hour) for index.html

### DigitalOcean App Platform

Simple app deployment.

#### Steps:
1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to DigitalOcean**
   - Dashboard → Apps → Create App
   - Select your GitHub repo
   - Confirm build command: `npm run build`
   - Confirm output directory: `dist`

3. **Deploy**
   - Click "Deploy"
   - Your app will be live

### Railway

Developer-friendly deployment.

#### Steps:
1. **Connect GitHub**
   - [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure**
   - Build command: `npm run build`
   - Start command: `npm run preview`

3. **Add environment variables**
   - In project settings, add variables

## Performance Optimization

### Before Deployment

1. **Analyze bundle size**
   ```bash
   npm install -g rollup-plugin-visualizer
   npm run build
   ```

2. **Optimize images**
   - Convert to WebP format
   - Use responsive images

3. **Enable compression**
   - GZIP compression (automatically done by CDN)
   - Brotli compression for better ratio

### Vercel Optimizations
- Automatic image optimization
- Code splitting and lazy loading
- Edge caching for static files

### Netlify Optimizations
- Automatic HTTP/2 server push
- Atomic deployments
- Instant rollbacks

## SSL/TLS Certificate

Most platforms provide free SSL certificates:
- Vercel: Automatic
- Netlify: Automatic
- AWS: Use AWS Certificate Manager
- DigitalOcean: Automatic or Let's Encrypt

## Custom Domain

1. **Register domain**
   - GoDaddy, Namecheap, or Route 53

2. **Configure DNS**
   - Point CNAME/A record to your deployment platform
   - Wait for DNS propagation (up to 48 hours)

3. **Verify domain**
   - Platform will verify ownership
   - Enable automatic SSL

## Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  )
}
```

### Sentry (Error Tracking)
```bash
npm install @sentry/react
```

### Google Analytics
```typescript
import { useEffect } from 'react'

useEffect(() => {
  // Add Google Analytics script
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  document.head.appendChild(script)
}, [])
```

## Environment Variables for Deployment

### Required for Production
```env
VITE_API_URL=https://api.yourdomain.com
VITE_OPENAI_API_KEY=sk-...
VITE_ENABLE_VOICE_API=true
```

### Optional
```env
NODE_ENV=production
VITE_ANALYTICS_ID=your_id
VITE_SENTRY_DSN=your_dsn
```

## Troubleshooting

### Blank page after deployment
- Check browser console for errors
- Verify API endpoints are correct
- Check CORS headers if using external API

### Voice not working
- Ensure HTTPS (required for Web Audio API)
- Check microphone permissions
- Verify browser compatibility

### Slow performance
- Enable caching headers
- Optimize images
- Use CDN for static assets
- Enable code splitting

### Memory issues
- Reduce animation complexity
- Implement lazy loading
- Monitor memory usage

## CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Strategy

### Vercel
- Automatic rollback available
- Previous deployments preserved
- One-click rollback

### Netlify
- Deploy history available
- Instant rollback to any build
- Preview deployments before production

### Manual Rollback
```bash
git revert <commit-hash>
git push origin main
# Platform automatically redeploys
```

## Maintenance

### Update Dependencies
```bash
npm update
npm audit fix
npm run build
```

### Monitor Logs
- Vercel: Dashboard → Deployments → Runtime Logs
- Netlify: Builds → Logs
- Docker: `docker logs container_id`

### Regular Backups
- Enable version control
- Regular database backups
- Archive old deployments

---

For more information on specific platforms, check their documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Docker Docs](https://docs.docker.com)
