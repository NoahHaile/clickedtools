package com.clickedtools.icebreakerbackend.repositories;

import com.clickedtools.icebreakerbackend.models.Commitments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommitmentsRepository  extends JpaRepository<Commitments, String> {
    @Query("SELECT c FROM Commitments c WHERE c.expiry > CURRENT_DATE AND c.userId = :userId AND c.commitmentStatus = 'PENDING'")
    Optional<Commitments> findByUserIdAndNotExpiredAndCommitmentStatus_Pending(@Param("userId") String userId);
}
