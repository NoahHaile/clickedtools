package com.clickedtools.icebreakerbackend.dtos.responses;

import com.clickedtools.icebreakerbackend.models.Line;
import jakarta.persistence.Column;

public record LineResponse(
        String id,
        String opening,
        String bestUsed,
        String demonstrationUrl
) {
    public LineResponse(Line line) {
        this(line.getId(), line.getOpening(), line.getBestUsed(), line.getDemonstrationUrl());
    }
}
