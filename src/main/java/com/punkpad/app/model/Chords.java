package com.punkpad.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class Chords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    private String name;
    private int positionIndex;

}
