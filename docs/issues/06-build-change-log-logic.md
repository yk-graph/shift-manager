# Build change log logic

## Summary
Implement updateShift so every admin edit is recorded in the shift_changes table.

## Goal
All time changes are auditable: who changed what, when, and why.

## Dependencies
Blocked by #3

## Reference
- shift_changes table: https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76

## Check List
- [ ] Create updateShift function that writes to shift_changes
