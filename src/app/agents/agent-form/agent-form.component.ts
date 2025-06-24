import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../shared/services/agent.service';
import { Agent } from '../../shared/models/agent.model';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {
  agentForm: FormGroup;
  isEditMode: boolean = false;
  agentId: number | null = null;

  constructor(private fb: FormBuilder, private agentService: AgentService) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Logic to check if editing an existing agent
    if (this.agentId) {
      this.isEditMode = true;
      this.loadAgent();
    }
  }

  loadAgent(): void {
    this.agentService.getAgentById(this.agentId!).subscribe(agent => {
      this.agentForm.patchValue(agent);
    });
  }

  onSubmit(): void {
    if (this.agentForm.valid) {
      const agent: Agent = this.agentForm.value;
      if (this.isEditMode) {
        this.agentService.updateAgent(this.agentId!, agent).subscribe(() => {
          // Handle successful update
        });
      } else {
        this.agentService.createAgent(agent).subscribe(() => {
          // Handle successful creation
        });
      }
    }
  }
}