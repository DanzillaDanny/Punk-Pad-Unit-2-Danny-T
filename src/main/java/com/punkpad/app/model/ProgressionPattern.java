package com.punkpad.app.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "progression_patterns")
public class ProgressionPattern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // name is used to identify the pattern, for example "I-IV-V" or "ii-V-I"

    @Column(nullable = false)
    private String mode; // mode is used to determine which chords can be used in this pattern, for example "major" would allow chords from the major scale, "minor" would allow chords from the minor scale, "dorian" would allow chords from the dorian mode, etc.

    @Column(nullable = false)
    private int weight = 10; // weight is used to determine how often this pattern should be selected when generating progressions 10 is the default weight, higher means more likely to be selected

    @ManyToOne
    @JoinColumn(name = "sub_genre_id", nullable = false)
    private SubGenre subGenre;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMode() {
        return mode;
    }

    public int getWeight() {
        return weight;
    }

    public SubGenre getSubGenre() {
        return subGenre;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public void setSubGenre(SubGenre subGenre) {
        this.subGenre = subGenre;
    }
}
