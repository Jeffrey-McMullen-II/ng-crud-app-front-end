package com.crud.app.user;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User save(User user);

    List<User> findAll();

    List<User> findAll(Sort direction);

    User findOne(int id);

    void delete(User user);
}
