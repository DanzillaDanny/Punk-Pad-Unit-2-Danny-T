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
    private String name;

    @Column(nullable = false)
    private String mode;

    @Column(nullable = false)
    private int weight = 10;

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
