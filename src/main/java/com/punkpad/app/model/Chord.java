package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
@Table(name="chords")
public class Chord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @Column(nullable=false)
    private String rootNote;

    @Column(nullable = false)
    private String quality;

    @JoinColumn(nullable = false, unique = true)
    private String displayName;

    public Chord(){}
    public Chord(String chordName, int positionIndex) {
        this.rootNote = rootNote;
        this.quality = quality;
        this.displayName = displayName;
    }

    public Long getId() {
        return id;
    }

    public String getRootNote() {
        return rootNote;
    }

    public String getQuality() {
        return quality;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setRootNote(String rootNote) {
        this.rootNote = rootNote;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
