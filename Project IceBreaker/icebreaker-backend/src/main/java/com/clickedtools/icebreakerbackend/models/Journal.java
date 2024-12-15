package com.clickedtools.icebreakerbackend.models;

import com.clickedtools.icebreakerbackend.dtos.requests.JournalRequest;
import com.clickedtools.icebreakerbackend.models.enums.JournalRating;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
public class Journal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String userId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "line_id", nullable = false)
    private Line line;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JournalRating rating;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private int likes;

    public Journal() {
    }
    public Journal(JournalRequest request, String userId, Line line) {
        this.userId = userId;
        this.line = line;
        rating = request.rating();
        content = request.content();
        likes = 1;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public void setRating(JournalRating rating) {
        this.rating = rating;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public Line getLine() {
        return line;
    }

    public JournalRating getRating() {
        return rating;
    }

    public String getContent() {
        return content;
    }

    public int getLikes() {
        return likes;
    }
}
