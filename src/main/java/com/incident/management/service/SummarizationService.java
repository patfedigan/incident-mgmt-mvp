package com.incident.management.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

@Service
public class SummarizationService {
    
    @Value("${openai.api.key:}")
    private String openaiApiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1/chat/completions}")
    private String openaiApiUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public String generateSummary(Incident incident) {
        if (openaiApiKey == null || openaiApiKey.isEmpty()) {
            return generateFallbackSummary(incident);
        }
        
        try {
            String prompt = buildSummaryPrompt(incident);
            String summary = callOpenAI(prompt);
            return summary != null ? summary : generateFallbackSummary(incident);
        } catch (Exception e) {
            // Log error and fall back to basic summary
            return generateFallbackSummary(incident);
        }
    }
    
    private String buildSummaryPrompt(Incident incident) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Summarize this incident in 2-3 sentences focusing on what happened, impact, and current status:\n\n");
        prompt.append("Title: ").append(incident.getTitle()).append("\n");
        prompt.append("Description: ").append(incident.getDescription()).append("\n");
        prompt.append("Priority: ").append(incident.getPriority()).append("\n");
        prompt.append("Status: ").append(incident.getStatus()).append("\n");
        prompt.append("Assigned to: ").append(incident.getAssignedTo()).append("\n");
        
        List<Comment> comments = incident.getComments();
        if (!comments.isEmpty()) {
            prompt.append("Recent comments:\n");
            comments.stream()
                .limit(3) // Only include last 3 comments
                .forEach(comment -> prompt.append("- ").append(comment.getContent()).append("\n"));
        }
        
        return prompt.toString();
    }
    
    private String callOpenAI(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openaiApiKey);
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));
        requestBody.put("max_tokens", 150);
        requestBody.put("temperature", 0.3);
        
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        
        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.postForEntity(openaiApiUrl, request, (Class<Map<String, Object>>)(Class<?>)Map.class);
            Map<String, Object> responseBody = response.getBody();
            
            if (responseBody != null && responseBody.containsKey("choices")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            // Log error
        }
        
        return null;
    }
    
    private String generateFallbackSummary(Incident incident) {
        return String.format("%s incident with %s priority. Status: %s. Assigned to: %s.",
            incident.getTitle(),
            incident.getPriority().toString().toLowerCase(),
            incident.getStatus().toString().toLowerCase(),
            incident.getAssignedTo()
        );
    }
} 