package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.MimeMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.core.io.FileSystemResource;
import java.io.File;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${twilio.account.sid}")
    private String twilioSid;

    @Value("${twilio.auth.token}")
    private String twilioAuthToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initTwilio() {
        if (twilioSid != null && !twilioSid.startsWith("ACxxxx")) {
            Twilio.init(twilioSid, twilioAuthToken);
            log.info("Twilio initialized successfully");
        } else {
            log.warn("Twilio SID not configured correctly. SMS features will be mocked in logs.");
        }
    }

    @Async
    public void sendEmail(String to, String subject, String body) {
        try {
            if (fromEmail != null && !fromEmail.equals("your-email@gmail.com")) {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8"); // true for multipart
                
                String htmlMsg = String.format(
                    "<div style='font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>" +
                    "  <div style='text-align: center; margin-bottom: 20px;'>" +
                    "    <img src='cid:vhubLogo' alt='VHUB Logo' style='width: 150px; height: auto;' />" +
                    "  </div>" +
                    "  <h2 style='color: #2563eb; text-align: center;'>Service Notification</h2>" +
                    "  <p style='font-size: 1.1rem; line-height: 1.6;'>%s</p>" +
                    "  <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>" +
                    "  <div style='text-align: center; color: #64748b;'>" +
                    "    <h3 style='color: #2563eb; margin-bottom: 5px;'>VHUB - Vehicle Repair Hub</h3>" +
                    "    <p style='margin: 5px 0;'>Your Trusted Partner in Vehicle Maintenance</p>" +
                    "    <p style='margin: 5px 0;'><b>Contact Us:</b> +91 98765 43210 | support@vhub.com</p>" +
                    "    <p style='margin: 5px 0;'>123 Auto Plaza, Coimbatore, Tamil Nadu</p>" +
                    "  </div>" +
                    "</div>", 
                    body.replace("\n", "<br>")
                );

                helper.setText(htmlMsg, true);
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setFrom(fromEmail);

                // Add inline image
                // Note: In a real app, this path should be configurable or the image should be in resources
                String logoPath = "C:/Users/SURENDER K M/.gemini/antigravity/brain/e3fb709a-c48a-4d81-a26b-cc8e0299fa17/vhub_logo_1778611116421.png";
                File logoFile = new File(logoPath);
                if (logoFile.exists()) {
                    helper.addInline("vhubLogo", new FileSystemResource(logoFile));
                }
                
                mailSender.send(mimeMessage);
                log.info("HTML Email with Logo sent successfully to {}", to);
            } else {
                log.info("[MOCK EMAIL] To: {}, Subject: {}, Body: {}", to, subject, body);
            }
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
            log.info("[MOCK EMAIL FALLBACK] To: {}, Subject: {}, Body: {}", to, subject, body);
        }
    }

    @Async
    public void sendSms(String toPhone, String text) {
        try {
            if (twilioSid != null && !twilioSid.startsWith("ACxxxx")) {
                Message.creator(
                        new PhoneNumber(toPhone),
                        new PhoneNumber(twilioPhoneNumber),
                        text
                ).create();
                log.info("SMS sent successfully to {}", toPhone);
            } else {
                log.info("[MOCK SMS] To: {}, Message: {}", toPhone, text);
            }
        } catch (Exception e) {
            log.error("Failed to send SMS to {}: {}", toPhone, e.getMessage());
            log.info("[MOCK SMS FALLBACK] To: {}, Message: {}", toPhone, text);
        }
    }
}
