package com.devglan.userportal.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class UserService {

    @Autowired
    private UserRepository repository;

    User create(User user) {
        return repository.save(user);
    }

    User delete(int id) {
        User user = findById(id);
        if (user != null) {
            repository.delete(user);
        }
        return user;
    }

    List<User> findAll() {
        return repository.findAll();
    }

    User findById(int id) {
        return repository.findOne(id);
    }

    User update(User user) {
        return repository.save(user);
    }
}
