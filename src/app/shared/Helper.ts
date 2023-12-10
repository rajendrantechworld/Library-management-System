import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgOrganizationChartNodeModel } from 'ng-organization-chart/ng-organization-chart-node-model';

@Injectable({
    providedIn: 'root'
})

export class Helper {

    getIdString(name: string, len: number): string {
        let returnString = "";
        let n = Math.floor((len / 10) + 1);
        let next: number = len + 1;
        returnString = name.substring(0, 2).toUpperCase() + "00000".substring(0, 5 - n) + next.toString();
        return returnString;
    }

    createTree(options: any, data: any): NgOrganizationChartNodeModel[] {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent_geo_code';
        var CHILDREN_KEY = options.childrenKey || 'children';
        var tree = [],
            childrenOf = {};
        var item, id, parentId;
        for (var i = 0, length = data.length; i < length; i++) {
              item = data[i];
              id = item[ID_KEY];
              parentId = item[PARENT_KEY] || 0;
            // every item may have children
              childrenOf[id] = childrenOf[id] || [];
            // init its children
              item[CHILDREN_KEY] = childrenOf[id];
              if (parentId != 0) {
                  // init its parent's children object
                  childrenOf[parentId] = childrenOf[parentId] || [];
                  // push it into its parent's children object
                  childrenOf[parentId].push(item);
              } else {
                  tree.push(item);
              }
        };
        let tempNodes: NgOrganizationChartNodeModel[] = tree as NgOrganizationChartNodeModel[];
        
        return tempNodes;
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    currencyValidation(input: any): boolean {
        let withDecPoint = new RegExp(/^\d+\.\d\d$/);
        let withOutDecPoint = new RegExp(/^\d+$/);
        return (withDecPoint.test(input) || withOutDecPoint.test(input)) ? true : false;
    }

    IsDuplicate(checkValue: string, checkColumn: string, checkID: number, checkData: any[]): boolean {
        let isValid: boolean = false;
        if (checkID > 0) {
            let found = checkData.findIndex(a => a[checkColumn] == checkValue && a.Id != checkID);
            isValid = found >= 0 ? false: true;
        } else {
            let found = checkData.findIndex(a => a[checkColumn] == checkValue);
            isValid = found >= 0 ? false: true;
        }
        return isValid;
    }

    BeginningNoSpace(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }
}

