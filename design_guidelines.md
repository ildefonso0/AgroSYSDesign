# AgroSYS Design Guidelines

## Design Approach
**Reference-Based with Agricultural Innovation**: Inspired by modern weather dashboards (Weather.com, NOAA) combined with agricultural technology platforms (FarmLogs, Climate FieldView), creating a bridge between sophisticated meteorological data and accessible farmer-focused interfaces.

**Core Philosophy**: Technology verde ao serviço do agricultor - balancing agricultural heritage with modern digital innovation for Angolan farmers.

---

## Color System

### Official Palette
- **Primary Green (Forest)**: `#2E7D32` - Nature, growth, trust - use for headers, primary CTAs, key data points
- **Secondary Green (Light)**: `#81C784` - Complementary lightness - cards, hover states, secondary elements  
- **Accent Yellow (Harvest)**: `#F9A825` - Sun, harvest, energy - warnings, highlights, important metrics
- **Neutral Light**: `#F5F7F4` - Soft greenish background for main content areas
- **Text Primary**: `#333333` - High contrast for body text and data
- **Dark Mode Base**: `#1B5E20` - Deep moss green for dark mode backgrounds

### Application Strategy
- Main background: Neutral Light (#F5F7F4)
- Cards/panels: White with subtle shadow
- Headers and navigation: Primary Green
- Data highlights: Accent Yellow
- Interactive elements: Secondary Green for hover, Primary for active

---

## Typography

### Font Families
- **Headings & Logo**: Poppins Bold (700) - Modern, clear, innovative
- **Body & UI Text**: Inter Regular (400) - Clean, professional, highly legible
- **Meteorological Data & Numbers**: Orbitron or Roboto Mono - Technical precision

### Hierarchy
- **Hero Title**: Poppins Bold, 48px desktop / 32px mobile
- **Section Headers**: Poppins Bold, 32px desktop / 24px mobile
- **Card Titles**: Poppins SemiBold, 20px
- **Body Text**: Inter Regular, 16px
- **Meteorological Data**: Roboto Mono, 18-24px for primary metrics
- **Small Text/Labels**: Inter Regular, 14px

---

## Layout System

### Spacing Primitives
Use Tailwind spacing units: **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Component padding: `p-4` to `p-8`
- Section spacing: `py-12` to `py-20`
- Card gaps: `gap-4` to `gap-6`

### Grid Structure
**Desktop (1280px+)**: Two-column layout
- Left Panel (65%): Weather dashboard, search, map, detailed data
- Right Panel (35%): Mobile phone mockup with simplified farmer view

**Tablet (768-1279px)**: Stacked layout with mobile mockup below main content

**Mobile (<768px)**: Single column, hide mockup (user is already on mobile)

### Maximum Widths
- Full container: `max-w-7xl mx-auto`
- Content sections: `max-w-6xl`
- Text blocks: `max-w-prose`

---

## Component Library

### Header
- Fixed top position with subtle shadow
- AgroSYS logo (left) with tagline "Tecnologia para o agricultor angolano"
- Search bar (center) - location/coordinate input with icon
- Dark/light mode toggle (right)
- Background: Primary Green with 95% opacity backdrop blur

### Weather Dashboard Cards
- White background with `rounded-2xl` corners
- Soft shadow: `shadow-md`
- Padding: `p-6`
- Weather metrics displayed in 2-3 column grid:
  - Temperature (large, Roboto Mono, 36px)
  - Humidity, Wind Speed, Precipitation (16px)
- Weather icons using Lucide Icons or similar linear icon set
- 7-day forecast in horizontal scroll grid

### Mobile Phone Mockup
- Right sidebar on desktop
- iPhone-style frame with rounded corners
- White interior with notification-style cards
- Display simplified summary:
  - "☀️ Hoje: 29°C, sem chuva"
  - "🌾 Cultura ideal: feijão e mandioca"
- Gentle scroll animation showing new recommendations

### Location Search
- Prominent search input with location pin icon
- Coordinate input fields (latitude/longitude) as alternative
- Recent searches dropdown
- Angolan municipalities autocomplete

### AI Recommendation Panel
- Distinct card with Secondary Green accent border
- Gemini AI badge/icon
- Crop recommendations with emoji indicators (🌾🌽🥔)
- Brief advisory text in friendly, accessible Portuguese
- "Boa altura para o milho" / "Evite batata-doce nesta semana"

### Footer
- Simple, centered
- Copyright: "© 2025 AgroSYS — Joaquim Ildefonso Mucuateno. Todos os direitos reservados."
- Background: Primary Green or white with subtle top border

---

## Interactions & Animations

### Subtle Transitions (Framer Motion)
- Card hover: slight lift with shadow increase
- Data refresh: gentle fade and scale
- Tab switching: smooth slide transition
- Loading states: skeleton screens with green shimmer

### Auto-Refresh
- Visual indicator (small pulsing dot) when updating
- Toast notification: "Dados atualizados" with timestamp
- Every 30 minutes background refresh

### Dark/Light Mode Toggle
- Smooth color transition (300ms)
- Persisted preference in localStorage
- Dark mode uses Deep Moss background with lighter text

---

## Icons & Graphics

### Icon System
- Lucide Icons or Feather Icons (linear, 2px stroke)
- Weather condition icons consistent throughout
- Agricultural symbols for crop types (🌾🌽🥔🍠)

### Visual Elements
- Minimize decorative graphics
- Focus on data visualization clarity
- Use icon + text labels for accessibility

---

## Images

### Hero Section
- **Optional agricultural hero image**: Angolan farmland or farmer using mobile technology (if available, use as subtle background with overlay)
- If hero image used: apply green tinted overlay (Primary Green at 10% opacity) for brand consistency
- Prefer clean, data-forward design without large hero - let weather dashboard be the star

### Throughout Site
- Weather condition illustrations (sun, clouds, rain) as subtle SVG backgrounds
- Map integration (Leaflet or Mapbox) showing Angola with location pins
- No decorative stock photos - focus on functional data presentation

---

## Accessibility

- High contrast ratios maintained (WCAG AA minimum)
- All interactive elements keyboard navigable
- ARIA labels on weather data and form inputs
- Focus states clearly visible with Primary Green outline
- Screen reader friendly data tables for forecast

---

## Special Considerations

### Angola-Specific Localization
- All text in Portuguese (Angola dialect)
- Timezone: Africa/Luanda
- Temperature in Celsius
- Precipitation in mm
- Wind speed in km/h

### Offline Considerations
- Cache last weather data
- Clear messaging when API unavailable
- "Dados de [timestamp]" to show data freshness

### Scalability Preparation
- Code structure ready for SMS integration
- Payment gateway placeholder sections
- Climate alerts system foundation