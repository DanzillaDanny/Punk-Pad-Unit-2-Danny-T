package com.punkpad.app.repository;

import com.punkpad.app.model.ProgressionPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressionPatternRepository extends JpaRepository<ProgressionPattern, Long> {

    List<ProgressionPattern> findBySubGenre_Id(Long subGenre_Id);
}
