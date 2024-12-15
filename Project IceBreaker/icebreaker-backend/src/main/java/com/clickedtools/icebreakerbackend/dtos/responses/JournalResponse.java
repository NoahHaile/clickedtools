package com.clickedtools.icebreakerbackend.dtos.responses;

import com.clickedtools.icebreakerbackend.models.Journal;
import com.clickedtools.icebreakerbackend.models.enums.JournalRating;

public record JournalResponse(
        String id,
        String opening,
        JournalRating rating,
        String content,
        int likes
) {
    public JournalResponse(Journal journal) {
        this(journal.getId(), journal.getLine().getOpening(), journal.getRating(), journal.getContent(), journal.getLikes());
    }
}
