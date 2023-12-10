import { NgOrganizationChartNodeModel } from './../ng-organization-chart-node-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-organization-chart-list',
  templateUrl: './ng-organization-chart-list.component.html',
  styleUrls: ['./ng-organization-chart-list.component.css']
})
export class NgOrganizationChartListComponent implements OnInit {

  @Input() nodeList: Array<NgOrganizationChartNodeModel> =[];
  @Output() onClickNode: EventEmitter<NgOrganizationChartNodeModel> = new EventEmitter();
  @Output() onEditNode: EventEmitter<NgOrganizationChartNodeModel> = new EventEmitter();
  @Output() onAddAttributesNode: EventEmitter<NgOrganizationChartNodeModel> = new EventEmitter();
  @Output() onViewNode: EventEmitter<NgOrganizationChartNodeModel> = new EventEmitter();
  @Output() onDragNode: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onClickDeepNode(node) {
    this.onClickNode.emit(node);
  }

  onEditDeepNode(node) {
    this.onEditNode.emit(node);
  }

  onAddAttributesDeepNode(node) {
    this.onAddAttributesNode.emit(node);
  }

  onDragDeepNode(transfer) {
    this.onDragNode.emit(transfer)
  }
  onViewDeepNode(transfer) {
    this.onViewNode.emit(transfer)
  }
}
