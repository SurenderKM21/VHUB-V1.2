package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private String name;
    private String phone;
    private String vehicleNumber;
    private String service;
    private String date;
    private String time;
    private String problemDescription, email;
    private long customerId;
}
