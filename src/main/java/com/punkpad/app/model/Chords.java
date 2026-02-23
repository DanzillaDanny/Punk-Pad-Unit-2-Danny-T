package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
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

}
