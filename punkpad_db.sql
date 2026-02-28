CREATE TABLE progression_pattern_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pattern_id BIGINT NOT NULL,
    step_order INT NOT NULL,
    degree INT NOT NULL,
    accidental VARCHAR(10),
    quality VARCHAR(10),
    FOREIGN KEY (pattern_id) REFERENCES progression_patterns(id)
);

