package com.clickedtools.icebreakerbackend.dtos.responses;

import com.clickedtools.icebreakerbackend.models.Commitment;
import com.clickedtools.icebreakerbackend.models.enums.CommitmentStatus;

public record CommitmentResponse(
        Long id,
        LineResponse line,
        CommitmentStatus status
) {
    public CommitmentResponse(Commitment commitment) {
        this(commitment.getId(), new LineResponse(commitment.getLine()), commitment.getCommitmentStatus());
    }
}
