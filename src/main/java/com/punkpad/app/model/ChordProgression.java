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
@Table(name = "chord_progressions")
public class ChordProgression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String key;

    private Integer tempo;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "sub_genre_id", nullable = false)
    private SubGenre subGenre;

    @OneToMany(mappedBy = "progression", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chords> chords;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getKey() {
        return key;
    }

    public Integer getTempo() {
        return tempo;
    }

    public User getUser() {
        return user;
    }

    public SubGenre getSubGenre() {
        return subGenre;
    }

    public List<Chords> getChords() {
        return chords;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setTempo(Integer tempo) {
        this.tempo = tempo;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSubGenre(SubGenre subGenre) {
        this.subGenre = subGenre;
    }

    public void setChords(List<Chords> chords) {
        this.chords = chords;
    }
}
