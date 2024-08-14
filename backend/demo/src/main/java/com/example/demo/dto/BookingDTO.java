package com.example.demo.dto;

import lombok.Data;

@Data
public class BookingDTO {
    private String name;
    private String phonenumber;
    private String vehicleNo;
    private String service;
    private String date;
    private String time;
    private String problemDesc;
    private long customerId;
}
