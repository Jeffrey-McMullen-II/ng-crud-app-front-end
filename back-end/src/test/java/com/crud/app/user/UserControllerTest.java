package com.crud.app.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class UserControllerTest {

    private MockMvc mockMvc;

    private List<UserDTO> testUserDTOS = new ArrayList<>();

    private final ObjectMapper mapper = new ObjectMapper();

    @Mock
    private UserService userService;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        testUserDTOS.add(UserDTO.builder().Id(1).email("test@email.com").firstName("tester").lastName("testing").build());
        testUserDTOS.add(UserDTO.builder().Id(1).email("testy@email.com").firstName("testy").lastName("tester").build());
        mockMvc = MockMvcBuilders.standaloneSetup(new UserController(userService)).build();
    }

    @Test
    public void createUser() throws Exception {
        String url = "/api/users";
        String payload = mapper.writeValueAsString(testUserDTOS.get(1));

        given(userService.createUser(any(User.class))).willReturn((testUserDTOS.get(1)));

        String expectedResult = mapper.writeValueAsString(testUserDTOS.get(1));

        String actualResult = mockMvc.perform(post(url).content(payload).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void findAllUsers() throws Exception {
        given(userService.findAllUsers()).willReturn(testUserDTOS);

        String expectedResult = mapper.writeValueAsString(testUserDTOS);

        String actualResult = mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void findAllUsersByFirstNameAscending() throws Exception {
        given(userService.findAllUsersByFirstName()).willReturn(testUserDTOS);

        String expectedResult = mapper.writeValueAsString(testUserDTOS);

        String actualResult = mockMvc.perform(get("/api/users/first-name/ascending"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void findUserByUserId() throws Exception {
        given(userService.findUserByUserId(0)).willReturn(testUserDTOS.get(0));

        String expectedResult = mapper.writeValueAsString(testUserDTOS.get(0));

        String actualResult = mockMvc.perform(get("/api/users/" + 0))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void findUserByUserId_WhenUserIdNotFound() throws Exception {
        given(userService.findUserByUserId(10)).willReturn(null);

        String expectedResult = "";

        String actualResult = mockMvc.perform(get("/api/users" + 10))
                .andExpect(status().isNotFound())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void updateUser() throws Exception {
        String url = "/api/users";
        String payload = mapper.writeValueAsString(testUserDTOS.get(1));

        given(userService.updateUser(any(User.class))).willReturn((testUserDTOS.get(1)));

        String expectedResult = mapper.writeValueAsString(testUserDTOS.get(1));

        String actualResult = mockMvc.perform(put(url).content(payload).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void deleteUserByUserId() throws Exception {
        given(userService.deleteUserByUserId(0)).willReturn(testUserDTOS.get(0));

        String expectedResult = mapper.writeValueAsString(testUserDTOS.get(0));

        String actualResult = mockMvc.perform(delete("/api/users/" + 0))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }

    @Test
    public void deleteUserByUserId_WhenUserIdNotFound() throws Exception {
        given(userService.deleteUserByUserId(10)).willReturn(null);

        String expectedResult = "";

        String actualResult = mockMvc.perform(delete("/api/users" + 10))
                .andExpect(status().isNotFound())
                .andReturn()
                .getResponse()
                .getContentAsString();

        assertEquals(expectedResult, actualResult);
    }
}