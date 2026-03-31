# LinguistGuard Frontend Implementation Plan

## 1. Objective
Build an interactive client component for the "LinguistGuard (Text Edition)" hackathon project. This tool will analyze suspicious Malayalam/Manglish text (like KSEB scams) and present a trust score and verdict using the Gemini API.

## 2. Component Structure (`app/page.tsx`)
1. **Header/Hero Section**:
   - Title: "LinguistGuard: Kerala Digital Trust Checker"
   - Subtitle explaining the purpose (verifying suspicious WhatsApp forwards).
2. **Input Section**:
   - Large `<textarea>` for pasting messages.
   - "Analyze Message" button with loading state (e.g., spinner/pulsing text).
3. **Results Card**:
   - Dynamically styled based on `trust_score` (Red/Orange/Green).
   - Sections for Verdict, Trust Score, Explanation, and Warning Badges (Red Flags).
4. **API Integration**:
   - `fetch` request to POST `/api/analyze` with the `{ text: inputText }` payload.
   - Handle loading, success, and error states gracefully.

## 3. State Management
- `inputText` (string): Tracks the textarea content.
- `isLoading` (boolean): True when fetch is in flight.
- `result` (object|null): Stores the JSON response.
- `error` (string|null): For user-facing error messages.

## 4. UI/UX Design System
- **Colors**:
  - Safe (80-100): Emerald/Green themes.
  - Suspicious (40-79): Amber/Orange themes.
  - Dangerous (0-39): Rose/Red themes.
- **Aesthetics**: Clean, modern, and mobile-first. Will use soft gradients, crisp typography, and trustworthy colors.
- **Micro-interactions**: Hover effects, disabled states, and smooth rendering of the results card.
- **Icons**: Usage of Lucide React for meaningful iconography (Security Shields, Warnings).

## 5. Execution Steps
1. Document the plan (`plan.md`).
2. Implement the UI in `app/page.tsx`, wiring up state and Tailwind styling.
3. Add robust error handling and loading indicators.
4. Verify dynamic theming mechanism based on the `trust_score` contract.
