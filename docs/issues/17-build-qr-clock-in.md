# Build QR clock-in (bonus)

## Summary
Build QR-based clock-in: My QR codes page, the QR route handler, and the scan result page.

## Goal
Employees can clock in/out by scanning a per-employee/per-branch QR, no login needed.

## Dependencies
Blocked by #6

## Reference
- E-*_05 My QR codes / E-*_06-07 Scan result: https://www.figma.com/design/rVQKkCx5JP3cP4m65J8RMR/ABC-Holding-%E2%80%93-Ember---Oak-Time-Clock?node-id=18-76
- Route: GET /api/qr/:employeeId/:branchId → clock in/out → redirect /scan

## Check List
- [ ] Create My QR codes page (/qr)
- [ ] Create QR route handler (/api/qr/[employeeId]/[branchId])
- [ ] Create scan result page (/scan)
