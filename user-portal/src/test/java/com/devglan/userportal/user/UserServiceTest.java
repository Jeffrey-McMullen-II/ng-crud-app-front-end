package com.devglan.userportal.user;

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

    @Mock
    UserMapper userMapper;

    @InjectMocks
    UserService userService;

    private List<User> testUsers = new ArrayList<>();
    private List<UserDTO> testUserDTOS = new ArrayList<>();

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);

        testUsers.add(User.builder().id(1).email("test@email.com").firstName("tester").lastName("testing").build());
        testUsers.add(User.builder().id(2).email("tester@email.com").firstName("testy").lastName("tester").build());

        testUserDTOS.add(UserDTO.builder().Id(1).email("test@email.com").firstName("tester").lastName("testing").build());
        testUserDTOS.add(UserDTO.builder().Id(1).email("testy@email.com").firstName("testy").lastName("tester").build());
    }

    @Test
    public void createUser() {
        when(userRepository.save(testUsers.get(0))).thenReturn((testUsers.get(0)));
        when(userMapper.mapModelToDTO(testUsers.get(0))).thenReturn(testUserDTOS.get(0));

        User returnedUser = userRepository.save(testUsers.get(0));
        UserDTO returnedUserDTO = userMapper.mapModelToDTO(returnedUser);

        verify(userRepository, times(1)).save(testUsers.get(0));
        verify(userMapper, times(1)).mapModelToDTO(returnedUser);

        assertEquals(testUserDTOS.get(0), returnedUserDTO);
    }

    @Test
    public void findAllUsers() {
        when(userRepository.findAll()).thenReturn(testUsers);
        when(userMapper.mapModelsToDTOS(testUsers)).thenReturn(testUserDTOS);

        List<User> returnedUsers = userRepository.findAll();
        List<UserDTO> returnedUserDTOS = userMapper.mapModelsToDTOS(returnedUsers);

        verify(userRepository, times(1)).findAll();
        verify(userMapper, times(1)).mapModelsToDTOS(testUsers);

        assertEquals(testUserDTOS, returnedUserDTOS);
    }

    @Test
    public void findUserByUserId() {
        when(userRepository.findOne(1)).thenReturn(testUsers.get(1));
        when(userMapper.mapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        User returnedUser = userRepository.findOne(1);
        UserDTO returnedUserDTO = userMapper.mapModelToDTO(returnedUser);

        verify(userRepository, times(1)).findOne(1);
        verify(userMapper, times(1)).mapModelToDTO(returnedUser);

        assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void findUserByUserId_WhenUserIdNotFound() {
        when(userRepository.findOne(10)).thenReturn(null);

        User nullUser = userRepository.findOne(10);
        UserDTO nullUserDTO = userMapper.mapModelToDTO(nullUser);

        verify(userRepository, times(1)).findOne(10);
        verify(userMapper, times(1)).mapModelToDTO(nullUser);

        assertNull(nullUserDTO);
    }

    @Test
    public void updateUser() {
        when(userRepository.save(testUsers.get(1))).thenReturn(testUsers.get(1));
        when(userMapper.mapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        User returnedUser = userRepository.save(testUsers.get(1));
        UserDTO returnedUserDTO = userMapper.mapModelToDTO(returnedUser);

        verify(userRepository, times(1)).save(testUsers.get(1));
        verify(userMapper, times(1)).mapModelToDTO(returnedUser);

        assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void deleteUser() {
        when(userRepository.findOne(1)).thenReturn(testUsers.get(1));
        when(userMapper.mapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        User returnedUser = userRepository.findOne(1);
        userRepository.delete(returnedUser);
        UserDTO returnedUserDTO = userMapper.mapModelToDTO(returnedUser);

        verify(userRepository, times(1)).findOne(1);
        verify(userRepository, times(1)).delete(testUsers.get(1));
        verify(userMapper, times(1)).mapModelToDTO(returnedUser);

        assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void deleteUserByUserId_WhenUserIdNotFound() {
        when(userRepository.findOne(10)).thenReturn(null);
        when(userMapper.mapModelToDTO(null)).thenReturn(null);

        User nullUser = userRepository.findOne(10);
        UserDTO nullUserDTO = userMapper.mapModelToDTO(nullUser);

        verify(userRepository, times(1)).findOne(10);
        verify(userRepository, times(0)).delete(null);
        verify(userMapper, times(1)).mapModelToDTO(nullUser);

        assertNull(nullUserDTO);
    }
}