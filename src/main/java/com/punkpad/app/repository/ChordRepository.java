package com.punkpad.app.repository;

import com.punkpad.app.model.Chords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChordRepository {
    List<Chords> findByProgressionId(Long progressionId);
}
