# AI Summarization Feature Test Guide

## Backend Testing

### 1. Start Backend Server
```bash
cd /Users/patrick.fedigan/incident-mgmt-mvp
mvn spring-boot:run
```

### 2. Test API Endpoints

#### Create Incident (Auto-generates summary)
```bash
curl -X POST http://localhost:8080/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Incident",
    "description": "This is a test incident to verify AI summarization works correctly.",
    "priority": "HIGH",
    "assignedTo": "test@company.com"
  }'
```

#### Regenerate Summary
```bash
# Replace {incident-id} with actual ID from create response
curl -X POST http://localhost:8080/api/incidents/{incident-id}/regenerate-summary \
  -H "Content-Type: application/json"
```

#### Get All Incidents (Verify summaries)
```bash
curl http://localhost:8080/api/incidents
```

## Frontend Testing

### 1. Start Frontend
```bash
cd incident-mgmt-ui
npm start
```

### 2. Test Scenarios

#### Scenario 1: Create New Incident
1. Click "Create New Incident"
2. Fill in title, description, priority, assignedTo
3. Submit form
4. **Expected**: Summary field shows "Summary will be automatically generated when incident is created"
5. After creation, view incident list
6. **Expected**: New incident appears with AI-generated summary

#### Scenario 2: Edit Existing Incident
1. Click "Edit" on any incident
2. **Expected**: Summary field shows current AI-generated summary
3. Click "🔄 Regenerate" button
4. **Expected**: New summary appears (if OpenAI API key configured)
5. Edit summary manually and save
6. **Expected**: Manual summary is preserved

#### Scenario 3: Add Comment
1. Add a comment to an incident
2. **Expected**: Summary automatically regenerates to include new comment context

## Configuration

### OpenAI API Key (Optional)
To enable AI summarization, add your OpenAI API key to `src/main/resources/application.properties`:
```properties
openai.api.key=your-api-key-here
```

### Fallback Mode
Without API key, system uses fallback summary generation:
- Combines title, priority, status, and assignee
- Example: "Database Connection Failure incident with critical priority. Status: in_progress. Assigned to: john.doe@company.com."

## Expected Behavior

### With OpenAI API Key
- Summaries are 2-3 sentences focusing on what happened, impact, and current status
- Include context from recent comments
- Professional, concise language

### Without OpenAI API Key
- Fallback summaries use basic template
- Still functional but less sophisticated
- No external API calls

## Troubleshooting

### Common Issues
1. **Backend won't start**: Check Java version and Maven dependencies
2. **Frontend won't start**: Check Node.js version and npm dependencies
3. **Summary not generating**: Check OpenAI API key configuration
4. **CORS errors**: Verify backend CORS settings for localhost:3000

### Logs
Check backend logs for:
- OpenAI API errors
- Summary generation attempts
- Fallback summary usage 