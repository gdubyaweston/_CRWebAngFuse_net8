export class CustomerInfo {
    profileID: number = -1;
    orderID: number = -1;
    customerID: number = -1;
    orderDate: Date | null = null;
    departmentID: string = '';
    status: string = '';
    aicStaff: string = '';
    displayName: string = '';
    firstName: string = '';
    lastName: string = '';
    nNumber: string = '';
    make: string = '';
    model: string = '';
    sn: string = '';
    email: string = '';
    companyName: string = '';
    address: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    countryCode: string = '';
    cellPhone: string = '';
    homePhone: string = '';
    businessPhone1: string = '';
    businessPhone2: string = '';

}

export class CustomerParams {
    lastName: string = '';
    nNumber: string = '';
    serialNumber: string = '';
    company: string = '';
    email: string = '';
    customerID: number = 0;
    orderID: number = 0;
}