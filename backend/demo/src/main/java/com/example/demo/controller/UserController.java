package com.example.demo.controller;

import com.example.demo.dto.request.PasswordChangeRequest;
import com.example.demo.model.User;
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

    @GetMapping("/{userId}")
    public User getProfile(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/email/{email:.+}")
    public User getProfileByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PatchMapping("/{userId}")
    public User patchUser(@PathVariable Long userId, @RequestBody Map<String, Object> updates) {
        return userService.partialUpdateUser(userId, updates);
    }

    @PutMapping
    public User updateProfile(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteProfile(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    @DeleteMapping("/email/{email:.+}")
    public void deleteProfileByEmail(@PathVariable String email) {
        userService.deleteUserByEmail(email);
    }

    @PostMapping("/{userId}/change-password")
    public void changePassword(@PathVariable Long userId, @RequestBody PasswordChangeRequest request) {
        userService.changePassword(userId, request);
    }
}
