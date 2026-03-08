package com.punkpad.app.controller;

import java.util.List;
import java.util.Map;

import com.punkpad.app.model.ChordProgression;
import com.punkpad.app.repository.UserRepository;
import com.punkpad.app.service.ProgressionService;
import com.punkpad.app.repository.ChordProgressionRepository;
import com.punkpad.app.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/progressions")
public class ProgressionController {
    private final ChordProgressionRepository chordProgressionRepository;
    private final ProgressionService progressionService;
    private final UserRepository userRepository;

    public ProgressionController(ChordProgressionRepository chordProgressionRepository,
                                 ProgressionService progressionService, UserRepository userRepository) {
        this.chordProgressionRepository = chordProgressionRepository;
        this.progressionService = progressionService;
        this.userRepository = userRepository;
    }

        @GetMapping("/generate")
                public List<String> generateProgression(
                        @RequestParam Long subGenreId,
        @RequestParam String musicalKey) {
        return progressionService.generateProgression(subGenreId, musicalKey);
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
    // Save new progression
    @PostMapping
    public ChordProgression createProgression(@RequestBody Map<String, Object> body) {

        String title = (String) body.get("title");
        String musicalKey = (String) body.get("musicalKey");
        Long userId = Long.valueOf(body.get("userId").toString());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChordProgression progression = new ChordProgression();
        progression.setTitle(title);
        progression.setMusicalKey(musicalKey);
        progression.setUser(user);

        return chordProgressionRepository.save(progression);
    }

    // Delete progression
    @DeleteMapping("/{id}")
    public void deleteProgression(@PathVariable Long id) {
        chordProgressionRepository.deleteById(id);
    }
}

