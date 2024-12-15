package com.clickedtools.icebreakerbackend.dtos.requests;

import com.clickedtools.icebreakerbackend.models.enums.JournalRating;

public record JournalRequest(
        String lineId,
        JournalRating rating,
        String content
) {

}
