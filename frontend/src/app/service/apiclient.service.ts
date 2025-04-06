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
    return this.apollo.watchQuery({
      query: gql`query Query($username: String!, $password: String!) {
                login(username: $username, password: $password)
              }`,
      variables: {
        username,
        password
      },
    })
      .valueChanges.pipe(map((result: any) => {
        return result.data.login
      }));
  }

  signup(username: string, password: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`mutation Mutation($username: String!, $email: String!, $password: String!) {
                      signUp(username: $username, email: $email, password: $password) {
                        _id
                        username
                        email
                        password
                        createdAt
                        updatedAt
                      }
                    }`,
      variables: {
        username,
        password,
        email
      }
    }).pipe(map((result: any) => result.data))
  }

  getAllEmployees(): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: gql`
      query GetAllEmployees {
        getAllEmployees {
          _id
          firstname
          lastname
          email
          gender
          designation
          salary
          date_of_joining
          department
          employee_photo
          createdAt
          updatedAt
        }
      }
    `
    })
      .valueChanges.pipe(
        map(result => result.data.getAllEmployees)
      );
  }

  addEmployee(employee: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation Mutation(
        $firstname: String!,
        $lastname: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $dateOfJoining: String!,
        $department: String!,
        $employeePhoto: String!
      ) {
        addEmployee(
          firstname: $firstname,
          lastname: $lastname,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $dateOfJoining,
          department: $department,
          employee_photo: $employeePhoto
        ) {
          _id
        }
      }
    `,
      variables: employee
    }).pipe(map((result: any) => result.data.addEmployee));
  }
}
