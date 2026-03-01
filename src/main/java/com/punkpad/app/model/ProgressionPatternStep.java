package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progression_pattern_steps")
public class ProgressionPatternStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int stepOrder;

    @Column(nullable = false)
    private int degree;

    private String accidental; // e.g., "#", "b", or natural (null or empty)

    private String quality;

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