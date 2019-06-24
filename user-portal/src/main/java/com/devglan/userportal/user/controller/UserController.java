package com.devglan.userportal.user.controller;

import com.devglan.userportal.user.service.UserService;
import com.devglan.userportal.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"/users"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<User> findUserByUserId(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.findUserByUserId(id));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity<User> deleteUserByUserId(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.deleteUserByUserId(id));
    }
}