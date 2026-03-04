package com.punkpad.app.service;

import java.util.Random;
import java.util.ArrayList;
import java.util.List;


import com.punkpad.app.model.ProgressionPattern;
import com.punkpad.app.model.ProgressionPatternStep;
import com.punkpad.app.repository.ProgressionPatternRepository;
import com.punkpad.app.repository.ProgressionPatternStepRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgressionService {
    private final ProgressionPatternRepository patternRepository;
    private final ProgressionPatternStepRepository stepRepository;
    public ProgressionService(ProgressionPatternRepository patternRepository, ProgressionPatternStepRepository stepRepository) {
        this.patternRepository = patternRepository;
        this.stepRepository = stepRepository;
    }

    public List<String> generateProgression(Long subGenreId, String musicalKey) {
        List<ProgressionPattern> patterns = patternRepository.findBySubGenreId(subGenreId);
        if (patterns.isEmpty()) {
            throw new RuntimeException("No patterns found");
        }
        ProgressionPattern selected = patterns.get(new Random().nextInt(patterns.size()));

        List<ProgressionPatternStep> steps = stepRepository.findByPatternIdOrderByStepOrderAsc(selected.getId());

        List<String> scale = buildMajorScale(musicalKey);
        List<String> chords = new ArrayList<>();

        for (ProgressionPatternStep step : steps) {
            String note = resolveDegree(scale, step.getDegree(), step.getAccidental());
            chords.add(applyQuality(note, step.getQuality()));
        }
        return chords;
    }
}