package com.incident.management.service;

public class CommentRequest {
    private String content;
    private String authorId;

    public CommentRequest(String content, String authorId) {
        this.content = content;
        this.authorId = authorId;
    }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }
} 