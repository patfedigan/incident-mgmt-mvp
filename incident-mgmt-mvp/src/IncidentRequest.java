public class IncidentRequest {
    private String title;
    private String description;
    private Incident.Priority priority;
    private String assignedTo;

    public IncidentRequest(String title, String description, Incident.Priority priority, String assignedTo) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.assignedTo = assignedTo;
    }

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Incident.Priority getPriority() { return priority; }
    public String getAssignedTo() { return assignedTo; }
} 