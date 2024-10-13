import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModalRef, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { filter, map, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  title: string = '';
  @ViewChild('content') content!: ElementRef;
  modalRef!: NgbModalRef;

  items = ['Products', 'Users'];

  constructor(
    private offcanvasService: NgbOffcanvas,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.subscribeToRouteChangeEvents();
  }
  openNav() {
    this.offcanvasService.open(this.content, { position: 'end' });
  }

  private setTitleFromRouteData(routeData: any) {
    if (routeData && routeData['title']) this.title = routeData['title'];
    else this.title = 'Products';
    this.titleService.setTitle(this.title + ' | Dublin City Motors');
  }

  private getLatestChild(route: any) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private subscribeToRouteChangeEvents() {
    // Set initial title
    const latestRoute = this.getLatestChild(this.route);
    if (latestRoute) {
      this.setTitleFromRouteData(latestRoute.data.getValue());
    }
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => this.getLatestChild(route)),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.setTitleFromRouteData(event);
      });
  }

  navProducts(link: string) {
    switch (link) {
      case 'products':
        this.router.navigate(['/']);
        break;
      case 'categories':
        this.router.navigate(['/categories']);
        break;
      case 'tags':
        this.router.navigate(['/tags']);
        break;
      case 'attributes':
        this.router.navigate(['/attributes']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
