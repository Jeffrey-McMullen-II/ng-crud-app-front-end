package com.devglan.userportal.user;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class UserMapperTest
{
    private UserMapper userMapper;

    @Before
    public void setUp() {
        userMapper = new UserMapper();
    }

    @Test
    public void mapModelToDTO() {
        User user = User.builder()
                .id(1)
                .email("test@test.com")
                .firstName("Test")
                .lastName("Testington")
                .build();

        UserDTO userDTO = userMapper.mapModelToDTO(user);

        assertEquals(user.getId(), userDTO.getId());
        assertEquals(user.getFirstName(), userDTO.getFirstName());
        assertEquals(user.getLastName(), userDTO.getLastName());
        assertEquals(user.getEmail(), userDTO.getEmail());
    }
}