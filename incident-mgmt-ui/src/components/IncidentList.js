import React, { useState, useEffect } from 'react';
import './IncidentList.css';

// Enhanced mock data for GitHub Pages demo
const mockIncidents = [
  {
    id: "1",
    title: "Database Connection Failure",
    description: "Users are unable to connect to the main database. Error 500 appears on login attempts. The issue started at 2:30 PM and affects approximately 150 active users. Database logs show connection timeout errors.",
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    assignedTo: "john.doe@company.com",
    createdAt: "2025-06-18T10:00:00.000Z",
    updatedAt: "2025-06-18T10:00:00.000Z",
    comments: [
      { content: "Investigating database connection pool settings", authorId: "john.doe@company.com", createdAt: "2025-06-18T10:15:00.000Z" },
      { content: "Found connection pool exhaustion. Increasing max connections.", authorId: "john.doe@company.com", createdAt: "2025-06-18T10:30:00.000Z" }
    ],
    summary: "Critical database connection failure affecting 150 users with 500 errors. Currently in progress with connection pool optimization."
  },
  {
    id: "2",
    title: "Email Service Down",
    description: "Outgoing emails are not being delivered. SMTP server appears to be unresponsive. Customer notifications and password reset emails are failing. Monitoring shows 100% failure rate for all email attempts.",
    priority: "HIGH",
    status: "OPEN",
    assignedTo: "sarah.smith@company.com",
    createdAt: "2025-06-18T09:30:00.000Z",
    updatedAt: "2025-06-18T09:30:00.000Z",
    comments: [
      { content: "SMTP server not responding to connection attempts", authorId: "sarah.smith@company.com", createdAt: "2025-06-18T09:45:00.000Z" }
    ],
    summary: "SMTP server completely unresponsive causing 100% email delivery failure. High priority issue affecting customer communications."
  },
  {
    id: "3",
    title: "UI Responsiveness Issue",
    description: "Dashboard page is loading slowly on mobile devices. Performance degradation reported by users on iOS and Android. Page load times increased from 2 seconds to 8+ seconds. Affects mobile users primarily.",
    priority: "MEDIUM",
    status: "PENDING",
    assignedTo: "mike.johnson@company.com",
    createdAt: "2025-06-18T08:45:00.000Z",
    updatedAt: "2025-06-18T08:45:00.000Z",
    comments: [
      { content: "Performance profiling shows heavy JavaScript execution on mobile", authorId: "mike.johnson@company.com", createdAt: "2025-06-18T09:00:00.000Z" },
      { content: "Identified unoptimized image loading as root cause", authorId: "mike.johnson@company.com", createdAt: "2025-06-18T09:15:00.000Z" }
    ],
    summary: "Dashboard performance severely degraded on mobile devices with 8+ second load times. Root cause identified as unoptimized image loading."
  },
  {
    id: "4",
    title: "Password Reset Feature",
    description: "Users cannot reset their passwords. Reset link is not working properly. Users receive reset emails but clicking the link results in 'Invalid or expired token' error. This affects new user onboarding.",
    priority: "HIGH",
    status: "RESOLVED",
    assignedTo: "admin@company.com",
    createdAt: "2025-06-18T07:15:00.000Z",
    updatedAt: "2025-06-18T07:15:00.000Z",
    comments: [
      { content: "Token expiration time was set too short (15 minutes)", authorId: "admin@company.com", createdAt: "2025-06-18T07:30:00.000Z" },
      { content: "Extended token expiration to 24 hours and fixed validation logic", authorId: "admin@company.com", createdAt: "2025-06-18T08:00:00.000Z" },
      { content: "Testing confirms password reset now working correctly", authorId: "admin@company.com", createdAt: "2025-06-18T08:30:00.000Z" }
    ],
    summary: "Password reset functionality was broken due to short token expiration but has been resolved with extended 24-hour tokens and fixed validation."
  },
  {
    id: "5",
    title: "Document Upload Issue",
    description: "File upload feature is not working for files larger than 10MB. Users receive 'File too large' error even though the limit should be 50MB. This affects document sharing functionality for larger reports and presentations.",
    priority: "LOW",
    status: "OPEN",
    assignedTo: "tech.support@company.com",
    createdAt: "2025-06-18T06:20:00.000Z",
    updatedAt: "2025-06-18T06:20:00.000Z",
    comments: [
      { content: "Server configuration shows 10MB limit instead of 50MB", authorId: "tech.support@company.com", createdAt: "2025-06-18T06:35:00.000Z" }
    ],
    summary: "File upload limit incorrectly set to 10MB instead of 50MB, preventing users from uploading larger documents and reports."
  }
];

