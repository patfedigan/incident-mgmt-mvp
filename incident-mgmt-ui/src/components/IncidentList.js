import React, { useState, useEffect } from 'react';
import './IncidentList.css';

// Mock data for frontend-only demo
const mockIncidents = [
  {
    id: "1",
    title: "Database Connection Failure",
    description: "Users are unable to connect to the main database. Error 500 appears on login attempts.",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    assignedTo: "john.doe@company.com",
    createdAt: "2025-06-18T10:00:00.000Z",
    updatedAt: "2025-06-18T10:00:00.000Z",
    comments: []
  },
  {
    id: "2",
    title: "Email Service Down",
    description: "Outgoing emails are not being delivered. SMTP server appears to be unresponsive.",
    priority: "HIGH",
    status: "OPEN",
    assignedTo: "sarah.smith@company.com",
    createdAt: "2025-06-18T09:30:00.000Z",
    updatedAt: "2025-06-18T09:30:00.000Z",
    comments: []
  },
  {
    id: "3",
    title: "UI Responsiveness Issue",
    description: "Dashboard page is loading slowly on mobile devices. Performance degradation reported.",
    priority: "MEDIUM",
    status: "PENDING",
    assignedTo: "mike.johnson@company.com",
    createdAt: "2025-06-18T08:45:00.000Z",
    updatedAt: "2025-06-18T08:45:00.000Z",
    comments: []
  },
  {
    id: "4",
    title: "Password Reset Feature",
    description: "Users cannot reset their passwords. Reset link is not working properly.",
    priority: "HIGH",
    status: "RESOLVED",
    assignedTo: "admin@company.com",
    createdAt: "2025-06-18T07:15:00.000Z",
    updatedAt: "2025-06-18T07:15:00.000Z",
    comments: []
  },
  {
    id: "5",
    title: "Document Upload Issue",
    description: "File upload feature is not working for files larger than 10MB.",
    priority: "LOW",
    status: "OPEN",
    assignedTo: "tech.support@company.com",
    createdAt: "2025-06-18T06:20:00.000Z",
    updatedAt: "2025-06-18T06:20:00.000Z",
    comments: []
  }
];

const IncidentList = ({ onEditIncident, onViewIncident }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from backend first
      const response = await fetch('http://localhost:8080/api/incidents');
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
        setUseMockData(false);
      } else {
        throw new Error('Backend not available');
      }
    } catch (err) {
      console.log('Backend not available, using mock data');
      setIncidents(mockIncidents);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'red';
      case 'HIGH': return 'orange';
      case 'MEDIUM': return 'yellow';
      case 'LOW': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'blue';
      case 'IN_PROGRESS': return 'purple';
      case 'PENDING': return 'orange';
      case 'RESOLVED': return 'green';
      case 'CLOSED': return 'gray';
      default: return 'gray';
    }
  };

  if (loading) return <div className="loading">Loading incidents...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="incident-list">
      <h2>Incidents</h2>
      {useMockData && (
        <div className="mock-data-notice">
          <p>⚠️ Demo Mode: Using mock data (backend not connected)</p>
        </div>
      )}
      <div className="incident-grid">
        {incidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <div className="incident-badges">
                <span 
                  className="priority-badge" 
                  style={{ backgroundColor: getPriorityColor(incident.priority) }}
                >
                  {incident.priority}
                </span>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(incident.status) }}
                >
                  {incident.status}
                </span>
              </div>
            </div>
            <p className="incident-description">{incident.description}</p>
            <div className="incident-meta">
              <span>Assigned to: {incident.assignedTo}</span>
              <span>Created: {new Date(incident.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="incident-actions">
              <button onClick={() => onViewIncident(incident)}>View</button>
              <button onClick={() => onEditIncident(incident)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentList; 