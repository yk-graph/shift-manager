# Build auth function

## Summary
Implement authentication: password hashing, cookie sessions, login/logout, and route protection by role.

## Goal
Users log in securely and are routed by role (employee vs admin); protected routes reject unauthorized access.

## Dependencies
Blocked by #3, #4

## Reference
- User flows (login): https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76
- lib/auth.ts (cookie session, password hashing, requireRole), proxy.ts (Next.js 16 middleware)

## Check List
- [ ] Create password hashing and cookie session (lib/auth.ts)
- [ ] Create login UI (/login)
- [ ] Create login / logout actions and redirect by role
- [ ] Protect routes with proxy.ts and requireRole
