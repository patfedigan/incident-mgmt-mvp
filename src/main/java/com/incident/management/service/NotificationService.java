package com.incident.management.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    
    public void notifyAssignment(Incident incident, String assignedTo) {
        // TODO: Implement actual notification logic
        System.out.println("Notification: Incident " + incident.getId() + " assigned to " + assignedTo);
    }
    
    public void notifyStatusChange(Incident incident) {
        // TODO: Implement actual notification logic
        System.out.println("Notification: Incident " + incident.getId() + " status changed to " + incident.getStatus());
    }
    
    public void notifyNewComment(Incident incident, Comment comment) {
        // TODO: Implement actual notification logic
        System.out.println("Notification: New comment added to incident " + incident.getId());
    }
} 