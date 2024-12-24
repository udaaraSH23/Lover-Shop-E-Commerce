package com.example.backend.Product.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Product.Model.Product;
import com.example.backend.Product.Service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    // Add a new product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // Update an existing product
    @PutMapping("/{id}")
    public Product updaProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.updaProduct(id, product);
    }

    // Delete a product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // Search for products by name (optional feature)
    @GetMapping("/search")
    public List<Product> searchProductsByName(@RequestParam String keyword) {
        return productService.searchProductsByName(keyword);
    }

    // Reduce stock for a specific variation (optional feature)
    @PutMapping("/{id}/reduce-stock")
    public void reduceProductStock(
            @PathVariable String id,
            @RequestParam String variationType,
            @RequestParam String variationValue,
            @RequestParam int quantity) {
        productService.reduceProductStock(id, variationType, variationValue, quantity);
    }
}
