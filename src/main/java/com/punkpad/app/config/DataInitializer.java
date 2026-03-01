package com.punkpad.app.config;

import com.punkpad.app.model.*;
import com.punkpad.app.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProgressionPatternRepository patternRepository;

    public DataInitializer(ProgressionPatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    @Override
    public void run(String... args) {
        System.out.println("DataInitializer running...");

        if (patternRepository.count() > 0) {
            System.out.println("Patterns already exist. Skipping seed.");
            return;
        }

        System.out.println("No patterns found. Ready to seed.");
    }
}
