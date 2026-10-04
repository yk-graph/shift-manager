# Build employee timesheet (/timesheet)

## Summary
Build the employee timesheet page with a week switcher, weekly totals, and admin-change notes.

## Goal
Employees can review their hours per week, including any admin corrections.

## Dependencies
Blocked by #5

## Reference
- E-*_04 Timesheet: https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76
- Weekly total SQL: SUM(clock_out - clock_in) GROUP BY date_trunc('week', ...), weeks start Monday

## Check List
- [ ] Create UI with week switcher
- [ ] Calculate weekly totals in SQL
- [ ] Show "Changed by admin" notes
