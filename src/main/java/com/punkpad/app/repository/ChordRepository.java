package com.punkpad.app.repository;

import com.punkpad.app.model.Chord;
import com.punkpad.app.model.ChordProgression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChordRepository extends JpaRepository<ChordProgression, Long> {
}
