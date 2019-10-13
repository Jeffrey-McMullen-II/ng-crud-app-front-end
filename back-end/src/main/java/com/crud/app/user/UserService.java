package com.crud.app.user;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    private UserMapper userMapper;

    public UserService (UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    UserDTO createUser(User user) {
        return userMapper.explicitMapModelToDTO(userRepository.save(user));
    }

    List<UserDTO> findAllUsers() {
        return userMapper.mapModelsToDTOS((userRepository.findAll()));
    }

    List<UserDTO> findAllUsersByFirstName() {
        return userMapper.mapModelsToDTOS(userRepository.findAll(new Sort(Sort.Direction.ASC, "firstName")));
    }

    UserDTO findUserByUserId(int id) {
        return userMapper.explicitMapModelToDTO(userRepository.findOne(id));
    }

    UserDTO updateUser(User user) {
        return userMapper.explicitMapModelToDTO(userRepository.save(user));
    }

    UserDTO deleteUserByUserId(int id) {
        User user = findUserByUserIdForDeletion(id);
        if (user != null) {
            userRepository.delete(user);
        }
        return userMapper.explicitMapModelToDTO(user);
    }

    private User findUserByUserIdForDeletion(int id) {
        return userRepository.findOne(id);
    }
}
