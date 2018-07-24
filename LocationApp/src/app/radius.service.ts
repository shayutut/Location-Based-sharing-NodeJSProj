import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RadiusService {
    private subject = new Subject();

    constructor() { }
    getRadiusObservable() {
        return this.subject.asObservable();
    }

    updateRadius(value) {
        this.subject.next(value);
    }

}
