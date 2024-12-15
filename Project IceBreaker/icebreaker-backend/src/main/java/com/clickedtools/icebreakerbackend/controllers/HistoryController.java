package com.clickedtools.icebreakerbackend.controllers;

import com.clickedtools.icebreakerbackend.dtos.responses.DateCountDTO;
import com.clickedtools.icebreakerbackend.repositories.HistoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.clickedtools.icebreakerbackend.utils.WebsiteUtils.extractUserIdFromJwt;

@RestController
@RequestMapping("/api/timeline")
public class HistoryController {

    private final HistoryRepository historyRepository;

    public HistoryController(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @GetMapping
    public ResponseEntity<List<DateCountDTO>> getHistoryByUserId(Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        List<DateCountDTO> result = historyRepository.groupAndCountByDateWhereUserId(userId);
        return ResponseEntity.ok(result);
    }
}
