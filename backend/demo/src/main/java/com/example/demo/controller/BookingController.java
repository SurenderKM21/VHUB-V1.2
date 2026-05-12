package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

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

    @PutMapping("/{id}/assign/{mechanicId}")
    public ResponseEntity<String> assignMechanic(@PathVariable("id") Long id, @PathVariable("mechanicId") Long mechanicId) {
        try {
            bookingService.assignMechanic(id, mechanicId);
            return ResponseEntity.ok("Mechanic assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to assign mechanic: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable("id") Long id, @RequestBody Map<String, String> body) {
        try {
            bookingService.updateBookingStatus(id, body.get("status"));
            return ResponseEntity.ok("Status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update status: " + e.getMessage());
        }
    }

    @GetMapping("/mechanic")
    public ResponseEntity<?> getMechanicBookings() {
        try {
            return new ResponseEntity<>(bookingService.getBookingsForAuthenticatedMechanic(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to get mechanic bookings: " + e.getMessage());
        }
    }
}
