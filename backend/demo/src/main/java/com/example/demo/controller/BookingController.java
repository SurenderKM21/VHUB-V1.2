 package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BookingDTO;
import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    
    @GetMapping("/get")
    public ResponseEntity<?> getAllBookings()
    {
     return new ResponseEntity<>(bookingService.getAllBookings(),HttpStatus.OK);
    }
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }


    @PostMapping("/new")
    public ResponseEntity<String> createBookings(@RequestBody BookingDTO bookingDTO) {
        try {
            bookingService.createBookings(bookingDTO);
            return ResponseEntity.ok("Booking created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create booking: " + e.getMessage());
        }
    }
}
