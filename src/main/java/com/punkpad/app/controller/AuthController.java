package com.punkpad.app.controller;

import com.punkpad.app.model.User;
import com.punkpad.app.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {

        return userRepository
                .findByUsername(loginRequest.getUsername())
                .orElseGet(() ->
                        userRepository.save(new User(loginRequest.getUsername()))
                );
    }
}


