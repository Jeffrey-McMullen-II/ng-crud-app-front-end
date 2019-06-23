package com.devglan.userportal.user;

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
    public ResponseEntity<User> create(@RequestBody User user){
        return ResponseEntity.ok(userService.create(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<User> findOne(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PutMapping
    public ResponseEntity<User> update(@RequestBody User user){
        return ResponseEntity.ok(userService.update(user));
    }

    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<User> delete(@PathVariable("id") int id) {
        return ResponseEntity.ok(userService.delete(id));
    }
}