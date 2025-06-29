import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IaModelConfig } from '../models/iaModel.model';

@Injectable({ providedIn: 'root' })
export class IaModelService {
  private apiUrl = '/api/v1/ia-models';

  constructor(private http: HttpClient) {}

  // Buscar configuração atual
  getConfig(): Observable<IaModelConfig> {
    return this.http.get<IaModelConfig>(`${this.apiUrl}/config`);
  }

  // Cadastrar nova configuração
  createConfig(config: IaModelConfig): Observable<IaModelConfig> {
    return this.http.post<IaModelConfig>(`${this.apiUrl}/config`, config);
  }

  // Atualizar configuração existente
  updateConfig(id: number, config: IaModelConfig): Observable<IaModelConfig> {
    return this.http.put<IaModelConfig>(`${this.apiUrl}/config/${id}`, config);
  }

  // Testar integração
  testIntegration(config: IaModelConfig): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(
      `${this.apiUrl}/test`,
      config
    );
  }
}