package com.devglan.userportal.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"/users"})
public class UserController {

    private UserService userService;

    public UserController (UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() { return ResponseEntity.ok(userService.findAllUsers()); }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<User> findUserByUserId(@PathVariable("id") int id) {

        User user = userService.findUserByUserId(id);

        if (user != null) {
            return ResponseEntity.ok(user);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity<User> deleteUserByUserId(@PathVariable("id") int id) {

        User user = userService.deleteUserByUserId(id);

        if (user != null) {
            return ResponseEntity.ok(user);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}