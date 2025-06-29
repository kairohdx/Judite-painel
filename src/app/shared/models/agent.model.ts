export interface Agent {
  id: number;
  name: string;
  sector: string;
}

export interface AgentForm {
  name: string;
  sector: string;
  companyId: number;
  userId: number;
}