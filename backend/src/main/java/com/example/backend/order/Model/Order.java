package com.example.backend.order.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

import com.example.backend.order.ENUMS.OrderStatus;
import com.example.backend.order.ENUMS.PaymentStatus;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private List<OrderItem> items;
    private double total;
    private OrderStatus status; // Enum
    private PaymentStatus paymentStatus; // Enum
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private boolean confirmedByUser; // User confirms delivery
    private String updatedBy; // Admin who made the last status change

    private Address shippingAddress;  // Include shipping address
    private PaymentDetails paymentDetails; // Include payment details
    private RecieveDetail recieveDetail; // Include reciever details
}

@Data
class OrderItem {
    private String productId;
    private int quantity;
    private double price;
}

@Data
class Address {
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phone;
}

@Data
class PaymentDetails {
    private String paymentMethod; // "credit_card" or "cod"
    private String cardLast4Digits; // Last 4 digits of the card (if applicable)
    private String cardExpiry; // Optional: "MM/YY"
}

@Data
class RecieveDetail{
    private String recieverFirstName;
    private String recieverLastName;

}
