# Requirements Document

## Introduction

This document outlines the requirements for fixing two critical issues in the portfolio application:

1. Magic link authentication redirect loop preventing admin access
2. Three.js background animation with distracting geometric objects that detract from the visual experience

## Glossary

- **Magic Link**: A passwordless authentication method where users receive an email with a link to sign in
- **Auth Callback**: The route that handles authentication responses from Supabase after a user clicks the magic link
- **Three.js Scene**: The 3D canvas rendering animated objects in the background
- **Geometric Objects**: The 3D shapes (torus knot, icosahedron, box, spheres, octahedron) currently visible in the animation
- **Middleware**: Next.js middleware that protects routes requiring authentication
- **Session Cookie**: Browser cookie storing authentication state

## Requirements

### Requirement 1: Magic Link Authentication Flow

**User Story:** As an admin user, I want to sign in using a magic link sent to my email, so that I can access the admin dashboard without remembering a password.

#### Acceptance Criteria

1. WHEN an admin user enters their email and clicks "Send Magic Link" THEN the system SHALL send an authentication email with a valid callback URL
2. WHEN a user clicks the magic link in their email THEN the system SHALL process the authentication callback and establish a valid session
3. WHEN authentication is successful THEN the system SHALL redirect the user to the admin dashboard at `/admin`
4. WHEN the middleware checks authentication THEN the system SHALL correctly read the session cookie and allow access to protected routes
5. WHEN authentication fails THEN the system SHALL display a clear error message and remain on the login page

### Requirement 2: Three.js Background Optimization

**User Story:** As a visitor to the portfolio site, I want a clean and elegant animated background, so that I can focus on the content without visual distractions.

#### Acceptance Criteria

1. WHEN the Three.js scene renders THEN the system SHALL display only subtle particle effects and stars without large geometric objects
2. WHEN the user scrolls the page THEN the system SHALL apply smooth parallax effects to the background elements
3. WHEN the user moves their mouse THEN the system SHALL apply subtle interactive effects without overwhelming the visual space
4. WHEN the page loads on mobile devices THEN the system SHALL render a performance-optimized version with reduced particle counts
5. WHEN a user has reduced motion preferences enabled THEN the system SHALL respect accessibility settings and minimize animations
6. WHEN the background renders THEN the system SHALL maintain smooth 60fps performance without impacting page interactivity

### Requirement 3: Session Management

**User Story:** As an authenticated admin, I want my session to persist across page refreshes, so that I don't have to re-authenticate frequently.

#### Acceptance Criteria

1. WHEN a user successfully authenticates THEN the system SHALL store the session in secure HTTP-only cookies
2. WHEN a user refreshes the page THEN the system SHALL maintain the authenticated session
3. WHEN a user navigates between admin pages THEN the system SHALL preserve authentication state
4. WHEN a session expires THEN the system SHALL redirect the user to the login page with an appropriate message
