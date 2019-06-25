package com.devglan.userportal.user.service;

import com.devglan.userportal.user.model.User;
import com.devglan.userportal.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserByUserId(int id) {
        return userRepository.findOne(id);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User deleteUserByUserId(int id) {
        User user = findUserByUserId(id);
        if (user != null) {
            userRepository.delete(user);
            return user;
        }
        return null;
    }
}
