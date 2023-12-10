export class NgOrganizationChartNodeModel {
    Id: string;
    data: any;
    children: Array<NgOrganizationChartNodeModel>;
    showAddButton: boolean = false;
    showEditButton: boolean = false;
    showAttributes: boolean = false;
    changeColor:boolean=false;
    isUser:boolean = false;
}