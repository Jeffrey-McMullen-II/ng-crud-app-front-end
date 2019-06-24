package com.devglan.userportal.user.service;

import com.devglan.userportal.user.model.User;
import com.devglan.userportal.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User createUser(User user) {
        return repository.save(user);
    }

    public List<User> findAllUsers() {
        return repository.findAll();
    }

    public User findUserByUserId(int id) {
        return repository.findOne(id);
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

    public User deleteUserByUserId(int id) {
        User user = findUserByUserId(id);
        if (user != null) {
            repository.delete(user);
            return user;
        }
        return null;
    }
}
