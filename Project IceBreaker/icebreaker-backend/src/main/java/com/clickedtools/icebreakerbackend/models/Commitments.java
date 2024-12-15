package com.clickedtools.icebreakerbackend.models;

import com.clickedtools.icebreakerbackend.dtos.requests.CommitmentRequest;
import com.clickedtools.icebreakerbackend.models.enums.CommitmentStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Commitments {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String userId;

    @OneToMany(mappedBy = "commitments", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Commitment> commitmentList;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime expiry;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommitmentStatus commitmentStatus;

    public Commitments() {
    }

    public Commitments(String userId) {
        this.userId = userId;
        expiry = LocalDateTime.now().plusSeconds(172800);
        commitmentStatus = CommitmentStatus.PENDING;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setCommitmentList(List<Commitment> commitmentList) {
        this.commitmentList = commitmentList;
    }

    public void setExpiry(LocalDateTime expiry) {
        this.expiry = expiry;
    }

    public void setCommitmentStatus(CommitmentStatus commitmentStatus) {
        this.commitmentStatus = commitmentStatus;
    }

    public CommitmentStatus getCommitmentStatus() {
        return commitmentStatus;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public List<Commitment> getCommitmentList() {
        return commitmentList;
    }

    public LocalDateTime getExpiry() {
        return expiry;
    }
}
