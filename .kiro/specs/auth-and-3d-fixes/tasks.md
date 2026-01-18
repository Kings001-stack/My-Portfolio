# Implementation Plan

- [x] 1. Fix Supabase Magic Link Authentication


  - Create auth callback route to handle magic link redirects
  - Update login page to use correct callback URL
  - Update middleware to properly validate sessions
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 3.4_



- [ ] 1.1 Create auth callback API route
  - Create `/app/auth/callback/route.ts`
  - Implement code exchange with Supabase
  - Set session cookies properly
  - Handle error cases and redirects


  - _Requirements: 1.2, 1.3, 1.4, 3.1_

- [ ] 1.2 Update login page redirect URL
  - Change `emailRedirectTo` to point to `/auth/callback`


  - Improve error messaging
  - Add loading states
  - _Requirements: 1.1, 1.5_

- [ ] 1.3 Update middleware session validation
  - Fix cookie reading in middleware
  - Properly validate Supabase session
  - Handle expired sessions gracefully
  - _Requirements: 1.4, 3.2, 3.3, 3.4_



- [ ]\* 1.4 Test authentication flow end-to-end
  - Test magic link email sending
  - Test callback processing
  - Test session persistence
  - Test middleware protection
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.2, 3.3_



- [ ] 2. Simplify Three.js Background Animation
  - Remove all geometric objects from the scene
  - Keep only stars and sparkles
  - Optimize performance


  - Maintain accessibility features
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 2.1 Remove geometric objects from ThreeBackground


  - Delete `AnimatedShapes` component (torus knot, icosahedron, box)
  - Delete `PointerAttractor` component (sphere, octahedron)
  - Delete `Swirl` component (spiral line)
  - Remove unused imports (Trail, MeshDistortMaterial, Line)


  - _Requirements: 2.1_

- [ ] 2.2 Optimize particle effects
  - Adjust star and sparkle counts for better performance
  - Fine-tune colors and opacity for elegance
  - Optimize for mobile devices
  - _Requirements: 2.4, 2.6_

- [x] 2.3 Enhance subtle pointer interaction


  - Add gentle camera movement based on pointer position
  - Apply subtle particle drift toward pointer


  - Keep effects minimal and non-distracting
  - _Requirements: 2.3_

- [ ] 2.4 Verify accessibility and performance
  - Test reduced motion preferences


  - Verify 60fps on various devices
  - Test mobile performance
  - _Requirements: 2.5, 2.6_

- [ ]\* 2.5 Visual regression testing
  - Capture screenshots of new background
  - Verify no geometric objects visible
  - Confirm clean, elegant appearance
  - _Requirements: 2.1_




- [ ] 3. Final Integration and Testing
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3.1 Test complete authentication flow
  - Request magic link
  - Click link and verify redirect to admin
  - Verify session persists on refresh
  - Test logout functionality
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.2, 3.3_

- [ ] 3.2 Test Three.js background across pages
  - Verify background renders on all public pages
  - Confirm no background on resume, login, admin pages
  - Test scroll parallax effects
  - _Requirements: 2.1, 2.2_

- [ ]\* 3.3 Performance benchmarking
  - Measure FPS on desktop and mobile
  - Verify memory usage is acceptable
  - Test on low-end devices
  - _Requirements: 2.6_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
