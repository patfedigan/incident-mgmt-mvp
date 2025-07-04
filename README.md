# Incident Management MVP

## Overview
The **Incident Management MVP** is a full-stack application designed to track, manage, and resolve incidents efficiently. This MVP serves as a foundation for an incident management system, enabling teams to log incidents, update statuses, and track resolutions.

## Features
- ✅ Create and log new incidents
- ✅ Update incident status and priority
- ✅ View a list of active and resolved incidents
- ✅ Modern React UI with responsive design
- ✅ Spring Boot REST API backend
- ✅ Real-time data persistence
- ✅ Demo mode with mock data (frontend-only)

## Tech Stack
- **Frontend**: React 19, CSS3
- **Backend**: Spring Boot 2.7, Java 11
- **Build Tools**: Maven, npm
- **Development**: Hot reloading, CORS enabled

## Quick Start Options

### 🚀 Option 1: Frontend Only (Demo Mode)
Perfect for showcasing the UI without backend setup:
```bash
cd incident-mgmt-ui
npm install
npm start
```
Access at: http://localhost:3000
- ✅ Works immediately with mock data
- ✅ No backend required
- ✅ Perfect for GitHub Pages deployment

### 🔧 Option 2: Full Stack (Recommended)
Complete setup with backend API:

#### Prerequisites
- **Java 11+** and **Maven 3.6+**
- **Node.js 14+** and **npm**

#### Backend Setup
```bash
# Install Maven (if not installed)
brew install maven  # macOS
# or download from https://maven.apache.org/download.cgi

# Start Spring Boot backend
mvn spring-boot:run
```
Backend runs at: http://localhost:8080

#### Frontend Setup
```bash
# In a new terminal
cd incident-mgmt-ui
npm install
npm start
```
Frontend runs at: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/incidents` | Retrieve all incidents |
| GET | `/api/incidents/{id}` | Get specific incident |
| POST | `/api/incidents` | Create new incident |
| PUT | `/api/incidents/{id}` | Update incident |
| DELETE | `/api/incidents/{id}` | Delete incident |
| POST | `/api/incidents/{id}/comments` | Add comment to incident |

## Project Structure
```
incident-mgmt-mvp/
├── src/main/java/com/incident/management/
│   ├── controller/          # REST API controllers
│   ├── service/            # Business logic
│   ├── config/             # Spring configuration
│   └── IncidentManagementApplication.java
├── incident-mgmt-ui/       # React frontend
│   ├── src/components/     # React components
│   ├── public/            # Static assets
│   └── package.json
├── pom.xml                # Maven configuration
└── README.md
```

## Development

### Backend Development
```bash
# Run with hot reload
mvn spring-boot:run

# Build JAR
mvn clean package

# Run tests
mvn test
```

### Frontend Development
```bash
cd incident-mgmt-ui

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Deployment Options

### 1. GitHub Pages (Frontend Only)
```bash
cd incident-mgmt-ui
npm run build
# Deploy build/ folder to GitHub Pages
```

### 2. Heroku (Full Stack)
```bash
# Add Procfile for Spring Boot
echo "web: java -jar target/incident-management-0.0.1-SNAPSHOT.jar" > Procfile

# Deploy to Heroku
heroku create your-app-name
git push heroku main
```

### 3. Docker (Full Stack)
```dockerfile
# Dockerfile for backend
FROM openjdk:11-jre-slim
COPY target/incident-management-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## Demo Data
The application includes sample incidents:
- Database Connection Failure (CRITICAL)
- Email Service Down (HIGH)
- UI Responsiveness Issue (MEDIUM)
- Password Reset Feature (HIGH, RESOLVED)
- Document Upload Issue (LOW)

## Troubleshooting

### Common Issues
1. **Port 8080 in use**: Change port in `application.properties`
2. **CORS errors**: Backend includes CORS configuration for localhost:3000
3. **Maven not found**: Install Maven or use IDE integration
4. **Node modules missing**: Run `npm install` in incident-mgmt-ui/

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:8080/api/incidents

# View logs
mvn spring-boot:run --debug
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions or suggestions, please open a GitHub Issue.

