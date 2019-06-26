package com.devglan.userportal.user;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    User createUser(User user) {
        return userRepository.save(user);
    }

    List<User> findAllUsers() { return userRepository.findAll();}

    User findUserByUserId(int id) { return userRepository.findOne(id); }

    User updateUser(User user) {
        return userRepository.save(user);
    }

    User deleteUserByUserId(int id) {
        User user = findUserByUserId(id);
        if (user != null) {
            userRepository.delete(user);
            return user;
        }
        return null;
    }
}
