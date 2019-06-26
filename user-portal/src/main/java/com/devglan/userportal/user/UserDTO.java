package com.devglan.userportal.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
class UserDTO {

    private Integer userId;
    private String email;
    private String firstName;
    private String lastName;
    private String anExtraField;
}
