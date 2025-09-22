package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Regular User Signup
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");  // Default role for regular users
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // Admin Signup
    @PostMapping("/admin/signup")
    public ResponseEntity<String> adminSignUp(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        // Only set the role to ADMIN
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ADMIN");  // Role set to "ADMIN" for admin users
        userRepository.save(user);
        return ResponseEntity.ok("Admin registered successfully");
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        return ResponseEntity.ok(user);
    }
}
