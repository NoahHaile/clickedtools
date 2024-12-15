package com.clickedtools.icebreakerbackend.controllers;

import com.clickedtools.icebreakerbackend.dtos.requests.JournalRequest;
import com.clickedtools.icebreakerbackend.dtos.responses.JournalResponse;
import com.clickedtools.icebreakerbackend.models.Journal;
import com.clickedtools.icebreakerbackend.models.Line;
import com.clickedtools.icebreakerbackend.repositories.JournalRepository;
import com.clickedtools.icebreakerbackend.repositories.LineRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.clickedtools.icebreakerbackend.utils.WebsiteUtils.extractUserIdFromJwt;

@RestController
@RequestMapping("/api/journal")
public class JournalController {

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private LineRepository lineRepository;

    // Create a new Journal
    @PostMapping
    public ResponseEntity<JournalResponse> createJournal(@RequestBody JournalRequest request, Authentication authentication) {

        String userId = extractUserIdFromJwt(authentication);
        // Ensure the Line exists before associating it with the Journal
        Line line = lineRepository.findById(request.lineId())
                .orElseThrow(() -> new EntityNotFoundException("Line not found"));

        Journal journal = new Journal(request, userId, line);
        Journal savedJournal = journalRepository.save(journal);

        return new ResponseEntity<>(new JournalResponse(savedJournal), HttpStatus.CREATED);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<String> likeJournal(@PathVariable String id) {
        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Journal not found"));
        journal.setLikes(journal.getLikes() + 1);
        journalRepository.save(journal);
        return ResponseEntity.ok("");
    }

    @GetMapping("/personal")
    public ResponseEntity<List<JournalResponse>> getRandomPersonalJournals(Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        List<Journal> personalJournals = journalRepository.findRandomJournalByUserId(3, userId);
        return ResponseEntity.ok(
                personalJournals
                        .stream()
                        .map(JournalResponse::new)
                        .collect(Collectors.toList()));
    }

    @GetMapping("/popular")
    public ResponseEntity<List<JournalResponse>> getRandomJournals(Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        List<Journal> personalJournals = journalRepository.findRandomJournals(3, userId);
        return ResponseEntity.ok(
                personalJournals
                        .stream()
                        .map(JournalResponse::new)
                        .collect(Collectors.toList()));
    }

    // Get a Journal by ID
    @GetMapping("/{id}")
    public ResponseEntity<JournalResponse> getJournalById(@PathVariable String id) {
        return journalRepository.findById(id)
                .map(JournalResponse::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a Journal by ID
    @PutMapping("/{id}")
    public ResponseEntity<JournalResponse> updateJournal(@PathVariable String id, @RequestBody JournalRequest updatedJournal, Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        return journalRepository.findById(id).map(existingJournal -> {
            // Update fields
            if (!userId.equals(existingJournal.getUserId())) {
                throw new IllegalArgumentException();
            }
            existingJournal.setRating(updatedJournal.rating());
            existingJournal.setContent(updatedJournal.content());
            Journal savedJournal = journalRepository.save(existingJournal);
            return ResponseEntity.ok(new JournalResponse(savedJournal));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete a Journal by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJournal(@PathVariable String id, Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        Journal journal = journalRepository.findById(id).orElseThrow();

        if (!userId.equals(journal.getUserId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        journalRepository.deleteById(id);
        return ResponseEntity.noContent().build();

    }
}
