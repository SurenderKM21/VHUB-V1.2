package com.example.demo.enums;

import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum Role {
        Admin,
        User;

        public List<SimpleGrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority("ROLE_" + this.name()));
        }
}
