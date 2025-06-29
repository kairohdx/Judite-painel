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
  displayedColumns = ['agent', 'category', 'content', 'actions'];

  //mock data for testing
  knowledgeList = [
    {
      id: 1,
      agentName: 'Empresa Alpha',
      categoryName: 'Entrega',
      content: 'O prazo de entrega é de até 5 dias úteis.'
    },
    {
      id: 2,
      agentName: 'Empresa Beta',
      categoryName: 'Troca',
      content: 'A troca pode ser feita em até 30 dias após a compra.'
    },
    {
      id: 3,
      agentName: 'Empresa Alpha',
      categoryName: 'Garantia',
      content: 'A garantia cobre defeitos de fabricação por 1 ano.'
    }
  ];

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