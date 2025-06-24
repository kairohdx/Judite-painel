import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Knowledge } from '../models/knowledge.model';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  private apiUrl = 'http://localhost:8000/api/knowledge'; // URL da API FastAPI

  constructor(private http: HttpClient) { }

  getKnowledgeEntries(): Observable<Knowledge[]> {
    return this.http.get<Knowledge[]>(this.apiUrl);
  }

  getKnowledgeEntry(id: number): Observable<Knowledge> {
    return this.http.get<Knowledge>(`${this.apiUrl}/${id}`);
  }

  createKnowledgeEntry(knowledge: Knowledge): Observable<Knowledge> {
    return this.http.post<Knowledge>(this.apiUrl, knowledge);
  }

  updateKnowledgeEntry(id: number, knowledge: Knowledge): Observable<Knowledge> {
    return this.http.put<Knowledge>(`${this.apiUrl}/${id}`, knowledge);
  }

  deleteKnowledgeEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}