package com.punkpad.app.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.punkpad.app.model.SubGenre;
import com.punkpad.app.repository.SubGenreRepository;

@RestController
@RequestMapping("/api/genres/{genreId}/subgenres")
public class SubGenreController {

    private final SubGenreRepository subGenreRepository;

    public SubGenreController(SubGenreRepository subGenreRepository) {
        this.subGenreRepository = subGenreRepository;
    }

    @GetMapping
    public List<SubGenre> getSubGenresByGenre(@PathVariable Long genreId) {
        return subGenreRepository.findByGenreId(genreId);
    }
    @GetMapping("/{subGenreId}")
    public SubGenre getSubGenreById(
            @PathVariable Long genreId,
            @PathVariable Long subGenreId) {

        return subGenreRepository.findById(subGenreId).orElse(null);
    }
}
