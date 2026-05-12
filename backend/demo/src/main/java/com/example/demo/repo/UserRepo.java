package com.example.demo.repo;

import com.example.demo.model.User;
import com.example.demo.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);  // Find user by email
    List<User> findByRole(Role role);
}
