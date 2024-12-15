package com.clickedtools.icebreakerbackend.dtos.responses;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateCountDTO {

    private LocalDate date;
    private Long count;

    public DateCountDTO(LocalDate date, Long count) {
        this.date = date;
        this.count = count;
    }

    public DateCountDTO() {
    }

    // Getter for date, formatted as yyyy-MM-dd
    public String getDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return date.format(formatter);
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
