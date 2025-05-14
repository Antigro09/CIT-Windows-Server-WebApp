# Modern Full Stack Application Structure

```
TaskMaster/
├── TaskMaster.API/            # Backend ASP.NET Core API
│   ├── Controllers/           # API controllers
│   ├── Models/                # Data models
│   ├── Services/              # Business logic
│   ├── Data/                  # Database context and migrations
│   ├── Middleware/            # Custom middleware components
│   ├── appsettings.json       # Configuration settings
│   └── Program.cs             # Application entry point
│
├── TaskMaster.Client/         # Frontend React application
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── api/               # API client services
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Helper functions
│   │   ├── App.js             # Root component
│   │   └── index.js           # Entry point
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── TaskMaster.Core/           # Shared business logic and models
│   ├── Entities/              # Domain entities
│   ├── Interfaces/            # Abstraction interfaces
│   ├── DTOs/                  # Data Transfer Objects
│   └── Exceptions/            # Custom exceptions
│
├── TaskMaster.Infrastructure/ # Data access and external services
│   ├── Data/                  # Database implementation
│   ├── Repositories/          # Data repositories
│   └── Services/              # External service integrations
│
├── .gitignore                 # Git ignore file
├── TaskMaster.sln             # Solution file
└── README.md                  # Project documentation
```

This structure follows clean architecture principles and separation of concerns, making it scalable and maintainable.
