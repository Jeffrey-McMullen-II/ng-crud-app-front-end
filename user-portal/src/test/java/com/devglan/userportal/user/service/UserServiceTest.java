package com.devglan.userportal.user.service;

import com.devglan.userportal.user.model.User;
import com.devglan.userportal.user.repository.UserRepository;
import org.junit.Test;

import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserServiceTest {

    @Mock
    UserRepository userRepository; //Mocks go above inject mocks

    @InjectMocks
     UserService userService;

    private List<User> testUsers = new ArrayList<>();

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        testUsers.add(new User(1,"test@email.com","tester","testing"));
        testUsers.add(new User(2,"tester@email.com","testington","test"));
    }

    @Test
    public void createUser() {
        when(userRepository.save(testUsers.get(0))).thenReturn((testUsers.get(0)));

        User returnedUser = userService.createUser(testUsers.get(0));

        verify(userRepository, times(1)).save(testUsers.get(0));

        assertEquals(testUsers.get(0), returnedUser);
    }

    @Test
    public void findAllUsers() {
        when(userRepository.findAll()).thenReturn(testUsers);

        List returnedUsers = userService.findAllUsers();

        verify(userRepository, times(1)).findAll();

        assertEquals(testUsers, returnedUsers);
    }

    @Test
    public void findUserByUserId() {
        when(userRepository.findOne(1)).thenReturn(testUsers.get(1));

        User returnedUser = userService.findUserByUserId(1);

        verify(userRepository, times(1)).findOne(1);

        assertEquals(testUsers.get(1), returnedUser);
    }

    @Test
    public void findUserByUserId_WhenUserIdNotFound() {
        when(userRepository.findOne(10)).thenReturn(null);

        User nullUser = userService.findUserByUserId(10);

        verify(userRepository, times(1)).findOne(10);

        assertNull(nullUser);
    }

    @Test
    public void updateUser() {
        when(userRepository.save(testUsers.get(1))).thenReturn(testUsers.get(1));

        User returnedUser = userService.updateUser(testUsers.get(1));

        verify(userRepository, times(1)).save(testUsers.get(1));

        assertEquals(testUsers.get(1), returnedUser);
    }

    @Test
    public void deleteUser() {
        when(userService.deleteUserByUserId(1)).thenReturn(testUsers.get(1));

        User returnedUser = userService.deleteUserByUserId(1);

        verify(userRepository, times(1)).delete(testUsers.get(1));

        assertEquals(testUsers.get(1), returnedUser);
    }

    @Test
    public void deleteUserByUserId_WhenUserIdNotFound() {
        when(userService.deleteUserByUserId(10)).thenReturn(null);

        User nullUser = userService.findUserByUserId(10);

        verify(userRepository, times(1)).findOne(10);

        assertNull(nullUser);
    }
}