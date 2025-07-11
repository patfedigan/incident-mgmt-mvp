package com.incident.management.controller;

import com.incident.management.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:3000")
public class IncidentController {

    @Autowired
    private IncidentManager incidentManager;
    
    @Autowired
    private SummarizationService summarizationService;

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents() {
        List<Incident> incidents = incidentManager.getAllIncidents();
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable String id) {
        try {
            Incident incident = incidentManager.getIncidentById(id);
            return ResponseEntity.ok(incident);
        } catch (IncidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody IncidentRequest request) {
        try {
            Incident incident = incidentManager.createIncident(request);
            return ResponseEntity.ok(incident);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable String id, @RequestBody IncidentRequest request) {
        try {
            Incident incident = incidentManager.updateIncident(id, request);
            return ResponseEntity.ok(incident);
        } catch (IncidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable String id) {
        try {
            incidentManager.deleteIncident(id);
            return ResponseEntity.ok().build();
        } catch (IncidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Incident> addComment(@PathVariable String id, @RequestBody CommentRequest request) {
        try {
            incidentManager.addComment(id, request);
            Incident incident = incidentManager.getIncidentById(id);
            return ResponseEntity.ok(incident);
        } catch (IncidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/regenerate-summary")
    public ResponseEntity<Map<String, String>> regenerateSummary(@PathVariable String id) {
        try {
            Incident incident = incidentManager.getIncidentById(id);
            String newSummary = summarizationService.generateSummary(incident);
            
            // Update the incident with new summary
            incident.setSummary(newSummary);
            incidentManager.updateIncident(id, new IncidentRequest() {{
                setTitle(incident.getTitle());
                setDescription(incident.getDescription());
                setPriority(incident.getPriority());
                setAssignedTo(incident.getAssignedTo());
                setSummary(newSummary);
            }});
            
            return ResponseEntity.ok(Map.of("summary", newSummary));
        } catch (IncidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 