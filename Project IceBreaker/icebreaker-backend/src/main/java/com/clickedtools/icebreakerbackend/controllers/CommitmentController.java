package com.clickedtools.icebreakerbackend.controllers;

import com.clickedtools.icebreakerbackend.dtos.requests.CommitmentRequest;
import com.clickedtools.icebreakerbackend.dtos.responses.CommitmentResponse;
import com.clickedtools.icebreakerbackend.dtos.responses.CommitmentsResponse;
import com.clickedtools.icebreakerbackend.models.Commitment;
import com.clickedtools.icebreakerbackend.models.Commitments;
import com.clickedtools.icebreakerbackend.models.History;
import com.clickedtools.icebreakerbackend.models.Line;
import com.clickedtools.icebreakerbackend.models.enums.CommitmentStatus;
import com.clickedtools.icebreakerbackend.repositories.CommitmentsRepository;
import com.clickedtools.icebreakerbackend.repositories.HistoryRepository;
import com.clickedtools.icebreakerbackend.repositories.LineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.clickedtools.icebreakerbackend.utils.WebsiteUtils.extractUserIdFromJwt;

@RestController
@RequestMapping("/api/commitment")
public class CommitmentController {

    @Autowired
    private CommitmentsRepository commitmentsRepository;
    @Autowired
    private LineRepository lineRepository;
    @Autowired
    private HistoryRepository historyRepository;

    // Create a new Commitment
    @PostMapping
    public ResponseEntity<CommitmentsResponse> createCommitment(@RequestBody CommitmentRequest request, Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);

        if (commitmentsRepository.findByUserIdAndNotExpiredAndCommitmentStatus_Pending(userId).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        List<Line> lines = request.lineIds()
                .stream()
                .map(id -> lineRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Line not found for id: " + id)))
                .toList();


        Commitments commitments = new Commitments(userId);
        List<Commitment> commitmentList = lines
                .stream()
                .map(line -> new Commitment(commitments, line))
                .toList();
        commitments.setCommitmentList(commitmentList);
        Commitments savedCommitments = commitmentsRepository.save(commitments);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CommitmentsResponse(savedCommitments));
    }

    @GetMapping
    public ResponseEntity<CommitmentsResponse> getCommitment(Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        var commitment = commitmentsRepository.findByUserIdAndNotExpiredAndCommitmentStatus_Pending(userId);
        return commitment
                .map(commitments -> new ResponseEntity<>(new CommitmentsResponse(commitments), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/give_up")
    public ResponseEntity<CommitmentsResponse> giveUpCommitment(Authentication authentication) {
        String userId = extractUserIdFromJwt(authentication);
        var optionalCommitment = commitmentsRepository.findByUserIdAndNotExpiredAndCommitmentStatus_Pending(userId);
        if(optionalCommitment.isPresent()) {
            Commitments commitment = optionalCommitment.get();
            commitment.setCommitmentStatus(CommitmentStatus.FAILED);
            return new ResponseEntity<>(new CommitmentsResponse(commitmentsRepository.save(commitment)), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update a Commitment
    @PutMapping("/{id}")
    public ResponseEntity<CommitmentsResponse> updateCommitment(
            @PathVariable Long id,
            @RequestBody CommitmentStatus commitmentStatus,
            Authentication authentication) {

        String userId = extractUserIdFromJwt(authentication);

        var optionalCommitments = commitmentsRepository.findByUserIdAndNotExpiredAndCommitmentStatus_Pending(userId);
        if(optionalCommitments.isPresent()) {
            Commitments commitments = optionalCommitments.get();
            Optional<Commitment> optionalCommitment = commitments.getCommitmentList().stream()
                    .filter(l -> l.getId().equals(id))
                    .findFirst();
            if(optionalCommitment.isPresent()) {
                Commitment commitment = optionalCommitment.get();
                if(!commitment.getCommitmentStatus().equals(commitmentStatus)) {
                    commitment.setCommitmentStatus(commitmentStatus);
                    if(commitments.getCommitmentList()
                            .stream()
                            .filter((c) -> c.getCommitmentStatus().equals(CommitmentStatus.PENDING))
                            .toList().isEmpty()
                    ) {
                        commitments.setCommitmentStatus(CommitmentStatus.COMPLETED);
                    }
                    commitmentsRepository.save(commitments);
                    History history = new History(userId);
                    historyRepository.save(history);

                }
                return new ResponseEntity<>(new CommitmentsResponse(commitments), HttpStatus.OK);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

}
