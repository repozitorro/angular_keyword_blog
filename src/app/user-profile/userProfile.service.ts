import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileInterface} from '../shared/types/profile.interface';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {GetUserProfileResponseInterface} from './types/getUserProfileResponse.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {
  }

  getUserProfile(username: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${username}`;
    return this.http.get(url).pipe(map((res: GetUserProfileResponseInterface) => res.profile));
  }
}
