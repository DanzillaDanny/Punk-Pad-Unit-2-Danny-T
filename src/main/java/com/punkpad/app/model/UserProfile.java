package com.punkpad.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.List;
import java.sql.Timestamp;




@Entity
public class UserProfile{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String username;

    private String password;

    @Column(updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<ChordProgression> chordProgressions = new ArrayList<>();

    public UserProfile() {}

    public UserProfile(String username, String email, String password, Timestamp createdAt, Timestamp updatedAt, Long id) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public UserProfile(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<ChordProgression> getChordProgressions() {
        return chordProgressions;
    }
}
