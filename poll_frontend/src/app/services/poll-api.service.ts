import {Injectable} from '@angular/core';
import {Voting} from "../models/voting";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PollAPIService {

    constructor(
        private http: HttpClient
    ) { }

    public createPoll(formData: Voting) {
        return this.http.post<any>('/api/voting/create', {formData});
    }

    public startPoll(id: number) {
        return this.http.post<any>('/api/voting/start', {id: id});
    }
    public stopPoll(id: number) {
        return this.http.post<any>('/api/voting/stop', {id: id});
    }

    public getPollsList() {
        let params = new HttpParams();

        return this.http.get<Voting[]>('/api/voting/', {params});
    }
    public getPoll(accessCode: string) {
        let params = new HttpParams();
        params = params.append('access_code', String(accessCode));

        return this.http.get<Voting>('/api/voting/get', {params});
    }
}
