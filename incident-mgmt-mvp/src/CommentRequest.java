public class CommentRequest {
    private String content;
    private String authorId;

    public CommentRequest(String content, String authorId) {
        this.content = content;
        this.authorId = authorId;
    }

    public String getContent() { return content; }
    public String getAuthorId() { return authorId; }
} 