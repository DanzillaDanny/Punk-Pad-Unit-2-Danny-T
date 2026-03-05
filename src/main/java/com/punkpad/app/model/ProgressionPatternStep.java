package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progression_pattern_steps")
public class ProgressionPatternStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int stepOrder; // ensures the notes stay in the correct order when saved or retrieved from a database.

    @Column(nullable = false)
    private int degree; // 1-7 representing the scale degree (I, II, III, IV, V, VI, VII)

    private String accidental; // e.g., "#", "b", or natural (null or empty)

    private String quality; // "maj", "min"

    @ManyToOne
    @JoinColumn(name = "pattern_id", nullable = false)
    private ProgressionPattern pattern;

    public ProgressionPatternStep() {}

    public Long getId() {
    return id;
    }

    public int getStepOrder() {
        return stepOrder;
    }

public int getDegree() {
    return degree;
}

public String getAccidental() {
    return accidental;
}

public String getQuality() {
    return quality;
}
public void setStepOrder(int stepOrder) {
    this.stepOrder = stepOrder;
}
public void setDegree(int degree) {
    this.degree = degree;
}
public void setAccidental(String accidental) {
    this.accidental = accidental;
}
public void setQuality(String quality) {
    this.quality = quality;
}
public void setPattern(ProgressionPattern pattern) {
    this.pattern = pattern;
    }
}