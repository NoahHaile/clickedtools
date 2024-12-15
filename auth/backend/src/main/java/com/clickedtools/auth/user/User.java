package com.clickedtools.auth.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "users")
public class User {
    @Id
    @Column("id")
    Long id;
    @Column("open_id")
    String openId;
    @Column("email")
    String email;

    public User(String openId, String email) {
        this.id = id;
        this.openId = openId;
        this.email = email;
    }
}
