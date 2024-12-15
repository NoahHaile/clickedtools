package com.clickedtools.icebreakerbackend.repositories;

import com.clickedtools.icebreakerbackend.models.Journal;
import com.clickedtools.icebreakerbackend.models.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, String> {
    @Query(value = "SELECT * FROM journal WHERE user_id = :userId ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Journal> findRandomJournalByUserId(@Param("count") int count, @Param("userId") String userId);

    @Query(value = "SELECT * FROM journal WHERE user_id != :userId ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Journal> findRandomJournals(@Param("count") int count, @Param("userId") String userId);
}
