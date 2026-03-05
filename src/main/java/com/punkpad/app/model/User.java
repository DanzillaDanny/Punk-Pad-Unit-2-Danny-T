package com.punkpad.app.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChordProgression> chordProgressions = new ArrayList<>();

    public User(){}

    public User(String username){
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public List<ChordProgression> getChordProgressions() {
        return chordProgressions;
    }

    public void setUsername(String username) {
        this.username = username;

    }
}
