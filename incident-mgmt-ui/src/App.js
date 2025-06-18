import React, { useState } from 'react';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import './App.css';

function App() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingIncident, setEditingIncident] = useState(null);

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
    // Refresh the list and go back to list view
    setView('list');
    setEditingIncident(null);
    // You might want to trigger a refresh of the incident list here
  };

  const handleFormCancel = () => {
    setView('list');
    setEditingIncident(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Incident Management System</h1>
        {view === 'list' && (
          <button onClick={handleCreateNew} className="create-button">
            Create New Incident
          </button>
        )}
      </header>
      
      <main className="App-main">
        {view === 'list' ? (
          <IncidentList 
            onEditIncident={handleEditIncident}
            onViewIncident={handleViewIncident}
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
