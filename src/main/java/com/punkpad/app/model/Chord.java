package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="chords")
public class Chord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @Column(nullable=false)
    private String chordName;

    @Column(nullable = false)
    private int positionIndex;

    @ManyToOne
    @JoinColumn(name = "progression_id", nullable = false)
    private ChordProgression progression;

    public Chord(){

    }
    public Chord(String chordName, int positionIndex) {
        this.chordName = chordName;
        this.positionIndex = positionIndex;
    }

    public Long getId() {
        return id;
    }

    public String getChordName() {
        return chordName;
    }

    public void setChordName(String name) {
        this.chordName = chordName;
    }

    public int getPositionIndex() {
        return positionIndex;
    }

    public void setPositionIndex(int positionIndex) {
        this.positionIndex = positionIndex;
    }

    public void setProgression(ChordProgression progression) {
        this.progression = progression;
    }
}
