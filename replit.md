# AgroSYS

## Overview

AgroSYS is a weather and agricultural intelligence platform designed for Angolan farmers. The application provides real-time meteorological data for various regions across Angola (municipalities, communes, cities, villages) and uses AI to generate crop recommendations based on current and forecasted weather conditions.

The system integrates with the Open-Meteo API for weather data and Google's Gemini AI to analyze climate patterns and suggest optimal crops for planting. The interface features a clean, agricultural-themed design with a mobile preview mockup showing how farmers would view information on their phones.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite as the build tool and development server.

**UI Component Library**: Shadcn/ui components built on Radix UI primitives, providing accessible and customizable UI elements. The design system follows the "new-york" style variant with a green agricultural theme.

**Styling**: TailwindCSS with custom color palette focused on agricultural greens (#2E7D32 primary, #81C784 secondary, #F9A825 accent yellow). Custom CSS variables enable light/dark theme support with agricultural-inspired color schemes.

**State Management**: TanStack Query (React Query) for server state management, handling data fetching, caching, and synchronization.

**Routing**: Wouter for lightweight client-side routing.

**Theme System**: Custom theme provider supporting light/dark modes with localStorage persistence. Default theme is light mode with agricultural green tones.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with two main endpoints:
- `/api/weather` - Fetches weather data from Open-Meteo API based on latitude/longitude coordinates
- `/api/crop-recommendations` - Processes weather data through Gemini AI to generate crop suggestions

**Development Mode**: Vite middleware integration for hot module replacement (HMR) during development.

**Production Build**: Server code bundled with esbuild, client assets built with Vite and served statically.

### Data Storage

**Database**: PostgreSQL accessed via Neon serverless driver for scalability.

**ORM**: Drizzle ORM for type-safe database operations and schema management.

**Schema**: Currently includes a users table with basic authentication fields (username, password). Weather and crop data are fetched in real-time from external APIs rather than stored locally.

**Session Storage**: In-memory storage implementation (`MemStorage` class) for development, designed to be swappable with database-backed storage in production.

### Authentication & Authorization

**Current Implementation**: Basic user schema exists with username/password fields, but authentication routes are not yet implemented in the codebase.

**Planned Approach**: Session-based authentication with connect-pg-simple for PostgreSQL session storage (dependency already included).

### External Dependencies

**Weather Data API**: Open-Meteo public API for real-time and forecast weather information including temperature, humidity, wind speed, precipitation, and 7-day forecasts.

**AI Service**: Google Gemini AI API (@google/genai) for analyzing weather patterns and generating agricultural recommendations. The AI receives weather data as input and returns crop suggestions with suitability ratings.

**Database Service**: Neon serverless PostgreSQL for scalable cloud database hosting.

**Design Philosophy**: The application follows a "reference-based with agricultural innovation" approach, inspired by modern weather dashboards (Weather.com, NOAA) and agricultural technology platforms (FarmLogs, Climate FieldView), adapted for Angolan farmers with the tagline "Tecnologia verde ao serviço do agricultor" (Green technology serving the farmer).

**Auto-refresh Strategy**: The Home page implements a 30-minute automatic refresh interval for weather data to keep information current without requiring manual user interaction.

**Typography**: Uses Poppins for headings/branding, Inter for body text, and Roboto Mono/Orbitron for meteorological data displays to convey technical precision.

**Responsive Design**: Mobile-first approach with a dedicated mobile phone mockup preview component showing how the interface appears on farmer's devices.