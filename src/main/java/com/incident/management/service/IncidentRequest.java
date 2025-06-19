package com.incident.management.service;

public class IncidentRequest {
    private String title;
    private String description;
    private Incident.Priority priority;
    private String assignedTo;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Incident.Priority getPriority() { return priority; }
    public void setPriority(Incident.Priority priority) { this.priority = priority; }
    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
} 