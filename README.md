# Incident Management MVP

## Overview
The **Incident Management MVP** is a lightweight application designed to track, manage, and resolve incidents efficiently. This MVP serves as a foundation for an incident management system, enabling teams to log incidents, update statuses, and track resolutions.

## Features
- Create and log new incidents
- Update incident status
- View a list of active and resolved incidents
- Simple UI for quick navigation
- Backend integration for data persistence

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (if applicable)
- npm or yarn (for dependencies)
- Docker (if using the containerized setup)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/patfedigan/incident-mgmt-mvp.git
   cd incident-mgmt-mvp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm start
   ```
4. Access the application at:
   ```
   http://localhost:3000
   ```

## Usage
1. Navigate to the application in your browser.
2. Log new incidents with a title and description.
3. Update the status of an incident (e.g., Open, In Progress, Resolved).
4. View a list of incidents and their statuses.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/incidents` | Retrieve all incidents |
| POST | `/incidents` | Create a new incident |
| PUT | `/incidents/:id` | Update an incident status |
| DELETE | `/incidents/:id` | Remove an incident |

## Contributing
Feel free to open issues and submit pull requests to improve the project.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, contact the repository owner via GitHub Issues.

