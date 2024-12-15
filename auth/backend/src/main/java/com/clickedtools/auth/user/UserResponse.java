package com.clickedtools.auth.user;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public record UserResponse(UUID id, String email, Date date) {
    public static UserResponse initializeWithResultSet(ResultSet rs, int rowNum) {
        try {
            return new UserResponse(
                    UUID.fromString(rs.getString("id")),
                    rs.getString("email"),
                    rs.getDate("createdAt")
            );
        } catch (SQLException e) {
            throw new IllegalStateException("Database integration failure when mapping rows.");
        }
    }
}
