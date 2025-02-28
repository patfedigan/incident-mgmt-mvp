package management.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class IncidentRepository {
    private Map<String, Incident> incidents = new HashMap<>();
    
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