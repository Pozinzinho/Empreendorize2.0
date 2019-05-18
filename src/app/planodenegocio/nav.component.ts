import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  @Output() sidenavClose = new EventEmitter();
 
 
  ngOnInit() {
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    openNav() {
      document.getElementById("sidebar-wrapper").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    }
    
    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {
      document.getElementById("sidebar-wrapper").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
