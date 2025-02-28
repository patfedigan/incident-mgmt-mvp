package management.service;
public class SearchCriteria {
    private Incident.Status status;
    private Incident.Priority priority;
    private String assignedTo;

    public Incident.Status getStatus() { return status; }
    public Incident.Priority getPriority() { return priority; }
    public String getAssignedTo() { return assignedTo; }
} 