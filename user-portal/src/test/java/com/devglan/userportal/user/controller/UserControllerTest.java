package com.devglan.userportal.user.controller;

import com.devglan.userportal.user.model.User;
import com.devglan.userportal.user.repository.UserRepository;
import com.devglan.userportal.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    private List<User> testUsers = new ArrayList();

    private final ObjectMapper mapper = new ObjectMapper();

    @Mock
    private UserService userService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        testUsers.add(new User(1,"test@email.com","tester","testing"));
        testUsers.add(new User(2,"tester@email.com","testington","test"));
        mockMvc = MockMvcBuilders.standaloneSetup(new UserController(userService)).build();
    }

    @Test
    public void createUser() throws Exception {
        String url = "/users";
        String payload = mapper.writeValueAsString(testUsers.get(1));


        given(userService.createUser(any(User.class))).willReturn((testUsers.get(1)));

        String expectedResult = mapper.writeValueAsString(testUsers.get(1));

        String actualResult = mockMvc.perform(post(url).content(payload).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void findUserByUserId() throws Exception {
        given(userService.findUserByUserId(0)).willReturn(testUsers.get(0));

        String expectedResult = mapper.writeValueAsString(testUsers.get(0));

        String actualResult = mockMvc.perform(get("/users/" + 0))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }
}
