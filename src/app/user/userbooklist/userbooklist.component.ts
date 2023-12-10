import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userbooklist',
  templateUrl: './userbooklist.component.html',
  styleUrls: ['./userbooklist.component.scss']
})
export class UserbooklistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Catogery=[
    {

      'id':'1',
      'book_name':'Computer Programings',
      'description':'Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with Bootstrap.',
      'author':'charles darvin'

    },
    {

      'id':'2',
      'book_name':'EEE',
      'description':'Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with Bootstrap.',
      'author':'Manirathinam'

    },
    {

      'id':'3',
      'book_name':'Mathematics',
      'description':'Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with Bootstrap.',
      'author':'Manjunath'

    },
    {

      'id':'4',
      'book_name':'Computer Programings',
      'description':'Documentation and examples for opt-in styling of tables (given their prevalent use in JavaScript plugins) with Bootstrap.',
      'author':'charles darvin'

    }
  ]
 

}
