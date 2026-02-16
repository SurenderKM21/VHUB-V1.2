package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User partialUpdateUser(Long userId, Map<String, Object> updates) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        User user = userOptional.get();
        
        // Apply the updates from the map
        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    user.setName((String) value);
                    break;
                case "email":
                    user.setEmail((String) value);
                    break;
                case "phone":
                    user.setPhone((String) value);
                    break;
                case "address":
                    user.setAddress((String) value);
                    break;
                // Add more fields if needed
            }
        });

        return userRepository.save(user);
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
