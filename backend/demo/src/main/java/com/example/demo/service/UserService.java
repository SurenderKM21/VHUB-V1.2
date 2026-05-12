package com.example.demo.service;

import com.example.demo.dto.request.PasswordChangeRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.model.User;
import com.example.demo.enums.Role;
import com.example.demo.repo.UserRepo;
import com.example.demo.utils.PasswordValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String createMechanic(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }
        if (!passwordValidator.isValid(request.getPassword())) {
            throw new RuntimeException("Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.");
        }
        User mechanic = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(Role.Mechanic)
                .build();
        userRepository.save(mechanic);
        return "Mechanic created successfully";
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User partialUpdateUser(Long userId, Map<String, Object> updates) {
        User user = getUserById(userId);
        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> user.setName((String) value);
                case "email" -> user.setEmail((String) value);
                case "phone" -> user.setPhone((String) value);
                case "address" -> user.setAddress((String) value);
            }
        });
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        if (!userRepository.existsById(user.getUid())) {
            throw new RuntimeException("User not found with id: " + user.getUid());
        }
        return userRepository.save(user);
    }

    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public void updateUserRole(Long userId, Role newRole) {
        User user = getUserById(userId);
        user.setRole(newRole);
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void deleteUserByEmail(String email) {
        User user = getUserByEmail(email);
        userRepository.delete(user);
    }

    public void changePassword(Long userId, PasswordChangeRequest request) {
        User user = getUserById(userId);
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect old password");
        }
        if (!passwordValidator.isValid(request.getNewPassword())) {
            throw new RuntimeException(
                    "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one symbol.");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
