package com.punkpad.app.controller;

import java.util.List;

import com.punkpad.app.model.ChordProgression;
import com.punkpad.app.repository.ChordProgressionRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class ProgressionController {
    private final ChordProgressionRepository chordProgressionRepository;

    public ProgressionController(ChordProgressionRepository chordProgressionRepository) {
        this.chordProgressionRepository = chordProgressionRepository;
    }
    //GET all progressions
    @GetMapping
    public List<ChordProgression> getAllProgressions() {
        return chordProgressionRepository.findAll();
    }
    //GET progessions by user id
    @GetMapping("/user/{userId}")
    public List<ChordProgression> getProgressionsByUserId(@PathVariable Long userId) {
        return chordProgressionRepository.findByUser_Id(userId);
    }
    //POST save new progression
    @PostMapping
    public ChordProgression createProgression(@RequestBody ChordProgression progression) {
        return chordProgressionRepository.save(progression);
    }
    //DELETE progression by id
    @DeleteMapping("/{id}")
    public void deleteProgression(@PathVariable Long id) {
        chordProgressionRepository.deleteById(id);
    }
}
