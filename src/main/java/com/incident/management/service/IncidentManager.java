package com.incident.management.service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncidentManager {
    private final IncidentRepository incidentRepository;
    private final NotificationService notificationService;
    private final SummarizationService summarizationService;
    
    @Autowired
    public IncidentManager(IncidentRepository incidentRepository, NotificationService notificationService, SummarizationService summarizationService) {
        this.incidentRepository = incidentRepository;
        this.notificationService = notificationService;
        this.summarizationService = summarizationService;
    }
    
    public Incident createIncident(IncidentRequest request) {
        Incident incident = new Incident(
            request.getTitle(),
            request.getDescription(),
            request.getPriority(),
            request.getAssignedTo()
        );
        
        // Generate summary if not provided manually
        if (request.getSummary() != null && !request.getSummary().trim().isEmpty()) {
            incident.setSummary(request.getSummary());
        } else {
            String generatedSummary = summarizationService.generateSummary(incident);
            incident.setSummary(generatedSummary);
        }
        
        Incident savedIncident = incidentRepository.save(incident);
        notificationService.notifyAssignment(savedIncident, request.getAssignedTo());
        return savedIncident;
    }
    
    public Incident updateIncident(String id, IncidentRequest request) {
        Incident incident = incidentRepository.findById(id)
            .orElseThrow(() -> new IncidentNotFoundException(id));
            
        incident.setTitle(request.getTitle());
        incident.setDescription(request.getDescription());
        incident.setPriority(request.getPriority());
        incident.setAssignedTo(request.getAssignedTo());
        
        // Update summary if provided manually, otherwise regenerate
        if (request.getSummary() != null && !request.getSummary().trim().isEmpty()) {
            incident.setSummary(request.getSummary());
        } else {
            String generatedSummary = summarizationService.generateSummary(incident);
            incident.setSummary(generatedSummary);
        }
        
        Incident updatedIncident = incidentRepository.save(incident);
        notificationService.notifyStatusChange(updatedIncident);
        return updatedIncident;
    }
    
    public void assignIncident(String incidentId, String userId) {
        Incident incident = incidentRepository.findById(incidentId)
            .orElseThrow(() -> new IncidentNotFoundException(incidentId));
            
        incident.setAssignedTo(userId);
        incidentRepository.save(incident);
        notificationService.notifyAssignment(incident, userId);
    }
    
    public List<Incident> searchIncidents(SearchCriteria criteria) {
        // Basic implementation - can be enhanced based on needs
        return incidentRepository.findAll().stream()
            .filter(incident -> matchesCriteria(incident, criteria))
            .collect(Collectors.toList());
    }
    
    public void addComment(String incidentId, CommentRequest comment) {
        Incident incident = incidentRepository.findById(incidentId)
            .orElseThrow(() -> new IncidentNotFoundException(incidentId));
            
        Comment newComment = new Comment(
            comment.getContent(),
            comment.getAuthorId(),
            incidentId
        );
        
        incident.getComments().add(newComment);
        
        // Regenerate summary when new comment is added
        String updatedSummary = summarizationService.generateSummary(incident);
        incident.setSummary(updatedSummary);
        
        incidentRepository.save(incident);
        notificationService.notifyNewComment(incident, newComment);
    }
    
    private boolean matchesCriteria(Incident incident, SearchCriteria criteria) {
        return (criteria.getStatus() == null || incident.getStatus() == criteria.getStatus()) &&
               (criteria.getPriority() == null || incident.getPriority() == criteria.getPriority()) &&
               (criteria.getAssignedTo() == null || incident.getAssignedTo().equals(criteria.getAssignedTo()));
    }
    
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }
    
    public Incident getIncidentById(String id) {
        return incidentRepository.findById(id)
            .orElseThrow(() -> new IncidentNotFoundException(id));
    }
    
    public void deleteIncident(String id) {
        incidentRepository.delete(id);
    }
} 