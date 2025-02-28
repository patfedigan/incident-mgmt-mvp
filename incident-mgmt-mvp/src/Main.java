public class Main {
    public static void main(String[] args) {
        IncidentManager manager = new IncidentManager();
        
        // Create a new incident
        IncidentRequest request = new IncidentRequest(
            "System Outage",
            "Production system is down",
            Incident.Priority.CRITICAL,
            "john.doe"
        );
        
        Incident incident = manager.createIncident(request);
        System.out.println("Created incident: " + incident.getId());
        
        // Add a comment
        CommentRequest commentRequest = new CommentRequest(
            "Investigation started",
            "jane.smith"
        );
        manager.addComment(incident.getId(), commentRequest);
    }
}
