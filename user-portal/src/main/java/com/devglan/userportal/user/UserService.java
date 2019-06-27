package com.devglan.userportal.user;

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

    UserDTO createUser(User user) { return userMapper.mapModelToDTO(userRepository.save(user)); }

    List<UserDTO> findAllUsers() { return userMapper.mapModelsToDTOS((userRepository.findAll())); }

    UserDTO findUserByUserId(int id) { return userMapper.mapModelToDTO(userRepository.findOne(id)); }

    UserDTO updateUser(User user) { return userMapper.mapModelToDTO(userRepository.save(user)); }

    UserDTO deleteUserByUserId(int id) {
        User user = findUserByUserIdForDeletion(id);
        if (user != null) {
            userRepository.delete(user);
        }
        return userMapper.mapModelToDTO(user);
    }

    private User findUserByUserIdForDeletion(int id) { return userRepository.findOne(id); }
}
