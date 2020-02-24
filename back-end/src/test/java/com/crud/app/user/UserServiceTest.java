package com.crud.app.user;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

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
        when(userMapper.explicitMapModelToDTO(testUsers.get(0))).thenReturn(testUserDTOS.get(0));

        UserDTO returnedUserDTO = userService.createUser(testUsers.get(0));

        Assertions.assertEquals(testUserDTOS.get(0), returnedUserDTO);
    }

    @Test
    public void findAllUsers() {
        when(userRepository.findAll()).thenReturn(testUsers);
        when(userMapper.mapModelsToDTOS(testUsers)).thenReturn(testUserDTOS);

        List<UserDTO> returnedUserDTOS = userService.findAllUsers();

        verify(userRepository, times(1)).findAll();
        verify(userMapper, times(1)).mapModelsToDTOS(testUsers);

        Assertions.assertEquals(testUserDTOS, returnedUserDTOS);
    }

    @Test
    public void findAllUsersByFirstName() {
        when(userRepository.findAll(new Sort(Sort.Direction.ASC, "firstName"))).thenReturn(testUsers);
        when(userMapper.mapModelsToDTOS(testUsers)).thenReturn(testUserDTOS);

        List<UserDTO> returnedUserDTOS = userService.findAllUsersByFirstName();

        verify(userRepository, times(1)).findAll(new Sort(Sort.Direction.ASC, "firstName"));
        verify(userMapper, times(1)).mapModelsToDTOS(testUsers);

        Assertions.assertEquals(testUserDTOS, returnedUserDTOS);
    }

    @Test
    public void findUserByUserId() {
        when(userRepository.findOne(1)).thenReturn(testUsers.get(1));
        when(userMapper.explicitMapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        UserDTO returnedUserDTO = userService.findUserByUserId(1);

        Assertions.assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void findUserByUserId_WhenUserIdNotFound() {
        when(userRepository.findOne(10)).thenReturn(null);

        UserDTO nullUserDTO = userService.findUserByUserId(10);

        Assertions.assertNull(nullUserDTO);
    }

    @Test
    public void updateUser() {
        when(userRepository.save(testUsers.get(1))).thenReturn(testUsers.get(1));
        when(userMapper.explicitMapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        UserDTO returnedUserDTO = userService.updateUser(testUsers.get(1));

        Assertions.assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void deleteUser() {
        when(userRepository.findOne(1)).thenReturn(testUsers.get(1));
        when(userMapper.explicitMapModelToDTO(testUsers.get(1))).thenReturn(testUserDTOS.get(1));

        UserDTO returnedUserDTO = userService.deleteUserByUserId(1);

        verify(userRepository, times(1)).delete(testUsers.get(1));

        Assertions.assertEquals(testUserDTOS.get(1), returnedUserDTO);
    }

    @Test
    public void deleteUserByUserId_WhenUserIdNotFound() {
        when(userRepository.findOne(10)).thenReturn(null);
        when(userMapper.explicitMapModelToDTO(null)).thenReturn(null);

        UserDTO nullUserDTO = userService.deleteUserByUserId(10);

        verify(userRepository, times(0)).delete(any(User.class));

        Assertions.assertNull(nullUserDTO);
    }
}