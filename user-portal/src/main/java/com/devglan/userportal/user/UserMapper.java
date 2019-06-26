package com.devglan.userportal.user;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

/*
    http://modelmapper.org/getting-started/
*/

public class UserMapper {

    private ModelMapper modelMapper;

    UserMapper() {
        modelMapper = new ModelMapper();
    }

    UserDTO mapModelToDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    //Optional explicit mapping examples
    public UserDTO explicitMapModelToDto (User user) {

        ModelMapper modelMapper = new ModelMapper();

        PropertyMap<User, UserDTO> userMap = new PropertyMap<User, UserDTO>() {
            protected void configure() {
                skip(destination.getUserId());
                map().setEmail(source.getEmail());
                map().setFirstName(source.getFirstName());
                map().setLastName(source.getLastName());
            }
        };

        modelMapper.addMappings(userMap);

        return modelMapper.map(user, UserDTO.class);
    }
}