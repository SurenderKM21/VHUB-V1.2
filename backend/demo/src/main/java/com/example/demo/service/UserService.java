package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Delete user by userId
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Delete user by email
    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email " + email));
        userRepository.delete(user);
    }

    // Update user
    public User updateUser(User user) {
        // Ensure the user exists before updating
        if (!userRepository.existsById(user.getUid())) {
            throw new RuntimeException("User not found");
        }
        return userRepository.save(user);
    }
}
