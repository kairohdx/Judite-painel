import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../shared/services/agent.service';
import { Agent } from '../../shared/models/agent.model';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {
  agents: Agent[] = [];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe((data: Agent[]) => {
      this.agents = data;
    });
  }

  deleteAgent(agentId: number): void {
    this.agentService.deleteAgent(agentId).subscribe(() => {
      this.loadAgents();
    });
  }
}