const IncidentList = ({ onEditIncident, onViewIncident, mockIncidents: userMockIncidents }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [summarizingIncidents, setSummarizingIncidents] = useState(new Set());
  const [streamingDots, setStreamingDots] = useState({});

  useEffect(() => {
    fetchIncidents();
  }, []);

  // Update incidents when user creates new ones (GitHub Pages)
  useEffect(() => {
    if (userMockIncidents && userMockIncidents.length > 0) {
      setIncidents(prev => {
        // Merge user-created incidents with built-in mock data
        const existingIds = new Set(prev.map(inc => inc.id));
        const newIncidents = userMockIncidents.filter(inc => !existingIds.has(inc.id));
        return [...prev, ...newIncidents];
      });
    }
  }, [userMockIncidents]);

  // Streaming dots animation effect
  useEffect(() => {
    const intervals = {};
    
    summarizingIncidents.forEach(incidentId => {
      let dotCount = 0;
      intervals[incidentId] = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setStreamingDots(prev => ({
          ...prev,
          [incidentId]: '.'.repeat(dotCount)
        }));
      }, 500);
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [summarizingIncidents]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we're on GitHub Pages or localhost
      const isGitHubPages = window.location.hostname === 'patfedigan.github.io' || 
                           window.location.hostname.includes('github.io');
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
      
      // On GitHub Pages, always use mock data
      if (isGitHubPages) {
        console.log('GitHub Pages detected, using mock data');
        setIncidents(mockIncidents);
        setUseMockData(true);
        setLoading(false);
        return;
      }
      
      // On localhost, try backend first, fallback to mock
      if (isLocalhost) {
        try {
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
        }
      } else {
        // For other environments, use mock data
        console.log('Unknown environment, using mock data');
        setIncidents(mockIncidents);
        setUseMockData(true);
      }
    } catch (err) {
      console.log('Error fetching incidents, using mock data');
      setIncidents(mockIncidents);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (incidentId) => {
    if (useMockData) {
      // For mock data, simulate AI summarization with realistic content
      setSummarizingIncidents(prev => new Set(prev).add(incidentId));
      
      // Get the incident to generate contextual summary
      const incident = incidents.find(inc => inc.id === incidentId);
      
      // Generate progressive summaries based on incident content
      const mockSummaries = [
        "Analyzing incident data and context",
        "Processing incident details and user impact",
        "Evaluating priority level and current status",
        "Generating comprehensive incident summary",
        generateContextualSummary(incident)
      ];
      
      mockSummaries.forEach((summary, index) => {
        setTimeout(() => {
          setIncidents(prev => prev.map(inc => 
            inc.id === incidentId 
              ? { ...inc, summary }
              : inc
          ));
        }, index * 800);
      });
      
      // Complete after all summaries
      setTimeout(() => {
        setSummarizingIncidents(prev => {
          const newSet = new Set(prev);
          newSet.delete(incidentId);
          return newSet;
        });
        setStreamingDots(prev => {
          const newDots = { ...prev };
          delete newDots[incidentId];
          return newDots;
        });
      }, mockSummaries.length * 800);
      
      return;
    }

    try {
      setSummarizingIncidents(prev => new Set(prev).add(incidentId));
      
      const response = await fetch(`http://localhost:8080/api/incidents/${incidentId}/regenerate-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update the incident with new summary
        setIncidents(prev => prev.map(incident => 
          incident.id === incidentId 
            ? { ...incident, summary: data.summary }
            : incident
        ));
      } else {
        throw new Error('Failed to generate summary');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to generate summary: ' + error.message);
    } finally {
      setSummarizingIncidents(prev => {
        const newSet = new Set(prev);
        newSet.delete(incidentId);
        return newSet;
      });
      setStreamingDots(prev => {
        const newDots = { ...prev };
        delete newDots[incidentId];
        return newDots;
      });
    }
  };

  // Generate contextual summary based on incident data
  const generateContextualSummary = (incident) => {
    const { title, description, priority, status, assignedTo } = incident;
    
    let impact = '';
    if (description.includes('150') || description.includes('100%')) {
      impact = 'affecting multiple users';
    } else if (description.includes('mobile')) {
      impact = 'primarily affecting mobile users';
    } else if (description.includes('customer')) {
      impact = 'impacting customer communications';
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
          <p>🚀 Demo Mode: AI-powered incident management with mock data</p>
          <p>Try the "🤖 Summarize with AI" button to see streaming AI summarization!</p>
        </div>
      )}
      <div className="incident-grid">
        {incidents.map((incident) => {
          const isSummarizing = summarizingIncidents.has(incident.id);
          const dots = streamingDots[incident.id] || '';
          
          return (
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
              {incident.summary && (
                <div className="incident-summary">
                  <strong>Summary:</strong> {incident.summary}
                  {isSummarizing && <span className="streaming-dots">{dots}</span>}
                </div>
              )}
              <p className="incident-description">{incident.description}</p>
              <div className="incident-meta">
                <span>Assigned to: {incident.assignedTo}</span>
                <span>Created: {new Date(incident.createdAt).toLocaleDateString()}</span>
                {incident.comments && incident.comments.length > 0 && (
                  <span>Comments: {incident.comments.length}</span>
                )}
              </div>
              <div className="incident-actions">
                <button onClick={() => onViewIncident(incident)}>View</button>
                <button onClick={() => onEditIncident(incident)}>Edit</button>
                <button 
                  onClick={() => handleSummarize(incident.id)}
                  disabled={isSummarizing}
                  className="btn-summarize"
                >
                  {isSummarizing ? `🤖 Summarizing${dots}` : '🤖 Summarize with AI'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentList; 