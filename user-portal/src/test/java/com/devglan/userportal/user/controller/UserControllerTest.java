package com.devglan.userportal.user.controller;

import com.devglan.userportal.user.model.User;
import com.devglan.userportal.user.repository.UserRepository;
import com.devglan.userportal.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;

public class UserControllerTest {

    private MockMvc mockMvc;

    private List<User> testUsers = new ArrayList();

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;


    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        testUsers.add(new User(1,"test@email.com","tester","testing"));
        testUsers.add(new User(2,"tester@email.com","testington","test"));
    }



}
