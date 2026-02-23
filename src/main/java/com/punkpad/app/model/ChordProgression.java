package com.punkpad.app.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class ChordProgression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String title;

        private String key;

        private Integer tempo;

      @ManyToOne
      @JoinColumn(name = "user_id" , nullable = false)
        private User user;

      @ManyToOne
      @JoinColumn(name = "sub_genre_id" , nullable = false)
        private User subGenre;

      @OneToMany(mappedBy = "progression", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Chords> chords;

      private LocalDateTime createdAt = LocalDateTime.now();
}
