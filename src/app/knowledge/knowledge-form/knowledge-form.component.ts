import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KnowledgeService } from '../../shared/services/knowledge.service';
import { AgentService } from '../../shared/services/agent.service';
import { CategoryService } from '../../shared/services/category.service';
import { Agent } from '../../shared/models/agent.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-knowledge-form',
  templateUrl: './knowledge-form.component.html',
  styleUrls: ['./knowledge-form.component.css']
})
export class KnowledgeFormComponent implements OnInit {
  knowledgeForm: FormGroup;
  agents: Agent[] = [];
  categories: Category[] = [];
  
  constructor(
    private fb: FormBuilder,
    private knowledgeService: KnowledgeService,
    private agentService: AgentService,
    private categoryService: CategoryService
  ) {
    this.knowledgeForm = this.fb.group({
      text: ['', Validators.required],
      categoryId: ['', Validators.required],
      agentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAgents();
    this.loadCategories();
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe((data: Agent[]) => {
      this.agents = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.knowledgeForm.valid) {
      this.knowledgeService.addKnowledge(this.knowledgeForm.value).subscribe(() => {
        // Handle successful submission (e.g., show a success message or redirect)
      });
    }
  }
}