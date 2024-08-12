 package com.example.demo.controller;

// import com.example.demo.model.Booking;
// import com.example.demo.service.BookingService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/bookings")
// public class BookingController {

//     @Autowired
//     private BookingService bookingService;

//     @PostMapping
//     public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
//         try {
//             Booking savedBooking = bookingService.saveBooking(booking);
//             return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
//         } catch (Exception e) {
//             return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }


import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }
}
