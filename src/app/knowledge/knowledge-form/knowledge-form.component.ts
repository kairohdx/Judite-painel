import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '../../shared/services/knowledge.service';
import { AgentService } from '../../shared/services/agent.service';
import { CategoryService } from '../../shared/services/category.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Agent } from '../../shared/models/agent.model';
import { Category } from '../../shared/models/category.model';
import { Knowledge } from '../../shared/models/knowledge.model';

@Component({
  selector: 'app-knowledge-form',
  templateUrl: './knowledge-form.component.html',
  styleUrls: ['./knowledge-form.component.css']
})
export class KnowledgeFormComponent implements OnInit {
  knowledgeForm: FormGroup;
  agents: Agent[] = [];
  categories: Category[] = [];
  isEditMode = false;
  knowledgeId: number | null = null;
  knowledge: Knowledge | null = null;

  constructor(
    private fb: FormBuilder,
    private knowledgeService: KnowledgeService,
    private agentService: AgentService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.knowledgeForm = this.fb.group({
      agentId: ['', Validators.required],
      categoryId: ['', Validators.required],
      contentType: ['text', Validators.required],
      content: [''],
      contentUrl: [''],
      contentSelector: ['']
    });
  }

  ngOnInit(): void {
    this.loadAgents();
    this.loadCategories();

    // Atualiza validação dos campos dinâmicos ao trocar o tipo
    this.knowledgeForm.get('contentType')?.valueChanges.subscribe(type => {
      if (type === 'text') {
        this.knowledgeForm.get('content')?.setValidators([Validators.required]);
        this.knowledgeForm.get('contentUrl')?.clearValidators();
        this.knowledgeForm.get('contentSelector')?.clearValidators();
      } else {
        this.knowledgeForm.get('content')?.clearValidators();
        this.knowledgeForm.get('contentUrl')?.setValidators([Validators.required]);
        this.knowledgeForm.get('contentSelector')?.setValidators([Validators.required]);
      }
      this.knowledgeForm.get('content')?.updateValueAndValidity();
      this.knowledgeForm.get('contentUrl')?.updateValueAndValidity();
      this.knowledgeForm.get('contentSelector')?.updateValueAndValidity();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.knowledgeId = +id;
      this.knowledgeService.getKnowledgeEntry(this.knowledgeId).subscribe(knowledge => {
        this.knowledge = knowledge;
        this.knowledgeForm.patchValue(knowledge);
      });
    }
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
    if (this.knowledgeForm.invalid) return;
    const formValue = this.knowledgeForm.value;

    // Monta o payload conforme o tipo selecionado
    let payload: any = {
      agentId: formValue.agentId,
      categoryId: formValue.categoryId,
      contentType: formValue.contentType
    };
    if (formValue.contentType === 'text') {
      payload.content = formValue.content;
    } else {
      payload.contentUrl = formValue.contentUrl;
      payload.contentSelector = formValue.contentSelector;
    }

    if (this.isEditMode && this.knowledgeId) {
      this.knowledgeService.updateKnowledgeEntry(this.knowledgeId, payload).subscribe(() => {
        this.snackbar.show('Conhecimento atualizado com sucesso!', true);
        this.router.navigate(['/conhecimento']);
      });
    } else {
      this.knowledgeService.createKnowledgeEntry(payload).subscribe(() => {
        this.snackbar.show('Conhecimento criado com sucesso!', true);
        this.router.navigate(['/conhecimento']);
      });
    }
  }
}