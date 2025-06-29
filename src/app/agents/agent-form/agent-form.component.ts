import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../../shared/services/agent.service';
import { Agent, AgentForm } from '../../shared/models/agent.model';
import { AuthContextService } from '../../shared/services/authContext.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  isEditMode: boolean = false;
  agentId: number | null = null;
  agent: Agent | null = null;
  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private authContext: AuthContextService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const agentId = this.route.snapshot.paramMap.get('id');
    if (agentId) {
      this.isEditMode = true;
      this.agentId = +agentId;
      this.agentService.getAgentById(this.agentId).subscribe(agent => {
        this.agent = agent;
        this.agentForm.patchValue({
          name: agent.name,
          sector: agent.sector
        });
      });
    }
  }

  loadAgent(): void {
    this.agentService.getAgentById(this.agentId!).subscribe(agent => {
      this.agentForm.patchValue(agent);
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const agentFormValue = this.agentForm.value;
      // Assuming you can get companyId and userId from authContext or agent
      const companyId = this.authContext.company ? this.authContext.company.id : null;
      const userId = this.authContext.user ? this.authContext.user.id : null;

      const agentForm: AgentForm = {
        ...agentFormValue,
        companyId,
        userId
      };

      if (this.isEditMode) {
        this.agentService.updateAgent(agentForm, this.agentId!).subscribe(() => {
          this.snackbar.show('Agente atualizado com sucesso');
        });
      } else {
        this.agentService.createAgent(agentForm).subscribe(() => {
          this.snackbar.show('Agente criado com sucesso');
        });
      }
    }
  }
}