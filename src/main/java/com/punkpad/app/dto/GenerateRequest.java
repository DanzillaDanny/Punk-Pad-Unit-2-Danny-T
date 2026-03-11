package com.punkpad.app.dto;

public class GenerateRequest {

    private Long subGenreId;
    private String musicalKey;

    public Long getSubGenreId() {
        return subGenreId;
    }

    public void setSubGenreId(Long subGenreId) {
        this.subGenreId = subGenreId;
    }

    public String getMusicalKey() {
        return musicalKey;
    }

    public void setMusicalKey(String musicalKey) {
        this.musicalKey = musicalKey;
    }
}
