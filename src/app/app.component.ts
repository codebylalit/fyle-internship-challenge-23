import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userdata = [];
  public arr: any = [];
  public repo: any = [];
  public datas: any = [];
  public paginate: any[] = [];
  public username: string = "johnpapa";
  public totalRepos: any[] = [];
  public display: any = [];
  public topics = [];
  public loading = true;
  currentPage = 1;
  totalPages = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe((Response: any) => {
      this.userdata = Response
      JSON.stringify(this.arr)
      this.arr.push(this.userdata);
    });
    this.apiService.getRepos('johnpapa').subscribe((Response: any) => {
      this.datas = Response
      this.repo.push(this.datas);
      this.loading = false;
      this.totalRepos = this.repo[0].length;
      this.loadRepositories(event);
    })
  }
  loadRepositoryTopics(): void {
    this.apiService.getRepositoryTopics(this.username, this.repo).subscribe(
      (data: any) => {
        this.topics = data.topics;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  loadRepositories(currentPage1: any, from:any = '') {
    this.apiService.getPaginatedData(this.username, this.currentPage, this.totalPages)
      .subscribe(response => {
        this.paginate = response;
        if(from === 'click'){
          this.currentPage = currentPage1;
          const startIndex = (currentPage1 - 1) * this.totalPages;
          const endIndex = Math.min(startIndex + this.totalPages, this.repo[0].length);
          this.display = this.repo[0].slice(startIndex, endIndex);
        }else{
          const startIndex = (this.currentPage - 1) * this.totalPages;
          const endIndex = Math.min(startIndex + this.totalPages, this.repo[0].length);
          this.display = this.repo[0].slice(startIndex, endIndex);
        }
      });
  }
  nextPage(): void {
    if (this.currentPage < 9) {
      this.currentPage++;
      this.loadRepositories(this.currentPage);
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories(this.currentPage);
    }
  }
  getVisiblePages(): number[] {
    const startPage = Math.max(this.currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, this.totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

}
