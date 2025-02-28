public class NotificationService {
    public void notifyAssignment(Incident incident, String userId) {
        System.out.println("Notification: Incident " + incident.getId() + 
            " assigned to user " + userId);
    }
    
    public void notifyStatusChange(Incident incident) {
        System.out.println("Notification: Incident " + incident.getId() + 
            " status changed to " + incident.getStatus());
    }
    
    public void notifyNewComment(Incident incident, Comment comment) {
        System.out.println("Notification: New comment added to incident " + 
            incident.getId());
    }
} 