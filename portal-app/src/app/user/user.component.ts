import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from './shared/models/user';
import {UserService} from './shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.getUsersByName();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  getUsersByName() {
    this.userService.getUsersByName()
      .subscribe(data => {
        this.users = data;
      });
  }

  onDeleteClicked(user: User) {
    this.userService.deleteUser(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  public onUpdateClicked(newUser: User) {
    this.userService.setSharedUser(newUser);
    this.router.navigate(['/update'], {replaceUrl: true});
  }
}

/* customer-contact.component.spec.ts

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TEST_CUSTOMER_CONTACTS} from '../../shared/models/test/customer-contacts';

import {CustomerContactComponent} from './customer-contact.component';

describe('CustomerContactComponent', () => {
  const TEST_CUSTOMER_CONTACT = TEST_CUSTOMER_CONTACTS[0];
  let component: CustomerContactComponent;
  let fixture: ComponentFixture<CustomerContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerContactComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get formatted city, state and postal code when all are present', () => {
    component.customerContact = TEST_CUSTOMER_CONTACT;
    const expectedFormattedCityStatePostalCode = `${TEST_CUSTOMER_CONTACT.contactAddressCity}, ${TEST_CUSTOMER_CONTACT.contactAddressState} ${TEST_CUSTOMER_CONTACT.contactAddressPostalCode}`;
    expect(component.getFormattedCityStatePostalCode()).toEqual(expectedFormattedCityStatePostalCode);
  });

  it('should get formatted city, state and postal code', () => {
    component.customerContact = TEST_CUSTOMER_CONTACTS[0];
    component.customerContact.contactAddressCity = '';
    component.customerContact.contactAddressState = '';
    component.customerContact.contactAddressPostalCode = '';

    expect(component.getFormattedCityStatePostalCode()).toEqual('');
  });

  it('should display edit customer contact form', () => {
    component.isCustomerContactFormVisible = false;
    component.showEditContactForm();
    expect(component.isCustomerContactFormVisible).toEqual(true);
  });
});
 */

/* customer-contact.component.ts

import {Component, Input} from '@angular/core';
import {CustomerContact} from '../../shared/models/customer-contact';

@Component({
  selector: 'tli-customer-contact',
  templateUrl: './customer-contact.component.html',
  styleUrls: ['./customer-contact.component.scss']
})
export class CustomerContactComponent {
  @Input() customerContact: CustomerContact;

  isCustomerContactFormVisible = false;

  constructor() { }

  getFormattedCityStatePostalCode(): string {
    if (this.isCustomerContactAddressEmpty()) {
      return '';
    }

    return `${this.customerContact.contactAddressCity || ''}, ${this.customerContact.contactAddressState || ''} ${this.customerContact.contactAddressPostalCode || ''}`;
  }

  private isCustomerContactAddressEmpty(): boolean {
    return !this.customerContact || !(
      this.customerContact.contactAddressCity ||
      this.customerContact.contactAddressState ||
      this.customerContact.contactAddressPostalCode);
  }

  showEditContactForm() {
    this.isCustomerContactFormVisible = true;
  }

}
 */

/* customer-contact.service.spec.ts

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {environment} from '../../../../environments/environment';
import {HttpService} from '../../../core/http/shared/services/http.service';
import {CustomerContact} from '../models/customer-contact';
import {TEST_CUSTOMER_CONTACT_TYPES} from '../models/test/customer-contact-types';
import {TEST_CUSTOMER_CONTACTS} from '../models/test/customer-contacts';
import {CustomerContactService} from './customer-contact.service';

describe('CustomerContactService', () => {
  const TEST_CUSTOMER_ID = 1;
  const TEST_CUSTOMER_CONTACT = TEST_CUSTOMER_CONTACTS[0];
  const TEST_CONTACT_ID = TEST_CUSTOMER_CONTACT.contactId;
  let customerContactService: CustomerContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerContactService,
        HttpService
      ]
    });

    customerContactService = TestBed.get(CustomerContactService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should find all customer contacts by customer id', () => {
    customerContactService.findCustomerContactsByCustomerId(TEST_CUSTOMER_ID).subscribe(
      (results: CustomerContact[]) => expect(results).toEqual(TEST_CUSTOMER_CONTACTS)
    );

    const req = httpMock.expectOne(`${environment.crmBaseUrl}/customers/${TEST_CUSTOMER_ID}/contacts`);
    req.flush(TEST_CUSTOMER_CONTACTS);

    expect(req.request.method).toEqual('GET');
  });

  it('should return a customer contact on creation', () => {
    spyOn(customerContactService, 'refreshCustomerContacts').and.stub();
    const endpoint = `${environment.crmBaseUrl}/customers/${TEST_CUSTOMER_ID}/contacts`;

    customerContactService.createCustomerContact(TEST_CUSTOMER_ID, TEST_CUSTOMER_CONTACT).subscribe(
      (result) => expect(result).toEqual(TEST_CUSTOMER_CONTACT)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_CUSTOMER_CONTACT);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('POST');
    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledTimes(1);
    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledWith(TEST_CUSTOMER_ID);
  });

  it('should return a customer contact on update', () => {
    spyOn(customerContactService, 'refreshCustomerContacts').and.stub();
    const endpoint = `${environment.crmBaseUrl}/customers/${TEST_CUSTOMER_ID}/contacts/${TEST_CUSTOMER_CONTACT.contactId}`;

    customerContactService.updateCustomerContact(TEST_CUSTOMER_ID, TEST_CUSTOMER_CONTACT).subscribe(
      (result) => expect(result).toEqual(TEST_CUSTOMER_CONTACT)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_CUSTOMER_CONTACT);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('PUT');
    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledTimes(1);
    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledWith(TEST_CUSTOMER_ID);
  });

  it('should return customer contact types when a GET request is made to /api/contacts/types', () => {
    const endpoint = `${environment.crmBaseUrl}/contacts/types`;

    customerContactService.findAllCustomerContactTypes().subscribe(
      (result) => expect(result).toEqual(TEST_CUSTOMER_CONTACT_TYPES)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_CUSTOMER_CONTACT_TYPES);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should refresh customer contacts when refresh is called', () => {
    spyOn(customerContactService, 'findCustomerContactsByCustomerId').and.stub();
    customerContactService.refreshCustomerContacts(TEST_CUSTOMER_ID);
    expect(customerContactService.findCustomerContactsByCustomerId).toHaveBeenCalledTimes(1);
    expect(customerContactService.findCustomerContactsByCustomerId).toHaveBeenCalledWith(TEST_CUSTOMER_ID);
  });

  it('should delete customer contact', () => {
    const endpoint = `${environment.crmBaseUrl}/customers/${TEST_CUSTOMER_ID}/contacts/${TEST_CONTACT_ID}`;

    spyOn(customerContactService, 'refreshCustomerContacts').and.stub();
    customerContactService.deleteCustomerContact(TEST_CUSTOMER_ID, TEST_CONTACT_ID).subscribe();

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush({});

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('DELETE');

    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledTimes(1);
    expect(customerContactService.refreshCustomerContacts).toHaveBeenCalledWith(TEST_CUSTOMER_ID);
  });
});
 */

/* customer-contact.service.ts
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/internal/Subject';
import {catchError, finalize} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {HttpService} from '../../../core/http/shared/services/http.service';
import {Service} from '../../../core/services/service';
import {CustomerContact} from '../models/customer-contact';
import {CustomerContactType} from '../models/customer-contact-type';

@Injectable()
export class CustomerContactService extends Service {
  protected baseUrl = `${environment.crmBaseUrl}/customers`;

  private readonly customerContacts = new Map<number, Subject<CustomerContact[]>>();

  constructor(private http: HttpService) {
    super();
  }

  findAllCustomerContactTypes(): Observable<CustomerContactType[]> {
    return this.http.getWithCaching<CustomerContactType[]>(`${environment.crmBaseUrl}/contacts/types`)
      .pipe(
        catchError(this.handleError)
      );
  }

  findCustomerContactsByCustomerId(customerId: number): Observable<CustomerContact[]> {
    if (!this.customerContacts.has(customerId)) { this.customerContacts.set(customerId, new Subject()); }

    this.http.get<CustomerContact[]>(`${this.baseUrl}/${customerId}/contacts`)
      .pipe(
        catchError(this.handleError)
      ).subscribe(
      (customerContacts: CustomerContact[]) => this.customerContacts.get(customerId).next(customerContacts),
      (error) => this.handleError(error)
    );

    return this.customerContacts.get(customerId).asObservable();
  }

  createCustomerContact(customerId: number, customerContact: CustomerContact): Observable<CustomerContact> {
    return this.http.post<CustomerContact>(`${this.baseUrl}/${customerId}/contacts`, JSON.stringify(customerContact))
      .pipe(
        catchError(this.handleError),
        finalize(() => this.refreshCustomerContacts(customerId))
      );
  }

  updateCustomerContact(customerId: number, customerContact: CustomerContact): Observable<CustomerContact> {
    return this.http.put<CustomerContact>(`${this.baseUrl}/${customerId}/contacts/${customerContact.contactId}`, JSON.stringify(customerContact))
      .pipe(
        catchError(this.handleError),
        finalize(() => this.refreshCustomerContacts(customerId))
      );
  }

  deleteCustomerContact(customerId: number, contactId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${customerId}/contacts/${contactId}`)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.refreshCustomerContacts(customerId))
      );
  }

  refreshCustomerContacts(customerId: number) {
    this.findCustomerContactsByCustomerId(customerId);
  }
}
 */
