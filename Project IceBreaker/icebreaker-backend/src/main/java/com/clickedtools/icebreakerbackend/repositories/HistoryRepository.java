package com.clickedtools.icebreakerbackend.repositories;

import com.clickedtools.icebreakerbackend.dtos.responses.DateCountDTO;
import com.clickedtools.icebreakerbackend.models.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, String> {

    @Query("SELECT new com.clickedtools.icebreakerbackend.dtos.responses.DateCountDTO(h.date, COUNT(h)) " +
            "FROM History h " +
            "WHERE h.userId = :userId " +
            "GROUP BY h.date " +
            "ORDER BY h.date ASC")
    List<DateCountDTO> groupAndCountByDateWhereUserId(@Param("userId") String userId);

}
