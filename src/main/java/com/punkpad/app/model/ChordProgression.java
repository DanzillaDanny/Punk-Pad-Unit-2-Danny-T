package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
public class ChordProgression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String key;

      @ManyToOne
        private Genre genre;

      @ManyToOne
        private SubGenre subGenre;
}
