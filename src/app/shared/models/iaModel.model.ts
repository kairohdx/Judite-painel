

export interface ModelField {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}

export interface ModelOption {
  value: string;
  label: string;
}

export interface IaModelConfig {
  id?: number;
  model: string;
  [key: string]: any;
}