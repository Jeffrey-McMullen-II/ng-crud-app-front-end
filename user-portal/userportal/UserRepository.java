package com.devglan.userportal;

import org.springframework.data.repository.Repository;

import java.util.List;

public interface UserRepository extends Repository<User, Integer> {

    User save(User user);

    List<User> findAll();

    User findOne(int id);

    void delete(User user);
}
