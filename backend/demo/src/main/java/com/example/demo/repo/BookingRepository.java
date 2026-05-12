package com.example.demo.repo;
import com.example.demo.model.Booking;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByMechanic(User mechanic);
}
