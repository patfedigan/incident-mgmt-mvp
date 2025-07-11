import React, { useState, useEffect } from 'react';
import './IncidentForm.css';

const IncidentForm = ({ incident, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    assignedTo: '',
    status: 'OPEN',
    summary: ''
  });
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    if (incident) {
      setFormData({
        title: incident.title || '',
        description: incident.description || '',
        priority: incident.priority || 'MEDIUM',
        assignedTo: incident.assignedTo || '',
        status: incident.status || 'OPEN',
        summary: incident.summary || ''
      });
    }
  }, [incident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegenerateSummary = async () => {
    if (!incident) return; // Only for existing incidents
    
    setIsGeneratingSummary(true);
    
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname === 'patfedigan.github.io' || 
                         window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Mock summary generation for GitHub Pages
      setTimeout(() => {
        const mockSummary = generateMockSummary(incident);
        setFormData(prev => ({
          ...prev,
          summary: mockSummary
        }));
        setIsGeneratingSummary(false);
      }, 2000);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/incidents/${incident.id}/regenerate-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          summary: data.summary
        }));
      } else {
        throw new Error('Failed to regenerate summary');
      }
    } catch (error) {
      console.error('Error regenerating summary:', error);
      alert('Failed to regenerate summary: ' + error.message);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname === 'patfedigan.github.io' || 
                         window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Mock incident creation/update for GitHub Pages
      const mockIncident = {
        id: incident ? incident.id : `mock-${Date.now()}`,
        ...formData,
        createdAt: incident ? incident.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: incident ? incident.comments || [] : [],
        summary: formData.summary || generateMockSummary({ ...formData, id: 'new' })
      };
      
      // Simulate API delay
      setTimeout(() => {
        onSubmit(mockIncident);
      }, 500);
      return;
    }
    
    try {
      const url = incident 
        ? `http://localhost:8080/api/incidents/${incident.id}`
        : 'http://localhost:8080/api/incidents';
      
      const method = incident ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save incident');
      }

      const savedIncident = await response.json();
      onSubmit(savedIncident);
    } catch (error) {
      console.error('Error saving incident:', error);
      alert('Failed to save incident: ' + error.message);
    }
  };

  // Generate mock summary for GitHub Pages demo
  const generateMockSummary = (incidentData) => {
    const { title, description, priority, status, assignedTo } = incidentData;
    
    let impact = '';
    if (description.includes('users') || description.includes('customers')) {
      impact = 'affecting multiple users';
    } else if (description.includes('mobile')) {
      impact = 'primarily affecting mobile users';
    } else if (description.includes('email') || description.includes('SMTP')) {
      impact = 'impacting communication systems';
    } else {
      impact = 'affecting system functionality';
    }
    
    let resolution = '';
    if (status === 'RESOLVED') {
      resolution = ' and has been resolved';
    } else if (status === 'IN_PROGRESS') {
      resolution = ' and is currently being addressed';
    } else if (status === 'PENDING') {
      resolution = ' and is pending investigation';
    }
    
    return `AI Summary: ${title} incident with ${priority.toLowerCase()} priority ${impact}${resolution}. Assigned to ${assignedTo}.`;
  };

  return (
    <div className="incident-form">
      <h2>{incident ? 'Edit Incident' : 'Create New Incident'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>

        {incident && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <div className="summary-container">
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              placeholder="AI-generated summary will appear here..."
              readOnly={!incident} // Only editable for existing incidents
            />
            {incident && (
              <button
                type="button"
                onClick={handleRegenerateSummary}
                disabled={isGeneratingSummary}
                className="btn-regenerate"
              >
                {isGeneratingSummary ? 'Generating...' : '🔄 Regenerate'}
              </button>
            )}
          </div>
          {!incident && (
            <small className="summary-note">
              Summary will be automatically generated when incident is created
            </small>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {incident ? 'Update Incident' : 'Create Incident'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm; 