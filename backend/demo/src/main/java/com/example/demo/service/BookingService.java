 package com.example.demo.service;



import java.util.List;

// import com.example.demo.model.Booking;
// import com.example.demo.repo.BookingRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class BookingService {
    
//     @Autowired
//     private BookingRepository bookingRepository;

//     public Booking saveBooking(Booking booking) {
//         return bookingRepository.save(booking);
//     }
// }
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BookingDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import com.example.demo.repo.BookingRepository;
import com.example.demo.repo.UserRepo;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepo userRepository;

    public BookingService(BookingRepository bookingRepository, UserRepo userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public Booking createBooking(Booking booking) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming email is used for authentication
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        booking.setUser(user); // Set the user

        return bookingRepository.save(booking);
    }
    
    public List<Booking> getAllBookings()
    {
       return bookingRepository.findAll();
    }

    public void createBookings(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setName(bookingDTO.getName());
        booking.setPhone(bookingDTO.getPhone());
        booking.setVehicleNumber(bookingDTO.getVehicleNumber());
        booking.setService(bookingDTO.getService());
        booking.setDate(bookingDTO.getDate());
        booking.setTime(bookingDTO.getTime());
        booking.setProblemDescription(bookingDTO.getProblemDescription());
        booking.setEmail(bookingDTO.getEmail());
        User user = userRepository.findByEmail(bookingDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        booking.setUser(user);

        bookingRepository.save(booking);
    }
}
