package com.incident.management.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class IncidentRepository {
    private Map<String, Incident> incidents = new HashMap<>();
    
    public IncidentRepository() {
        // Initialize with sample data
        initializeSampleData();
    }
    
    private void initializeSampleData() {
        // Sample Incident 1
        Incident incident1 = new Incident(
            "Database Connection Failure",
            "Users are unable to connect to the main database. Error 500 appears on login attempts.",
            Incident.Priority.CRITICAL,
            "john.doe@company.com"
        );
        incident1.setStatus(Incident.Status.IN_PROGRESS);
        incidents.put(incident1.getId(), incident1);
        
        // Sample Incident 2
        Incident incident2 = new Incident(
            "Email Service Down",
            "Outgoing emails are not being delivered. SMTP server appears to be unresponsive.",
            Incident.Priority.HIGH,
            "sarah.smith@company.com"
        );
        incidents.put(incident2.getId(), incident2);
        
        // Sample Incident 3
        Incident incident3 = new Incident(
            "UI Responsiveness Issue",
            "Dashboard page is loading slowly on mobile devices. Performance degradation reported.",
            Incident.Priority.MEDIUM,
            "mike.johnson@company.com"
        );
        incident3.setStatus(Incident.Status.PENDING);
        incidents.put(incident3.getId(), incident3);
        
        // Sample Incident 4
        Incident incident4 = new Incident(
            "Password Reset Feature",
            "Users cannot reset their passwords. Reset link is not working properly.",
            Incident.Priority.HIGH,
            "admin@company.com"
        );
        incident4.setStatus(Incident.Status.RESOLVED);
        incidents.put(incident4.getId(), incident4);
        
        // Sample Incident 5
        Incident incident5 = new Incident(
            "Document Upload Issue",
            "File upload feature is not working for files larger than 10MB.",
            Incident.Priority.LOW,
            "tech.support@company.com"
        );
        incidents.put(incident5.getId(), incident5);
    }
    
    public Incident save(Incident incident) {
        incidents.put(incident.getId(), incident);
        return incident;
    }
    
    public Optional<Incident> findById(String id) {
        return Optional.ofNullable(incidents.get(id));
    }
    
    public List<Incident> findAll() {
        return new ArrayList<>(incidents.values());
    }
    
    public List<Incident> findByStatus(Incident.Status status) {
        return incidents.values().stream()
            .filter(i -> i.getStatus() == status)
            .collect(Collectors.toList());
    }
    
    public List<Incident> findByAssignee(String userId) {
        return incidents.values().stream()
            .filter(i -> userId.equals(i.getAssignedTo()))
            .collect(Collectors.toList());
    }
    
    public void delete(String id) {
        incidents.remove(id);
    }
} 