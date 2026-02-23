package com.punkpad.app.model;

import jakarta.persistence.*;

@Entity
public class SubGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String genres;
    private String description;

    @Column(nullable = false, length = 50)
    private String name;

    @ManyToOne
    @JoinColumn(name = "genre_id", nullable = false)
    private Genre genre;

    public SubGenre() {
    }

    public SubGenre(String name, Genre genre) {
        this.name = name;
        this.genres = genres;
    }

}
