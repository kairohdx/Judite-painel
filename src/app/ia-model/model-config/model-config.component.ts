import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelField, ModelOption } from '../../shared/models/iaModel.model';
import { IaModelService } from '../../shared/services/iaModel.service';
import { SnackbarService } from '../../shared/services/snackbar.service';


@Component({
  selector: 'app-model-config',
  templateUrl: './model-config.component.html',
  styleUrls: ['./model-config.component.css']
})
export class ModelConfigComponent implements OnInit {
  modelForm!: FormGroup;

  testingIntegration = false;
  testResult: boolean | null = null;

  models: ModelOption[] = [
    { value: 'openai', label: 'OpenAI (ChatGPT)' },
    { value: 'azure', label: 'Azure OpenAI' },
    { value: 'google', label: 'Google Gemini' },
    { value: 'huggingface', label: 'HuggingFace' }
  ];

  modelFields: { [key: string]: ModelField[] } = {
    openai: [
      { name: 'apiKey', label: 'API Key', required: true }
    ],
    azure: [
      { name: 'apiKey', label: 'API Key', required: true },
      { name: 'endpoint', label: 'Endpoint', required: true }
    ],
    google: [
      { name: 'apiKey', label: 'API Key', required: true }
    ],
    huggingface: [
      { name: 'accessToken', label: 'Access Token', required: true }
    ]
  };

  dynamicFields: ModelField[] = [];

    constructor(
    private fb: FormBuilder,
    private iaService: IaModelService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      model: [null, Validators.required]
    });
  }

  onModelChange(model: string) {
    // Remove campos antigos
    Object.keys(this.modelForm.controls).forEach(key => {
      if (key !== 'model') {
        this.modelForm.removeControl(key);
      }
    });

    // Adiciona campos do modelo selecionado
    this.dynamicFields = this.modelFields[model] || [];
    this.dynamicFields.forEach(field => {
      this.modelForm.addControl(
        field.name,
        field.required ? this.fb.control('', Validators.required) : this.fb.control('')
      );
    });
  }

    onSubmit() {
    if (this.modelForm.valid) {
      this.iaService.createConfig(this.modelForm.value).subscribe({
        next: (res) => {
          console.log('Configuração salva com sucesso!', res);
          this.snackbar.show('Configuração salva com sucesso!', true);
        },
        error: (err) => {
          console.error('Erro ao salvar configuração:', err);
          this.snackbar.show('Erro ao salvar configuração', false);
        }
      });
    }
  }
  
  testIntegration() {
    if (this.modelForm.valid) {
      this.testingIntegration = true;
      this.testResult = null;
      this.iaService.testIntegration(this.modelForm.value).subscribe({
        next: (res) => {
          this.testingIntegration = false;
          this.testResult = !!res.success;
        },
        error: () => {
          this.testingIntegration = false;
          this.testResult = false;
        }
      });
    }
  }
}
