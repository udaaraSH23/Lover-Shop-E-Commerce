package com.example.backend.Cart.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.backend.Product.Model.Product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;


@Data
@Document(collection = "carts") // MongoDB collection name
public class CartModel {

    @Id
    private String id; // Unique cart ID, auto-generated by MongoDB
    private String userId; // Unique user ID associated with the cart
    private List<Item> items = new ArrayList<>();

    @Data
    public static class Item {
        private String productId; // Product ID for the item
        private int quantity; // Quantity of the product
        private Map<String, String> variation = new HashMap<>();
        private Product productDetails; // Field to store product details (to be set when product is fetched)
    }
}
