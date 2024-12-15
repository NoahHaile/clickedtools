package com.clickedtools.icebreakerbackend.dtos.responses;

import com.clickedtools.icebreakerbackend.models.Commitment;
import com.clickedtools.icebreakerbackend.models.Commitments;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

public record CommitmentsResponse(
        long expiry,
        List<CommitmentResponse> commitment
) {
    public CommitmentsResponse(Commitments commitments) {
        this(
                commitments.getExpiry().toInstant(ZoneOffset.UTC).toEpochMilli(),
                commitments
                    .getCommitmentList()
                        .stream()
                        .map(CommitmentResponse::new)
                        .collect(Collectors.toList()));
    }
}
