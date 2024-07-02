import { AircraftInventoryItem } from './aircraftclasses';
import { UserDetail } from './userclasses';

export class FundingInformation {
    itemID: number = -1;
    escrowOrderID: number = -1;
    dateModified: Date | null = null;
    fundType: string = '';
    fundAmount: number = 0.00;
    description: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    company: string = '';
    currencyCode: string = '';
    currencySymbol: string = '';

  }

  export class AccountingList {
    itemID: number = -1;
    dateCreated: Date | null = null;
    dateModified: Date | null = null;
    isLocked: boolean = false;
    
  }

  export class AccountingStatement {
    statementID: number = -1
    orderID: number = -1;        
    dateModified: Date | null = null;
    dateCreated: Date | null = null;        
    isLocked: boolean = false;
    isDraft: boolean = false;
    statementType: string = '';
    reportNotes: string = '';
    accountingStatementTitle: string = '';        
    address1: string = '';
    address2: string = '';
    address3: string = '';
    city: string = '';
    countryCode: string = '';
    usCanStateCode: string = '';
    stateRegion: string = '';
    postalCode: string = '';
    email: string = '';
    email2: string = '';
    email3: string = '';
    closingAgentFirstName: string = '';
    closingAgentLastName: string = '';
    
  }

  export class ClosingList {
    statementID: number = -1
    dateModified: Date | null = null;
    dateCreated: Date | null = null;        
    isLocked: boolean = false;
    statementTitle: string = '';
    participant: string = '';

  }

  export class ClosingStatement {
    statementID: number = -1
    orderID: number = -1;
    playerID: number = -1;        
    dateModified: Date | null = null;
    dateCreated: Date | null = null;        
    isLocked: boolean = false;
    isDraft: boolean = false;
    reportNotes: string = '';
    closingStatementTitle: string = '';
    participantFirstName: string = '';
    participantLastName: string = '';
    company: string = '';
    participantRole: string = '';    
    address1: string = '';
    address2: string = '';
    address3: string = '';
    city: string = '';
    countryCode: string = '';
    usCanStateCode: string = '';
    stateRegion: string = '';
    postalCode: string = '';
    email: string = '';
    email2: string = '';
    email3: string = '';
    closingAgentFirstName: string = '';
    closingAgentLastName: string = '';
    
  }
