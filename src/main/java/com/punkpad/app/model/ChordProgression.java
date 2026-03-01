package com.punkpad.app.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chord_progressions")
public class ChordProgression {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String musicalKey;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "sub_genre_id", nullable = false)
    private SubGenre subGenre;


    @ManyToMany
    @JoinTable(
            name = "progression_chords",
            joinColumns = @JoinColumn(name = "progression_id"),
            inverseJoinColumns = @JoinColumn(name = "chord_id")
    )
    @OrderColumn(name = "position_index")
    private List<Chord> chords = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMusicalKeyKey() {
        return musicalKey;
    }


    public User getUser() {
        return user;
    }

    public SubGenre getSubGenre() {
        return subGenre;
    }

    public List<Chord> getChords() {
        return chords;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMusicalKey(String musicalKey) {
        this.musicalKey = musicalKey;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSubGenre(SubGenre subGenre) {
        this.subGenre = subGenre;
    }

    public void setChords(List<Chord> chords) {
        this.chords = chords;
    }
}
