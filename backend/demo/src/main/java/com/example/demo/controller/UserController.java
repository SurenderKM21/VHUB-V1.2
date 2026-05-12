package com.example.demo.controller;

import com.example.demo.dto.request.PasswordChangeRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.model.User;
import com.example.demo.enums.Role;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/mechanic")
    public String createMechanic(@RequestBody RegisterRequest request) {
        return userService.createMechanic(request);
    }

    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable("role") Role role) {
        return userService.getUsersByRole(role);
    }

    @GetMapping("/{userId}")
    public User getProfile(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/email/{email:.+}")
    public User getProfileByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }

    @PatchMapping("/{userId}")
    public User patchUser(@PathVariable("userId") Long userId, @RequestBody Map<String, Object> updates) {
        return userService.partialUpdateUser(userId, updates);
    }

    @PutMapping("/{userId}/role")
    public void updateUserRole(@PathVariable("userId") Long userId, @RequestBody Map<String, String> body) {
        Role newRole = Role.valueOf(body.get("role"));
        userService.updateUserRole(userId, newRole);
    }

    @PutMapping
    public User updateProfile(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteProfile(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @DeleteMapping("/email/{email:.+}")
    public void deleteProfileByEmail(@PathVariable("email") String email) {
        userService.deleteUserByEmail(email);
    }

    @PostMapping("/{userId}/change-password")
    public void changePassword(@PathVariable("userId") Long userId, @RequestBody PasswordChangeRequest request) {
        userService.changePassword(userId, request);
    }
}
