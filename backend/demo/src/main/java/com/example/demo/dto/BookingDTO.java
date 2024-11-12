package com.example.demo.dto;

import lombok.Data;


@Data
public class BookingDTO {
    private String name;
    private String phone;
    private String vehicleNumber;
    private String service;
    private String date;
    private String time;
    private String problemDescription,email;
    private long customerId;
    // private Status status;
}
