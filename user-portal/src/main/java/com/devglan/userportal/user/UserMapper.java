package com.devglan.userportal.user;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
class UserMapper {

    private ModelMapper modelMapper;

    UserMapper() {
        modelMapper = new ModelMapper();
    }

    UserDTO mapModelToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    List<UserDTO> mapModelsToDTOS(List<User> users) {
        if (users != null) {
            List<UserDTO> userDTOS = new ArrayList<>();
            for(User user : users) {
                userDTOS.add(explicitMapModelToDTO(user));
            }
            return userDTOS;
        }
        return null;
    }

    //Optional explicit mapping examples
    UserDTO explicitMapModelToDTO (User user) {
        ModelMapper modelMapper = new ModelMapper();

        PropertyMap<User, UserDTO> userMap = new PropertyMap<User, UserDTO>() {
            protected void configure() {
                map().setId(source.getId());
                map().setEmail(source.getEmail());
                map().setFirstName(source.getFirstName());
                map().setLastName(source.getLastName());
            }
        };

        modelMapper.addMappings(userMap);

        return modelMapper.map(user, UserDTO.class);
    }
}