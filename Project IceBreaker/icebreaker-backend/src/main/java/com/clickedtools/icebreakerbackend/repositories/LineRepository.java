package com.clickedtools.icebreakerbackend.repositories;

import com.clickedtools.icebreakerbackend.models.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LineRepository extends JpaRepository<Line, String> {
    @Query(value = "SELECT * FROM line ORDER BY RANDOM() LIMIT :count", nativeQuery = true)
    List<Line> findRandomLines(@Param("count") int count);

    @Query(value = "SELECT * FROM line WHERE opening = :opening", nativeQuery = true)
    Optional<Line> findLineByOpening(@Param("opening") String opening);
}
