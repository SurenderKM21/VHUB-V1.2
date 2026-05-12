package com.example.demo.utils;

import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

@Component
public class PasswordValidator {

    // Minimum 10 characters, at least one uppercase, one lowercase, one digit, one
    // symbol
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_\\-`~();:'\"<>?,./|*\\[\\]{}\\\\]).{10,}$";
    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public boolean isValid(String password) {
        if (password == null) {
            return false;
        }
        return pattern.matcher(password).matches();
    }
}
