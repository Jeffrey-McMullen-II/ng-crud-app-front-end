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

    public User create(User user) {
        return repository.save(user);
    }

    public User delete(int id) {
        User user = findById(id);
        if (user != null) {
            repository.delete(user);
        }
        return user;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(int id) {
        return repository.findOne(id);
    }

    public User update(User user) {
        return repository.save(user);
    }
}
