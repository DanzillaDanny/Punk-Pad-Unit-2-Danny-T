package com.punkpad.app.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.punkpad.app.model.SubGenre;
import com.punkpad.app.repository.SubGenreRespository;

@RestController
@RequestMapping("/genres/{genreId}/subgenres")
public class SubGenreController {

    private final SubGenreRespository subGenreRespository;

    public SubGenreController(SubGenreRespository subGenreRespository) {
        this.subGenreRespository = subGenreRespository;
    }

    @GetMapping
    public List<SubGenre> getSubGenresByGenre(@RequestParam Long genreId) {
        return subGenreRespository.findByGenreId(genreId);
    }
}
