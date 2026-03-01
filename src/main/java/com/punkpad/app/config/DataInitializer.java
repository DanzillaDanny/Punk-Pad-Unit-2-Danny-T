package com.punkpad.app.config;

import com.punkpad.app.model.*;
import com.punkpad.app.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProgressionPatternRepository patternRepository;
    private final ProgressionPatternStepRepository stepRepository;
    private final SubGenreRepository subGenreRepository;

    public DataInitializer(ProgressionPatternRepository patternRepository,
                           ProgressionPatternStepRepository stepRepository,
                           SubGenreRepository subGenreRepository){
        this.patternRepository = patternRepository;
        this.stepRepository = stepRepository;
        this.subGenreRepository = subGenreRepository;
    }

    @Override
    public void run(String... args) {

        if (patternRepository.count() > 0) {
            System.out.println("Patterns already exist. Skipping seed.");
            return;
        }

        SubGenre popPunk = subGenreRepository.findAll()
                .stream()
                .filter(sg -> sg.getName().equals("90s/2000s Pop Punk"))
                .findFirst()
                .orElseThrow();

        ProgressionPattern pattern = new ProgressionPattern();
        pattern.setName("I-V-vi-IV");
        pattern.setMode("Major");
        pattern.setWeight(10);
        pattern.setSubGenre(popPunk);

        patternRepository.save(pattern);

        createStep(pattern, 1, 1, null, "maj");
        createStep(pattern, 2, 5, null, "maj");
        createStep(pattern, 3, 6, null, "min");
        createStep(pattern, 4, 4, null, "maj");

        System.out.println("Seeded I-V-vi-IV pattern.");
    }

    private void createStep(ProgressionPattern pattern,
                            int order,
                            int degree,
                            String accidental,
                            String quality) {
        ProgressionPatternStep step = new ProgressionPatternStep();
        step.setPattern(pattern);
        step.setStepOrder(order);
        step.setDegree(degree);
        step.setAccidental(accidental);
        step.setQuality(quality);
        stepRepository.save(step);
    }
}
