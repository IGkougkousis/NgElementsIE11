import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  @Input() 
  public prop1: any;

  public prop2: any;

  constructor() { }

  ngOnInit(): void {
  }

}
