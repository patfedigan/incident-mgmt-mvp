# Deployment Guide

## 🚀 Auto-Deployment Options

### Option 1: Vercel Auto-Deployment (Recommended)

**Setup:**
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the React app

2. **Configuration:**
   - Framework Preset: `Create React App`
   - Root Directory: `incident-mgmt-ui`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

**Benefits:**
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Global CDN
- ✅ Custom domains
- ✅ Analytics included

### Option 2: GitHub Pages Auto-Deployment

**Setup:**
1. **Enable GitHub Actions:**
   - The workflow is already configured in `.github/workflows/deploy.yml`
   - Push to main branch to trigger deployment

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Save

3. **Your app will be live at:**
   `https://patfedigan.github.io/incident-mgmt-mvp`

## 🔄 Switching Between Vercel and GitHub Pages

### To Disable Vercel and Use GitHub Pages:

1. **Remove Vercel Configuration:**
   ```bash
   rm vercel.json
   ```

2. **Update package.json for GitHub Pages:**
   ```json
   {
     "homepage": "https://patfedigan.github.io/incident-mgmt-mvp",
     "scripts": {
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Disconnect from Vercel:**
   - Go to Vercel dashboard
   - Select your project
   - Settings → General → Delete Project

4. **Use GitHub Pages:**
   ```bash
   cd incident-mgmt-ui
   npm run deploy
   ```

### To Disable GitHub Pages and Use Vercel:

1. **Remove GitHub Pages workflow:**
   ```bash
   rm .github/workflows/deploy.yml
   ```

2. **Remove homepage from package.json:**
   ```json
   {
     "scripts": {
       "vercel-build": "npm run build"
     }
   }
   ```

3. **Disable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: None
   - Save

## 📝 Manual Deployment Options

### GitHub Pages (Manual)
```bash
cd incident-mgmt-ui
npm install gh-pages --save-dev
npm run deploy
```

### Netlify (Manual)
```bash
cd incident-mgmt-ui
npm run build
# Drag build/ folder to netlify.com
```

### Vercel (Manual)
```bash
npm install -g vercel
cd incident-mgmt-ui
vercel
```

## 🎯 Demo Features

The demo showcases:
- **Modern React UI** with responsive design
- **Sample incident data** with realistic scenarios
- **Priority and status management**
- **Professional styling** and user experience
- **Backend-ready** architecture
- **Auto-deployment** on every push

## 🔧 Troubleshooting

### Vercel Issues:
- Check build logs in Vercel dashboard
- Ensure `vercel.json` is in root directory
- Verify build command works locally

### GitHub Pages Issues:
- Check Actions tab for build status
- Ensure `gh-pages` branch is created
- Verify repository settings

Perfect for portfolio showcases and technical demonstrations! 