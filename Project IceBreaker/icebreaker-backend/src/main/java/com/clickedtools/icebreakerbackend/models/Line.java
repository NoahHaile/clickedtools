package com.clickedtools.icebreakerbackend.models;

import com.clickedtools.icebreakerbackend.dtos.requests.LineRequest;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
public class Line {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String opening;

    @Column(nullable = false)
    private String bestUsed;

    @Column(nullable = false)
    private String demonstrationUrl;

    @OneToMany(mappedBy = "line", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commitment> commitments;

    @OneToMany(mappedBy = "line", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Journal> journals;

    public Line(){

    }
    public Line(LineRequest request) {
        opening = request.opening();
        bestUsed = request.bestUsed();
        demonstrationUrl = request.demonstrationUrl();
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setOpening(String opening) {
        this.opening = opening;
    }

    public void setBestUsed(String bestUsed) {
        this.bestUsed = bestUsed;
    }

    public void setDemonstrationUrl(String demonstrationUrl) {
        this.demonstrationUrl = demonstrationUrl;
    }

    public void setCommitments(List<Commitment> commitments) {
        this.commitments = commitments;
    }

    public void setJournals(List<Journal> journals) {
        this.journals = journals;
    }

    public String getId() {
        return id;
    }

    public String getOpening() {
        return opening;
    }

    public String getBestUsed() {
        return bestUsed;
    }

    public String getDemonstrationUrl() {
        return demonstrationUrl;
    }

    public List<Commitment> getCommitments() {
        return commitments;
    }

    public List<Journal> getJournals() {
        return journals;
    }
}
