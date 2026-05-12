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
    private final NotificationService notificationService;

    public Booking createBooking(Booking booking) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Assuming email is used for authentication

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        booking.setUser(user); // Set the user

        Booking savedBooking = bookingRepository.save(booking);

        // Notify user
        String subject = "Booking Confirmed - VHUB";
        String body = String.format("Hello %s, your booking for %s has been confirmed for %s at %s. Vehicle: %s",
                user.getName(), savedBooking.getService(), savedBooking.getDate(), savedBooking.getTime(),
                savedBooking.getVehicleNumber());
        notificationService.sendEmail(user.getEmail(), subject, body);
        notificationService.sendSms(user.getPhone(), body);

        return savedBooking;
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

        Booking savedBooking = bookingRepository.save(booking);

        // Notify user
        String subject = "Booking Confirmed - VHUB";
        String body = String.format("Hello %s, your booking for %s has been confirmed for %s at %s. Vehicle: %s",
                user.getName(), savedBooking.getService(), savedBooking.getDate(), savedBooking.getTime(),
                savedBooking.getVehicleNumber());
        notificationService.sendEmail(user.getEmail(), subject, body);
        notificationService.sendSms(user.getPhone(), body);
    }

    public void assignMechanic(Long bookingId, Long mechanicId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        User mechanic = userRepository.findById(mechanicId)
                .orElseThrow(() -> new RuntimeException("Mechanic not found"));

        if (!mechanic.getRole().name().equals("Mechanic")) {
            throw new RuntimeException("User is not a mechanic");
        }

        booking.setMechanic(mechanic);
        bookingRepository.save(booking);
    }

    public void updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);

        User user = updatedBooking.getUser();
        if (user != null) {
            String subject = "Service Update - VHUB";
            String body = String.format("Hello %s, the status of your service for vehicle %s has been updated to: %s.",
                    user.getName(), updatedBooking.getVehicleNumber(), status);

            if ("In Progress".equals(status) && updatedBooking.getMechanic() != null) {
                User mechanic = updatedBooking.getMechanic();
                body += String.format(
                        "\n\nAssigned Mechanic: %s\nPhone Number: %s\n\nOur mechanic has started working on your vehicle.",
                        mechanic.getName(), mechanic.getPhone());
            } else if ("Completed".equals(status)) {
                body += "\n\nYour vehicle is ready for pickup. Thank you for choosing VHUB!";
            }

            notificationService.sendEmail(user.getEmail(), subject, body);
            notificationService.sendSms(user.getPhone(), body);
        }
    }

    public List<Booking> getBookingsForAuthenticatedMechanic() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User mechanic = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Mechanic not found"));

        return bookingRepository.findByMechanic(mechanic);
    }
}
