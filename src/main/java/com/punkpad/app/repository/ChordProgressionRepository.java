package com.punkpad.app.repository;

import com.punkpad.app.entity.ChordProgression;
import com.punkpad.app.model.ChordProgression;
import org.springframework.stereotype.Repository;

@Repository
public class ChordProgressionRepository extends JpaRepository<ChordProgression, Long> {

    List<ChordProgression> findUserId(Long userId);

}
