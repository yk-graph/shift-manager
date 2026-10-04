# Set up database

## Summary
Provision PostgreSQL and create the schema, migrations, and seed data for the app.

## Goal
A working database with the agreed schema and sample data so every feature can read/write real data.

## Dependencies
Blocked by #2

## Reference
- Database ER diagram: https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76
- Tables: users, branches, shifts, shift_changes, sessions
- Rules: CHECK (clock_out > clock_in), UNIQUE open shift per user, timezone America/Vancouver

## Check List
- [ ] Create hosted PostgreSQL and environment variables
- [ ] Create schema and migrations (users, branches, shifts, shift_changes, sessions)
- [ ] Create seed script (admin, employees, branches, sample shifts)
