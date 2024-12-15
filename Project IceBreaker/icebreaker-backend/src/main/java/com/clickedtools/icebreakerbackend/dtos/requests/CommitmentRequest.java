package com.clickedtools.icebreakerbackend.dtos.requests;

import java.util.Date;
import java.util.List;

public record CommitmentRequest(
        List<String> lineIds

) {
}
