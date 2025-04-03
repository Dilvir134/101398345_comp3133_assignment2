import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apollo, gql} from 'apollo-angular';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  constructor(private httpClient: HttpClient, private apollo: Apollo) { }

  login(username: string, password: string): Observable<any> {
    this.apollo.watchQuery({
      query: gql`query Query($username: String!, $password: String!) {
                login(username: $username, password: $password)
              }`,
      variables: {
        username,
        password
      },
    })
      .valueChanges.pipe(map((result: any) => result.data.login));
  }


}
