import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanDeactivateComponent } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowedEdit : boolean = false;
  changesSaved : boolean = false;

  constructor(private serversService: ServersService,
    private route : ActivatedRoute,
    private router : Router) { }
  

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.snapshot.queryParams['allowedEdit']);
    console.log(this.route.snapshot.fragment);
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe((queryParams : Params) => {
      this.allowedEdit = queryParams['allowedEdit'] === '1' ? true : false;
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo : this.route})
  }

  canDeactivate() : boolean | Observable<boolean> | Promise<boolean>{
    if(!this.allowedEdit){
      return true;
    }
    else{
      if(this.serverName != this.server.name || this.serverStatus != this.server.status && !this.changesSaved){
        return confirm("Are you sure you want to discard the changes?");
      }
      else{
        return true;
      }
    }
  }



}
