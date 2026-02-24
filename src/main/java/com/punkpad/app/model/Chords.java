package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="chords")
public class Chords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @Column(nullable=false, length=10)
    private String name;

    @Column(name = "position_index", nullable = false)
    private int positionIndex;

    @ManyToOne
    @JoinColumn(name = "progression_id", nullable = false)
    private ChordProgression progression;

    public Chords(){

    }
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPositionIndex(int positionIndex) {
        this.positionIndex = positionIndex;
    }

    public void setProgression(ChordProgression progression) {
        this.progression = progression;
    }
}
