package com.clickedtools.auth.auth;

import com.clickedtools.auth.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public void login(@RequestParam("provider") String provider, HttpServletResponse response) throws IOException {
        if (provider.equals("google")) {
            response.sendRedirect("/oauth2/authorization/google");
        } else if (provider.equals("github")) {
            response.sendRedirect("/oauth2/authorization/github");
        } else {
            throw new IllegalArgumentException("Unknown provider: " + provider);
        }
    }


    @GetMapping("/ping")
    public String ping() {
        return "pong";

    }
}
