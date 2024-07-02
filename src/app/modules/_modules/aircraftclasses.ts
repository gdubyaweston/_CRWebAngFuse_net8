export class AircraftInventoryItem {
    aircraftInventoryItemID: number = -1;
    faaid: number = -1;
    escrowOrderID: number = -1;
    qualifiesForIR: boolean = false;
    isFractional: boolean = false;
    isExactMatch: boolean = false;
    canAdd: boolean = false;
    inEscrowInvTable: boolean = false;
    cost: number = 0;
    certificationDate: Date | null = null;
    expirationDate: Date | null = null;
    dateAdded: Date | null = null;
    make: string = '';
    model: string = '';
    serialNumber: string = '';
    inventoryObjectType: string = '';
    nNumber: string = '';
    registrationCountry: string = '';
    mfrYear: string = '';
    registrationID: string = '';
    pendingNnumber: string = '';
    tempPROSummary: string = '';
    itemDisplay: string = '';
    
}