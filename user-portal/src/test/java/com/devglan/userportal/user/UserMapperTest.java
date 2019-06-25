package com.devglan.userportal.user;

public class UserMapperTest
{

}

/*
package com.tli.crm.customers.contacts;

import com.tli.crm.contacts.Contact;
import com.tli.crm.contacts.ContactDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CustomerContactMapperTest {

    private CustomerContactMapper customerContactMapper;

    @BeforeEach
    void setUp() {
        customerContactMapper = new CustomerContactMapper();
    }

    @Test
    void mapModelToDTO() {
        Contact contact = Contact.builder()
            .contactId(1)
            .firstName("Test")
            .lastName("Name")
            .phoneNumber("(555) 555-5555")
            .email("test.email@example.org")
            .build();
        CustomerContact customerContact = new CustomerContact();
        customerContact.setId(new CustomerContactId(1, 1));
        customerContact.setContact(contact);
        customerContact.setPrimary(true);

        ContactDTO contactDTO = customerContactMapper.mapModelToDTO(customerContact, ContactDTO.class);

        Assertions.assertEquals(contact.getContactId(), contactDTO.getContactId(), "Contact ids do not match");
        Assertions.assertEquals(contact.getFirstName(), contactDTO.getContactFirstName(), "Contact first names do not match");
        Assertions.assertEquals(contact.getLastName(), contactDTO.getContactLastName(), "Contact last names do not match");
        Assertions.assertEquals(contact.getEmail(), contactDTO.getContactEmail(), "Emails do not match");
        Assertions.assertEquals(contact.getPhoneNumber(), contactDTO.getContactPhoneNumber(), "Phone numbers do not match");
    }

}
 */
