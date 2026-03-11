package com.punkpad.app.controller;

import java.security.Principal;
import java.util.List;
import com.punkpad.app.dto.SaveProgressionRequest;

import com.punkpad.app.model.ChordProgression;
import com.punkpad.app.repository.UserProfileRepository;
import com.punkpad.app.service.ProgressionService;
import com.punkpad.app.repository.ChordProgressionRepository;
import com.punkpad.app.model.UserProfile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progressions")
public class ProgressionController {
    private final ChordProgressionRepository chordProgressionRepository;
    private final ProgressionService progressionService;
    private final UserProfileRepository userProfileRepository;

    public ProgressionController(ChordProgressionRepository chordProgressionRepository,
                                 ProgressionService progressionService, UserProfileRepository userProfileRepository) {
        this.chordProgressionRepository = chordProgressionRepository;
        this.progressionService = progressionService;
        this.userProfileRepository = userProfileRepository;
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
    public ChordProgression createProgression(
            @RequestBody SaveProgressionRequest request,
            Principal principal) {

        String username = principal.getName();

        UserProfile user = userProfileRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChordProgression progression = new ChordProgression();
        progression.setTitle(request.getTitle());
        progression.setMusicalKey(request.getMusicalKey());
        progression.setUser(user);

        return chordProgressionRepository.save(progression);
    }

    // Delete progression
    @DeleteMapping("/{id}")
    public void deleteProgression(@PathVariable Long id) {
        chordProgressionRepository.deleteById(id);
    }
}
