# Build clock logic

## Summary

Implement clock-in / clock-out logic with all business rules in lib/clock.ts.

## Goal

Clock rules are enforced in one place (used by buttons AND the QR route), with tests.

## Dependencies

Blocked by #3

## Reference

- User flows (clock rules): https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76
- Rules: before 8 AM / after 5 PM blocked, no double clock-in, America/Vancouver timezone

## Check List

- [ ] Create clockIn / clockOut with all clock rules (lib/clock.ts)
- [ ] Add tests for clock rules (8 AM, 5 PM, double clock-in)
