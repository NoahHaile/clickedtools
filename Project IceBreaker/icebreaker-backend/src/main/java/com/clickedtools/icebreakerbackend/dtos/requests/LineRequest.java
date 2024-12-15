package com.clickedtools.icebreakerbackend.dtos.requests;

import com.clickedtools.icebreakerbackend.models.Line;

public record LineRequest(
        String opening,
        String bestUsed,
        String demonstrationUrl
) {

}
