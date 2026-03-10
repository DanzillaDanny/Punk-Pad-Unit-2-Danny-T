package com.punkpad.app.controller;

import com.punkpad.app.model.User;
import com.punkpad.app.dto.LoginRequest;
import com.punkpad.app.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {

        String username = request.getUsername();

        if (username == null || username.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username is required"));
        }

        String normalizedUsername = username.trim().toLowerCase();

        if (normalizedUsername.length() > 50) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username too long"));
        }

        User user = userRepository.findByUsername(normalizedUsername)
                .orElseGet(() -> userRepository.save(new User(normalizedUsername)));

        session.setAttribute("userId", user.getId());
        session.setAttribute("username", user.getUsername());

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Not logged in"));
        }

        return ResponseEntity.ok(Map.of(
                "id", userId,
                "username", session.getAttribute("username")
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }
}