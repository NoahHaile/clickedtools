package com.clickedtools.icebreakerbackend.models;

import com.clickedtools.icebreakerbackend.models.enums.CommitmentStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
public class Commitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "commitments_id", nullable = false)
    private Commitments commitments;

    @ManyToOne(optional = false)
    @JoinColumn(name = "line_id", nullable = false)
    private Line line;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommitmentStatus commitmentStatus;

    public Commitment(Commitments commitments, Line line) {
        this.commitments = commitments;
        this.line = line;
        commitmentStatus = CommitmentStatus.PENDING;
    }

    public Commitment() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCommitments(Commitments commitments) {
        this.commitments = commitments;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public void setCommitmentStatus(CommitmentStatus commitmentStatus) {
        this.commitmentStatus = commitmentStatus;
    }

    public Long getId() {
        return id;
    }

    public Commitments getCommitments() {
        return commitments;
    }

    public Line getLine() {
        return line;
    }

    public CommitmentStatus getCommitmentStatus() {
        return commitmentStatus;
    }
}
