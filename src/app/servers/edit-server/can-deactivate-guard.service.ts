import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateComponent{
    canDeactivate : () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeacivateGuard implements CanDeactivate<CanDeactivateComponent> {

    canDeactivate(component : CanDeactivateComponent,
        currentRoute : ActivatedRouteSnapshot,
        currentState : RouterStateSnapshot,
        nextState ?: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
      return component.canDeactivate();
    }

}