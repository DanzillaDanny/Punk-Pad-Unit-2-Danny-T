package com.punkpad.app.repository;

import com.punkpad.app.model.SubGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubGenreRepository extends JpaRepository<SubGenre,Long> {

    List<SubGenre> findByGenreId(Long genreId);
    Optional<SubGenre>findByName(String name);
}
