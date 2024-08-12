package com.example.demo.enums;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Access {
    ADMIN_GET("admin:read"),
    ADMIN_POST("admin:create"),
    ADMIN_PUT("admin:edit"),
    ADMIN_DELETE("admin:delete"),
    USER_GET("user:read"),
    USER_POST("user:create"),
    USER_PUT("user:edit"),
    USER_DELETE("user:delete"),
    TECH_GET("tech:read"),
    TECH_POST("tech:create"),
    TECH_PUT("tech:edit"),
    TECH_DELETE("tech:delete"),
    BOOK_DELETE("book:delete"),
    BOOK_GET("book:get"),
    BOOK_POST("book:post"),
    BOOK_PUT("book:put");

    @Getter
    private final String access;
}
