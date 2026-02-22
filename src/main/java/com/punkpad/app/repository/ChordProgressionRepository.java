package com.punkpad.app.repository;

import com.punkpad.app.ChordProgression;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChordProgressionRepository extends JpaRepository<ChordProgression, Long> {

    List<ChordProgression> findUserId(Long userId);

}
