package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
public class Chords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;


    private int positionIndex;

    progression_id BIGINT NOT NULL,

    @ManyToOne
    @JoinColumn(name = "progression_id", nullable = false)
    private ChordProgression progression;

}
