package com.punkpad.app.controller;

import com.punkpad.app.model.ChordProgression;
import com.punkpad.app.repository.ChordProgressionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class ProgressionController {
    private final ChordProgressionRepository chordProgressionRepository;

    public ProgressionController(ChordProgressionRepository chordProgressionRepository) {
        this.chordProgressionRepository = chordProgressionRepository;
    }

    @GetMapping("/user/{userId}")
    public List<ChordProgression> getProgressionsByUserId(@PathVariable Long userId) {
        return chordProgressionRepository.findUserId(userId);
    }
@PostMapping
