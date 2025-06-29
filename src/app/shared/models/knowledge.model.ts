export interface Knowledge {
  id?: number;
  agentId: number;
  categoryId: number;
  contentType: 'text' | 'url';
  content?: string;           // usado se contentType === 'text'
  contentUrl?: string;        // usado se contentType === 'url'
  contentSelector?: string;   // usado se contentType === 'url'
}