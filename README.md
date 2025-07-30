# Vehicle Tracking Management System

A comprehensive vehicle tracking management system with mobile app and web admin interface.

## Features

### Mobile App
- Real-time vehicle tracking
- Route management and optimization
- Driver authentication
- Navigation assistance
- Trip history and reports
- Geofence notifications

### Web Admin
- Company and fleet management
- User and role management
- Vehicle and device management
- Route planning and optimization
- Geofencing configuration
- Real-time monitoring dashboard
- Comprehensive reporting and analytics
- Device integration (GPS trackers)
- Alert and notification management

## Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.io for real-time features
- JWT authentication
- Redis for caching
- Docker for containerization

### Web Admin
- React.js with TypeScript
- Material-UI for modern interface
- Redux for state management
- Google Maps API integration
- Chart.js for analytics

### Mobile App
- React Native with TypeScript
- Redux for state management
- React Navigation
- Google Maps integration
- Push notifications

## Project Structure

```
vehicle-tracking-system/
├── backend/                 # Node.js API server
├── web-admin/              # React web admin interface
├── mobile-app/             # React Native mobile app
├── shared/                 # Shared types and utilities
├── docs/                   # Documentation
└── docker-compose.yml      # Docker configuration
```

## Quick Start

1. Clone the repository
2. Install dependencies: `npm run install-all`
3. Set up environment variables
4. Start development: `npm run dev`

## Documentation

- [API Documentation](./docs/api.md)
- [Web Admin Guide](./docs/web-admin.md)
- [Mobile App Guide](./docs/mobile-app.md)
- [Device Integration](./docs/device-integration.md)
- [Deployment Guide](./docs/deployment.md)

## License

MIT License