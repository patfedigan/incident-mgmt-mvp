import React, { useState, useEffect } from 'react';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import './App.css';

function App() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingIncident, setEditingIncident] = useState(null);
  const [mockIncidents, setMockIncidents] = useState([]);
  const [isGitHubPages, setIsGitHubPages] = useState(false);

  useEffect(() => {
    // Check if we're on GitHub Pages
    const isGitHub = window.location.hostname === 'patfedigan.github.io' || 
                    window.location.hostname.includes('github.io');
    setIsGitHubPages(isGitHub);
  }, []);

  const handleCreateNew = () => {
    setEditingIncident(null);
    setView('form');
  };

  const handleEditIncident = (incident) => {
    setEditingIncident(incident);
    setView('form');
  };

  const handleViewIncident = (incident) => {
    // For now, just edit the incident. You could create a separate view component
    handleEditIncident(incident);
  };

  const handleFormSubmit = (incident) => {
    if (isGitHubPages) {
      // Handle mock incident creation/update for GitHub Pages
      if (editingIncident) {
        // Update existing incident
        setMockIncidents(prev => prev.map(inc => 
          inc.id === editingIncident.id ? incident : inc
        ));
      } else {
        // Create new incident
        setMockIncidents(prev => [...prev, incident]);
      }
    }
    
    // Refresh the list and go back to list view
    setView('list');
    setEditingIncident(null);
  };

  const handleFormCancel = () => {
    setView('list');
    setEditingIncident(null);
  };

  // Pass mock incidents to IncidentList for GitHub Pages
  const handleIncidentListProps = () => {
    if (isGitHubPages) {
      return {
        onEditIncident: handleEditIncident,
        onViewIncident: handleViewIncident,
        mockIncidents: mockIncidents
      };
    }
    return {
      onEditIncident: handleEditIncident,
      onViewIncident: handleViewIncident
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Incident Management System</h1>
        {isGitHubPages && (
          <div className="github-pages-notice">
            <p>🚀 GitHub Pages Demo - AI-Powered Incident Management</p>
          </div>
        )}
        {view === 'list' && (
          <button onClick={handleCreateNew} className="create-button">
            Create New Incident
          </button>
        )}
      </header>
      
      <main className="App-main">
        {view === 'list' ? (
          <IncidentList 
            {...handleIncidentListProps()}
          />
        ) : (
          <IncidentForm 
            incident={editingIncident}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
