package com.punkpad.app.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.punkpad.app.model.SubGenre;
import com.punkpad.app.repository.SubGenreRepository;

@RestController
@RequestMapping("/genres/{genreId}/subgenres")
public class SubGenreController {

    private final SubGenreRepository subGenreRepository;

    public SubGenreController(SubGenreRepository subGenreRepository) {
        this.subGenreRepository = subGenreRepository;
    }

    @GetMapping
    public List<SubGenre> getSubGenresByGenre(@RequestParam Long genreId) {
        return subGenreRepository.findByGenreId(genreId);
    }
}
