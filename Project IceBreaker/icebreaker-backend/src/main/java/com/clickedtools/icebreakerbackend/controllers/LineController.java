package com.clickedtools.icebreakerbackend.controllers;

import com.clickedtools.icebreakerbackend.dtos.requests.LineRequest;
import com.clickedtools.icebreakerbackend.dtos.responses.LineResponse;
import com.clickedtools.icebreakerbackend.models.Line;
import com.clickedtools.icebreakerbackend.repositories.LineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lines")
public class LineController {
    @Value("${api.key}")
    String apiKey;

    @Autowired
    private LineRepository lineRepository;

    // Get a Line by ID
    @GetMapping("/{id}")
    public ResponseEntity<LineResponse> getLineById(@PathVariable String id) {
        return lineRepository.findById(id)
                .map(LineResponse::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/opening")
    public ResponseEntity<LineResponse> getLineByOpening(@RequestParam String opening) {
        System.out.println(opening);
        return lineRepository.findLineByOpening(opening)
                .map(LineResponse::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get 3 random Lines
    @GetMapping("/random")
    public ResponseEntity<List<LineResponse>> getRandomLines() {

        List<Line> randomLines = lineRepository.findRandomLines(3);
        System.out.println(randomLines + "hello");
        return ResponseEntity.ok(
                randomLines
                        .stream()
                        .map(LineResponse::new)
                        .collect(Collectors.toList())
        );
    }

    // Create a new Line
    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody LineRequest request, @RequestHeader("APP_KEY") String key) {
        if(!apiKey.equals(key))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        Line line = new Line(request);
        Line savedLine = lineRepository.save(line);
        return ResponseEntity.ok(savedLine);
    }

    // Get all Lines
    @GetMapping
    public ResponseEntity<List<LineResponse>> getAllLines(@RequestHeader("APP_KEY") String key) {
        if(!apiKey.equals(key))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        List<Line> lines = lineRepository.findAll();
        return ResponseEntity.ok(
                lines
                        .stream()
                        .map(LineResponse::new)
                        .collect(Collectors.toList())
        );
    }

    // Update a Line by ID
    @PutMapping("/{id}")
    public ResponseEntity<Line> updateLine(@PathVariable String id, @RequestBody LineRequest request, @RequestHeader("APP_KEY") String key) {
        if(!apiKey.equals(key))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return lineRepository.findById(id).map(existingLine -> {
            // Update fields
            Line updatedLine = new Line(request);
            existingLine.setOpening(updatedLine.getOpening());
            existingLine.setBestUsed(updatedLine.getBestUsed());
            existingLine.setDemonstrationUrl(updatedLine.getDemonstrationUrl());
            Line savedLine = lineRepository.save(existingLine);
            return ResponseEntity.ok(savedLine);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete a Line by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLine(@PathVariable String id, @RequestHeader("APP_KEY") String key) {
        if(!apiKey.equals(key))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        if (lineRepository.existsById(id)) {
            lineRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllLines(@RequestHeader("APP_KEY") String key) {
        if(!apiKey.equals(key))
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        lineRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
