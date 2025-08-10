package com.example.Test_backend.controller;

import com.example.Test_backend.model.User;
import com.example.Test_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class UserController{

    @Autowired
    private UserRepository userRepository;

    // Create new user
    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setVehicleNumber(updatedUser.getVehicleNumber());
                    user.setOwnerName(updatedUser.getOwnerName());
                    user.setServicePackage(updatedUser.getServicePackage());
                    user.setPaidValue(updatedUser.getPaidValue());
                    user.setDateTime(updatedUser.getDateTime());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
    }


    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User with ID " + id + " not found");
        }
        userRepository.deleteById(id);
        return "User with ID " + id + " deleted successfully.";
    }

}
