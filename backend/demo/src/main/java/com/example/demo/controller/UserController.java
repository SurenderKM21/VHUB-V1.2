package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getProfile(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/email/{email}")
    public User getProfileByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PutMapping
    public User updateProfile(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteProfile(@PathVariable Long userId) {
        userService.deleteUser(userId);  // No password needed
    }

    @DeleteMapping("/email/{email}")
    public void deleteProfileByEmail(@PathVariable String email) {
        userService.deleteUserByEmail(email);  // No password needed
    }
}
