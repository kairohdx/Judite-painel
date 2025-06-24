import { Component, OnInit } from '@angular/core';
import { KnowledgeService } from '../../shared/services/knowledge.service';
import { Knowledge } from '../../shared/models/knowledge.model';

@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.css']
})
export class KnowledgeListComponent implements OnInit {
  knowledgeEntries: Knowledge[] = [];

  constructor(private knowledgeService: KnowledgeService) {}

  ngOnInit(): void {
    this.loadKnowledgeEntries();
  }

  loadKnowledgeEntries(): void {
    this.knowledgeService.getKnowledgeEntries().subscribe(
      (data: Knowledge[]) => {
        this.knowledgeEntries = data;
      },
      (error) => {
        console.error('Error fetching knowledge entries', error);
      }
    );
  }
}