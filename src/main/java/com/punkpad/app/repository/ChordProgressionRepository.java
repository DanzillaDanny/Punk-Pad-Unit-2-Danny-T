package com.punkpad.app.repository;

import java.util.List;

import com.punkpad.app.model.ChordProgression;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ChordProgressionRepository extends JpaRepository<ChordProgression, Long> {

    List<ChordProgression> findByUser_Id(Long userId);

}
