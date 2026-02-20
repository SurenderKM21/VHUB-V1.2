package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BookingDTO;
import com.example.demo.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/get")
    public ResponseEntity<?> getAllBookings() {
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<String> createBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok("Booking created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create booking: " + e.getMessage());
        }
    }
}
