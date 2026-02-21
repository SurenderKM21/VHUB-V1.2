package com.example.demo.service;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BookingDTO;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import com.example.demo.repo.BookingRepository;
import com.example.demo.repo.UserRepo;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepo userRepository;

    public Booking createBooking(Booking booking) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming email is used for authentication

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        booking.setUser(user); // Set the user

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void createBooking(BookingDTO bookingDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming email is used for authentication

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        // Name, Phone, Email are now derived from the User entity directly

        booking.setVehicleNumber(bookingDTO.getVehicleNumber());
        booking.setService(bookingDTO.getService());
        booking.setDate(bookingDTO.getDate());
        booking.setTime(bookingDTO.getTime());
        booking.setProblemDescription(bookingDTO.getProblemDescription());

        booking.setUser(user);

        bookingRepository.save(booking);
    }
}
