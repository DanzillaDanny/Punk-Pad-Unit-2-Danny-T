package service;

import java.util.Random;
import java.util.ArrayList;
import java.util.List;


import com.punkpad.app.model.ProgressionPattern;
import com.punkpad.app.model.ProgressionPatternStep;
import com.punkpad.app.repository.ProgressionPatternRepository;

public class ProgressionService {
    public final ProgressionPatternRepository patternRepository;
    private final ProgressionPatternRepository stepRepository;

    public ProgressionService(ProgressionPatternRepository patternRepository, ProgressionPatternRepository stepRepository) {
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