
import { AircraftInventoryItem } from './aircraftclasses';
import { UserDetail } from './userclasses';

export class BosPdf {
  escrowOrderID: number = -1;
  fileName: string = '';
  fileDestination: string = '';
  fileType: string = '';
  
}

export class AraPdf {
  escrowOrderID: number = -1;
  fileName: string = '';
  fileDestination: string = '';
  fileType: string = '';
}

export class PoiPdf {
  escrowOrderID: number = -1;
  fileName: string = '';
  fileDestination: string = '';
  fileType: string = '';
}

export class OrderStatus {
  orderStatusID: number;
  orderStatusName: string;
}

export class EscrowListSearch  {
    orderStatusID: number;
    checkedOutToID: number;
    submittedByID: number;
    escrowOrderID: string;
}

export class EscrowList {
    orderStatusID: number;
    escrowOrderID: number;
    orderStatus: string;
    checkedOutToID: number;
    orderDate: Date;
    submittedByName: string;
    submittedByID: number;
    escrowDescription: string;
    participantDisplay: string;
}

export class EscrowOrder {
    escrowOrderID: number = -1;
    submittedByID: number = -1;
    submittedByRoleID: number = -1;
    checkedOutToID: number = -1;
    orderStatusID: number = -1;
    tsOrderID: number = -1;
    btBOrderID: number = -1;
    defaultChecklistCreated: boolean | null = false;
    notesMigrated: boolean | null = false; 
    docEscrow: boolean = false; 
    preOwned: boolean | null = false;
    hasLinkedOrder: boolean = false;
    purchasePrice: number = 0;
    totEscrowFee: number | null = 0;
    orderDate: Date | null = null;
    closingDate: Date | null = null;
    submittedByName: string = '';        
    checkedOutToName: string = '';        
    orderStatus: string = '';
    escrowDescription: string = '';
    participantDisplay: string = '';
    price_old: string = '';        
    notes: string = '';
    source: string = '';
    createdByASPNETUsers: string = '';
    updatedByASPNETUsers: string = '';
    emailSubjectDescription: string = '';
    orderDateShort: string = '';
    closingDateShort: string = '';

    inventoryItems: AircraftInventoryItem[] = [];
    participants: EscrowParticipant[] = [];    

  }

  export class EscrowParticipant {
    participantID: number = -1;
    escrowOrderID: number = -1;
    customerID: number = -1;
    roleID: number = -1;
    flagged_AspNetEmailMatched: boolean = false;
    defaultCatSetAdded: boolean = false;
    active: boolean = false;
    playerIsCompleted: boolean = false;
    percentage: number = 0;
    event_DateTimestamp: Date = new Date();
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    trackerDisplayAlias: string = '';
    company: string = '';
    title: string = '';
    address: string = '';
    address2: string = '';
    address3: string = '';
    city: string = '';
    state: string = '';
    province: string = '';
    region: string = '';
    postal: string = '';
    country: string = '';
    businessPhone: string = '';
    extension: string = '';
    businessPhone2: string = '';
    extension2: string = '';
    businessFax: string = '';
    homePhone: string = '';
    homePhone2: string = '';
    homeFax: string = '';
    pager: string = '';
    cellPhone: string = '';
    email: string = '';
    email2: string = '';
    email3: string = '';
    customerNotes: string = '';
    roleName: string = '';
    sqs: string = '';
    staffFirstName: string = '';
    closingRoomAUP_AcceptDeclineDate: string = '';
    closingRoomUserID: string = '';
    gcrAgreementType: string = '';
    nNumber: string = '';
    sn: string = '';
    displayName: string = '';
    notes: string = '';
    addedByClosingRoomID: string = '';
    playerName: string = '';
    playerTitle: string = '';
    playerDescription: string = '';
    isChecked: boolean = false;
    selectedCountryID: string = '';
    selectedRoleID: number = -1;
    selectedRegion: string = '';
    selectedUSID: number = -1;
    selectedCanadaID: number = -1;

    roleInfo: EscrowRole = new EscrowRole();
    availableRoles: EscrowRole[] = [];
    userInfo: UserDetail = new UserDetail();
    categoryTransactions: EscrowCategoryTransaction[] = [];

    setLinkedOrderData(iid: number = -1, eoid: number = -1, cid: number = -1, rid: number = -1, tda: string = ''): void 
    { 
        console.log(tda);
        //this.initialize();
        this.participantID = iid == null ? -1 : iid > 0 ? iid : -1;
        this.escrowOrderID = eoid == null ? -1 : eoid > 0 ? eoid : -1;
        this.customerID = cid == null ? -1 : cid > 0 ? cid : -1;
        this.roleID = rid == null ? -1 : rid > 0 ? rid : -1;
        this.trackerDisplayAlias = tda == null ? '' : tda != '' ? tda : '';   

    }
        
  }

  export class EscrowRole {
    roleId: number = -1; 
    displayOrder: number = -1; 
    isBccRecipient: boolean = false; 
    closingRoomNameCombo: boolean = false;
    roleName: string = ''; 
    closingStatementTitle: string = '';        
    description: string = ''; 

  }

  export class EscrowCategoryTransaction {
    escrowCategoryTransactionID: number = -1;
    escrowOrderID: number = -1;
    playerID: number = -1;
    documentCategoryID: number = -1;
    displayOrder: number = -1;
    docGroupTransactionID: number = -1;
    received: boolean = false;
    dateRecieved: Date | null = null;
    dateAdded: Date | null = null;
    customLabel: string = '';
    categoryGroup: string = '';
    addedByCRUID: string = '';

    escrowDocList: EscrowDoc[] = [];
    
  }

  export class EscrowDoc {
    escrowDocID: number = -1;
    escrowDocStatusTypeID: number = -1;
    enteredByID: number = -1;
    inQue: boolean = false;
    vtu: boolean = false;
    date: Date = new Date("01/01/1900 00:00:00");
    docName: string = '';
    path: string = '';
    fileType: string = '';
    mainframeData: string = '';
    htmlText: string = '';
    notes: string = '';
    description1: string = '';

  }

  export class EscrowParams {
    escrowOrderID: number = -1;
    submittedByID: number = -1;
    orderStatusID: number = -1; 
    checkedOutToID: number = -1;
    fundsID: number = -1;
    statementID: number = -1;;
    customerID: number = -1;
    agreementID: number = -1;
    orderDateStart: Date = new Date("01/01/1900 00:00:00");
    orderDateEnd: Date = new Date("01/01/2100 00:00:00");
    closingDateStart: Date = new Date("01/01/1900 00:00:00");
    closingDateEnd: Date = new Date("01/01/2100 00:00:00");
    useEngines: boolean = false;
    useProps: boolean = false; 
    iraf: boolean = false;
    irEngine: boolean = false;
    isEscrow: boolean = false;
    isIRSearch: boolean = false;
    isIncludeRegistration : boolean = false;
    isInclude337: boolean = false;        
    departmentName: string = '';
    fundListType: string = '';
    statementType: string = '';
    closingDescription: string = '';
    playerList: EscrowParticipant[] = [];
   
  }

