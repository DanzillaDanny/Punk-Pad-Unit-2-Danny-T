package com.punkpad.app.repository;

import com.punkpad.app.model.UserProfile;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
        Optional<UserProfile> findByUsername(String username);
        boolean existsByUsername(String username);
}
