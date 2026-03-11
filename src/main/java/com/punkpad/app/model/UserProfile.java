package com.punkpad.app.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.List;
import java.sql.Timestamp;




@Entity
@Table(name = "user_profile")
public class UserProfile{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String password;


    @Column(updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChordProgression> chordProgressions = new ArrayList<>();

    protected UserProfile() {
        // JPA requirement
    }

    public UserProfile(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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
