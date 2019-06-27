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

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUsers() { return ResponseEntity.ok(userService.findAllUsers()); }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<UserDTO> findUserByUserId(@PathVariable("id") Integer id) {

        UserDTO userDTO = userService.findUserByUserId(id);

        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity<UserDTO> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping(path = {"/{id}"})
    public ResponseEntity<UserDTO> deleteUserByUserId(@PathVariable("id") Integer id) {

        UserDTO userDTO = userService.deleteUserByUserId(id);

        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}