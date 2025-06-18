import React, { useState, useEffect } from 'react';
import './IncidentList.css';

const IncidentList = ({ onEditIncident, onViewIncident }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/incidents');
      if (!response.ok) {
        throw new Error('Failed to fetch incidents');
      }
      const data = await response.json();
      setIncidents(data);
    } catch (err) {
      setError(err.message);
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