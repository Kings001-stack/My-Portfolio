# Design Document

## Overview

This design addresses two critical issues in the portfolio application:

1. **Authentication Flow**: Implement a proper Supabase auth callback handler to process magic link authentication and establish sessions correctly
2. **Three.js Background**: Simplify the 3D scene by removing distracting geometric objects while maintaining elegant particle effects

The solution will ensure seamless admin authentication and a clean, professional visual experience.

## Architecture

### Authentication Architecture

```
User Flow:
1. User enters email on /login
2. Supabase sends magic link email
3. User clicks link → redirects to /auth/callback
4. Callback handler exchanges code for session
5. Session stored in cookies
6. Redirect to /admin
7. Middleware validates session cookie
```

**Components:**

- `/app/auth/callback/route.ts` - New API route to handle auth callbacks
- `/app/login/page.tsx` - Updated to use correct redirect URL
- `/middleware.ts` - Updated to properly read Supabase session cookies

### Three.js Architecture

**Current Issues:**

- AnimatedShapes component renders 3 large geometric objects (torus knot, icosahedron, box)
- PointerAttractor adds 2 more shapes (sphere, octahedron)
- Swirl component adds a spiral line
- Total: 6 distracting objects competing for attention

**Simplified Design:**

- Remove all geometric objects
- Keep only: Stars, Sparkles, and subtle gradient lighting
- Maintain scroll parallax and pointer interaction on particles only
- Reduce particle counts for better performance

## Components and Interfaces

### 1. Auth Callback Handler

**File:** `/app/auth/callback/route.ts`

```typescript
interface CallbackRequest {
  searchParams: {
    code?: string;
    error?: string;
    error_description?: string;
  };
}

interface CallbackResponse {
  success: boolean;
  redirect: string;
}
```

**Responsibilities:**

- Extract auth code from URL parameters
- Exchange code for session using Supabase
- Set session cookies
- Handle errors gracefully
- Redirect to appropriate destination

### 2. Updated Login Component

**Changes:**

- Update `emailRedirectTo` to point to `/auth/callback`
- Add better error handling
- Improve user feedback

### 3. Simplified Three.js Background

**Components to Keep:**

- `ScrollParallax` - Maintains camera movement on scroll
- `Stars` - Subtle star field
- `Sparkles` - Floating particles
- Ambient and point lights

**Components to Remove:**

- `AnimatedShapes` - All 3 geometric objects
- `PointerAttractor` - Both shapes
- `Swirl` - Spiral line

**New Component:**

- `SubtlePointerEffect` - Gentle particle response to mouse movement without visible objects

## Data Models

### Session Cookie Structure

```typescript
{
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
    // ... other user fields
  }
}
```

### Three.js Scene Configuration

```typescript
interface SceneConfig {
  stars: {
    count: number;
    radius: number;
    depth: number;
    factor: number;
  };
  sparkles: {
    count: number;
    scale: number;
    size: number;
    speed: number;
  };
  performance: {
    dpr: number;
    reducedMotion: boolean;
  };
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Auth callback establishes valid session

_For any_ valid authentication code from Supabase, processing the callback should result in a valid session cookie being set in the browser.

**Validates: Requirements 1.2, 1.4**

### Property 2: Session persistence across navigation

_For any_ authenticated user session, navigating between pages should preserve the authentication state without requiring re-authentication.

**Validates: Requirements 3.2, 3.3**

### Property 3: Three.js scene contains no geometric objects

_For any_ render of the Three.js background, the scene should contain only particle systems (stars and sparkles) and lighting, with zero mesh geometries visible.

**Validates: Requirements 2.1**

### Property 4: Performance maintains 60fps

_For any_ device rendering the Three.js scene, the frame rate should remain at or above 55fps during normal interaction.

**Validates: Requirements 2.6**

### Property 5: Reduced motion compliance

_For any_ user with reduced motion preferences enabled, all animations should be minimized or disabled according to the preference.

**Validates: Requirements 2.5**

## Error Handling

### Authentication Errors

1. **Invalid or expired code**
   - Display: "Authentication link expired. Please request a new one."
   - Action: Redirect to `/login`

2. **Network errors**
   - Display: "Connection error. Please try again."
   - Action: Remain on callback page with retry option

3. **Missing code parameter**
   - Display: "Invalid authentication link."
   - Action: Redirect to `/login`

### Three.js Errors

1. **WebGL not supported**
   - Fallback: Render static gradient background
   - No error message (graceful degradation)

2. **Performance issues**
   - Auto-reduce particle counts
   - Disable animations if FPS < 30

## Testing Strategy

### Unit Tests

1. **Auth Callback Handler**
   - Test successful code exchange
   - Test error handling for invalid codes
   - Test cookie setting
   - Test redirect logic

2. **Three.js Component**
   - Test component renders without geometric objects
   - Test reduced motion detection
   - Test mobile optimization

### Integration Tests

1. **End-to-End Auth Flow**
   - Test complete magic link flow from login to admin access
   - Test session persistence across page refreshes
   - Test middleware protection

2. **Visual Regression**
   - Capture screenshots of Three.js background
   - Verify no geometric objects visible
   - Verify particle effects render correctly

### Performance Tests

1. **Three.js Performance**
   - Measure FPS on various devices
   - Verify particle count optimization
   - Test memory usage

### Property-Based Tests

We will use **fast-check** (JavaScript/TypeScript property-based testing library) for property-based testing.

Each property-based test should run a minimum of 100 iterations to ensure thorough coverage.

Property-based tests will be tagged with comments referencing the design document properties:

- Format: `// Feature: auth-and-3d-fixes, Property {number}: {property_text}`

## Implementation Notes

### Supabase Cookie Configuration

The auth callback must use `createServerClient` with proper cookie handling:

```typescript
const supabase = createServerClient(url, key, {
  cookies: {
    get: (name) => cookies().get(name)?.value,
    set: (name, value, options) => cookies().set(name, value, options),
    remove: (name, options) => cookies().set(name, "", options),
  },
});
```

### Three.js Performance Optimization

- Use `useMemo` for static configurations
- Implement `useFrame` throttling on mobile
- Reduce particle counts based on device pixel ratio
- Disable shadows and complex materials

### Accessibility Considerations

- Respect `prefers-reduced-motion`
- Ensure background doesn't interfere with text readability
- Maintain sufficient contrast ratios
- Provide fallback for WebGL-unsupported browsers
