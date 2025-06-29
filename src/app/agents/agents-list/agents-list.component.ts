import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../shared/services/agent.service';
import { Agent } from '../../shared/models/agent.model';
import { UserService } from '../../shared/services/user.service';
import { AuthContextService } from '../../shared/services/authContext.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {
  agents: Agent[] = [
    { id: 1, name: 'Empresa Alpha', sector: 'Logística' },
    { id: 2, name: 'Empresa Beta', sector: 'Varejo' },
    { id: 3, name: 'Empresa Gama', sector: 'Tecnologia' }
  ];

  displayedColumns = ['name', 'sector', 'actions'];

  constructor(private agentService: AgentService, private authContext: AuthContextService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.authContext.setUser(user);
    });
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