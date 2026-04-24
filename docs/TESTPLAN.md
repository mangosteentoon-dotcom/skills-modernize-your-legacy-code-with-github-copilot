# COBOL Account Management Test Plan

This test plan documents the current business logic and implementation of the COBOL account management application. It is designed to validate behavior with business stakeholders and serve as the basis for later unit and integration tests in a Node.js app.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-01 | View current balance | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `1` | Current balance displayed as `001000.00` | | | |
| TC-02 | Credit account increases balance | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `2`
3. Enter credit amount `100` | New balance displayed as `001100.00` | | | |
| TC-03 | Debit account decreases balance when funds are sufficient | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `3`
3. Enter debit amount `200` | New balance displayed as `000800.00` | | | |
| TC-04 | Debit account rejects insufficient funds | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `3`
3. Enter debit amount `1500` | Display message `Insufficient funds for this debit.` and balance remains `001000.00` | | | |
| TC-05 | Balance read after credit update | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `2`
3. Enter credit amount `50`
4. Select option `1` | Balance displayed as `001050.00` | | | |
| TC-06 | Balance read after debit update | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `3`
3. Enter debit amount `150`
4. Select option `1` | Balance displayed as `000850.00` | | | |
| TC-07 | Invalid menu selection handling | Application started | 1. Start the app
2. Enter option `9` | Display message `Invalid choice, please select 1-4.` and prompt user again | | | |
| TC-08 | Exit application | Application started | 1. Start the app
2. Select option `4` | Display `Exiting the program. Goodbye!` and terminate | | | |
| TC-09 | Data layer read/write behavior | Application started with initial balance 1000.00 | 1. Start the app
2. Select option `2`
3. Enter credit amount `500`
4. Select option `1` | Balance displayed as `001500.00` showing `DataProgram` read/write updates persisted during session | | | |
| TC-10 | No external persistence is assumed | Application started | 1. Start app
2. Perform credit/debit operations
3. Restart app | Balance resets to `001000.00` on restart | | | |
