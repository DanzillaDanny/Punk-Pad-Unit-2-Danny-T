package com.punkpad.app.repository;

import com.punkpad.app.model.ProgressionPatternStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressionPatternStepRepository extends JpaRepository<ProgressionPatternStep, Long> {

    List<ProgressionPatternStep> findByPatternIdOrderByStepOrderAsc(Long patternId);
}
