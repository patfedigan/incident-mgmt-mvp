package com.incident.management.service;

public class SearchCriteria {
    private Incident.Status status;
    private Incident.Priority priority;
    private String assignedTo;

    public Incident.Status getStatus() { return status; }
    public void setStatus(Incident.Status status) { this.status = status; }
    public Incident.Priority getPriority() { return priority; }
    public void setPriority(Incident.Priority priority) { this.priority = priority; }
    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
} 