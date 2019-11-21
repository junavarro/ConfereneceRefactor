import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class CollapsibleComponent implements AfterViewInit {
  // @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "150px";

  constructor(public renderer: Renderer2) { }

  ngAfterViewInit() {
    //this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }

}
