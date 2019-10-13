package com.crud.app.user;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface UserRepository extends Repository<User, Integer> {

    User save(User user);

    List<User> findAll();

    List<User> findAll(Sort direction);

    User findOne(int id);

    void delete(User user);
}
