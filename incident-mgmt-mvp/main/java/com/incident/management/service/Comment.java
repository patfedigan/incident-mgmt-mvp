package management.service;
import java.time.LocalDateTime;
import java.util.UUID;

public class Comment {
    private String id;
    private String content;
    private String authorId;
    private LocalDateTime createdAt;
    private String incidentId;
    
    public Comment(String content, String authorId, String incidentId) {
        this.id = UUID.randomUUID().toString();
        this.content = content;
        this.authorId = authorId;
        this.incidentId = incidentId;
        this.createdAt = LocalDateTime.now();
    }
    
    public String getId() { return id; }
    public String getContent() { return content; }
    public String getAuthorId() { return authorId; }
    public String getIncidentId() { return incidentId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    
    // Getters and setters
} 