export class DropdownSettingsModel{
    singleSelection: false;
    idField: number;
    textField: string;
    appendField:string;
    selectAllText: string;
    unSelectAllText: string;
    itemsShowLimit: number;
    allowSearchFilter: boolean;
}

export enum EventType {
    areaChanged,
    subAreaChanged,
    queryParamChanged,
}

export abstract class EventStatusHandler {
    public abstract EventUpdate(eventData: EventData): void;
}

export interface EventData {
    type: EventType;
    id?: string;
    data?: any;
    eventStatusHandler?: EventStatusHandler;
    name?: string;
}


