package com.punkpad.app.controller;

import java.util.List;

import com.punkpad.app.model.ChordProgression;
import com.punkpad.app.service.ProgressionService;
import com.punkpad.app.repository.ChordProgressionRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progressions")
public class ProgressionController {
    private final ChordProgressionRepository chordProgressionRepository;
    private final ProgressionService progressionService;

    public ProgressionController(ChordProgressionRepository chordProgressionRepository, ProgressionService progressionService) {
        this.chordProgressionRepository = chordProgressionRepository;
        this.progressionService = progressionService;
    }

        @GetMapping("/generate")
                public List<String> generateProgression(
                        @RequestParam Long subGenre_Id,
        @RequestParam String musicalKey) {
                return progressionService.generateProgression(subGenre_Id, musicalKey);
    }
    //GET all progressions
    @GetMapping
    public List<ChordProgression> getAllProgressions() {
        return chordProgressionRepository.findAll();
    }
    //GET progressions by user id
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
