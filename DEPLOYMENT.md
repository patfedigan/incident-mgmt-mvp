# Deployment Guide

## 🚀 Quick Showcase on GitHub

### Option 1: GitHub Pages (Recommended for Demo)

1. **Install gh-pages package:**
   ```bash
   cd incident-mgmt-ui
   npm install gh-pages --save-dev
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Save

4. **Your app will be live at:**
   `https://patfedigan.github.io/incident-mgmt-mvp`

### Option 2: Netlify (Alternative)

1. **Build the app:**
   ```bash
   cd incident-mgmt-ui
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `build/` folder to [netlify.com](https://netlify.com)
   - Or connect your GitHub repository

### Option 3: Vercel (Alternative)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd incident-mgmt-ui
   vercel
   ```

## 📝 What Works in Demo Mode

✅ **Incident List View** - Shows 5 sample incidents  
✅ **Priority Badges** - Color-coded (CRITICAL, HIGH, MEDIUM, LOW)  
✅ **Status Badges** - Shows current status  
✅ **Responsive Design** - Works on mobile and desktop  
✅ **Modern UI** - Clean, professional interface  

## 🔧 Full Stack Deployment

### Heroku (Backend + Frontend)

1. **Add Procfile:**
   ```bash
   echo "web: java -jar target/incident-management-0.0.1-SNAPSHOT.jar" > Procfile
   ```

2. **Build and deploy:**
   ```bash
   mvn clean package
   heroku create your-app-name
   git push heroku main
   ```

### Docker (Local/Cloud)

1. **Create Dockerfile:**
   ```dockerfile
   FROM openjdk:11-jre-slim
   COPY target/incident-management-0.0.1-SNAPSHOT.jar app.jar
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "/app.jar"]
   ```

2. **Build and run:**
   ```bash
   docker build -t incident-mgmt .
   docker run -p 8080:8080 incident-mgmt
   ```

## 🎯 Demo Features

The demo showcases:
- **Modern React UI** with responsive design
- **Sample incident data** with realistic scenarios
- **Priority and status management**
- **Professional styling** and user experience
- **Backend-ready** architecture

Perfect for portfolio showcases and technical demonstrations! 