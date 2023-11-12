import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private apiurl ="https://api.github.com/users"

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(username: string): Observable<any[]> {
    const url = `${this.apiurl}/${username}/repos`;
    return this.httpClient.get<any[]>(url, { params: { per_page: '100' } });
    
    }
    getRepositoryTopics(username: string, repo: string): Observable<any> {
      const url = `${this.apiurl}${username}/${repo}/topics`;
      return this.httpClient.get(url);
    }
    getPaginatedData(username: string, page: number, pageSize: number): Observable<any> {
      const url = `${this.apiurl}/${username}/repos?page=${page}`;
      const params = new HttpParams()
        .set('page', page)
        .set('pageSize', pageSize);
      return this.httpClient.get<any>(url);
  } 
}
