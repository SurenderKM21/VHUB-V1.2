// package com.example.demo.controller;

// import com.example.demo.model.User;
// import com.example.demo.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/profile")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     @GetMapping
//     public User getProfile(@RequestParam String email) {
//         return userService.getUserByEmail(email);
//     }

//     @PutMapping
//     public User updateProfile(@RequestBody User user) {
//         return userService.updateUser(user);
//     }

//     @DeleteMapping
//     public void deleteProfile(@RequestParam String email, @RequestParam String password) {
//         userService.deleteUser(email, password);
//     }
// }


// package com.example.demo.controller;

// import com.example.demo.model.User;
// import com.example.demo.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/profile")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     @GetMapping
//     public User getProfile(@RequestParam Long uid) {
//         return userService.getUserByUid(uid);
//     }

//     @PutMapping
//     public User updateProfile(@RequestBody User user) {
//         return userService.updateUser(user);
//     }

//     @DeleteMapping
//     public void deleteProfile(@RequestParam String email, @RequestParam String password) {
//         userService.deleteUser(email, password);
//     }
// }

// package com.example.demo.controller;

// import com.example.demo.model.User;
// import com.example.demo.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/profile")
// public class UserController {

//     @Autowired
//     private UserService userService;

//     // Get profile by userId
//     @GetMapping
//     public User getProfile(@RequestParam Long userId) {
//         return userService.getUserById(userId);
//     }

//     // Update user profile
//     @PutMapping
//     public User updateProfile(@RequestBody User user) {
//         return userService.updateUser(user);
//     }

//     // Delete user profile
//     @DeleteMapping
//     public void deleteProfile(@RequestParam Long userId, @RequestParam String password) {
//         userService.deleteUser(userId, password);
//     }
// }
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

    @PutMapping
    public User updateProfile(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteProfile(@PathVariable Long userId, @RequestParam String password) {
        userService.deleteUser(userId, password);
    }
}
