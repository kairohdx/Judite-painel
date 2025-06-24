# AI Admin Panel

This project is an administrative panel built with Angular for managing AI agents and their knowledge categories. It communicates with a FastAPI backend to perform CRUD operations on agents, categories, and knowledge entries.

## Features

- **Agent Management**: 
  - Register and manage AI agents with details such as name and sector.
  - View a list of registered agents.

- **Category Management**: 
  - Create and manage knowledge categories (e.g., "delivery", "exchange", "warranty").
  - View a list of categories.

- **Knowledge Management**: 
  - Associate multiple categories with each agent.
  - Add knowledge content (text) for each category linked to an agent.

## Project Structure

```
judite-admin-panel
├── src
│   ├── app
│   │   ├── agents
│   │   │   ├── agents-list
│   │   │   ├── agent-form
│   │   │   └── agents.module.ts
│   │   ├── categories
│   │   │   ├── categories-list
│   │   │   ├── category-form
│   │   │   └── categories.module.ts
│   │   ├── knowledge
│   │   │   ├── knowledge-list
│   │   │   ├── knowledge-form
│   │   │   └── knowledge.module.ts
│   │   ├── shared
│   │   │   ├── models
│   │   │   └── services
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd judite-admin-panel
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   ng serve
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`.

## Technologies Used

- Angular
- Angular Material
- Reactive Forms
- FastAPI (backend)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.