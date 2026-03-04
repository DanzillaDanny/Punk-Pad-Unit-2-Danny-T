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
    private List<String> buildMajorScale(String root) {
        List<String> chromatic = List.of("C","C#", "D", "D#", "E", "F", "G", "G#", "A", "A#", "B");

        int start = chromatic.indexOf(root);

        if (start == -1) {
            throw new IllegalArgumentException("Invalid key: " + root);
        }
        int[] majorSteps = {0,2,4, 5, 7, 9, 11};

        List<String> scale = new ArrayList<>();

        for (int step : majorSteps) {
            scale.add(chromatic.get((start + step) % 12));
        }
        return scale;
    }
    private String resolveDegree(List<String> scale, int degree, String accidental) {

        String note = scale.get(degree - 1);

        if (accidental == null) {
            return note;
        }

        List<String> chromatic = List.of("C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");
        int index = chromatic.indexOf(note);
        if (accidental.equals("b"))
            return chromatic.get((index + 11) % 12);
    }
    if (accidental.equals("#")) {
        return chromatic.get((index + 1) % 12);
    }
    return note;
}
private String applyQuality(String note, String quality) {

    if (quality == null) {
        return note;
    }

    if (quality.equals("min")) {
        return note + "m";
    }

    return note;
}
}