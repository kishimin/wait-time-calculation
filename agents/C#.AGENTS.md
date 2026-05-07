# C# Code Review Perspectives

## 1. Readability

Code should be easy to understand without additional explanation.

- Use meaningful names (e.g., `eventService`, not `es`)
- Keep methods short and focused
- Avoid deep nesting (prefer early return)
- Remove unnecessary comments (code should explain itself)

---

## 2. Responsibility & Separation

Each class and method should have a single responsibility.

- Controllers: handle HTTP only (no business logic)
- Services: contain business logic
- Repositories: handle data access
- Avoid fat controllers and god classes

---

## 3. Consistency

Follow consistent patterns across the codebase.

- Naming conventions (PascalCase, camelCase)
- Error handling style (exception vs result)
- Response format consistency
- Async usage (`async/await` consistently applied)

---

## 4. Error Handling

Errors should be predictable and controlled.

- Do not expose internal exceptions directly
- Use a unified error response format
- Distinguish:
  - Validation errors (400 / 422)
  - Authorization errors (403)
  - Unexpected errors (500)

---

## 5. Validation

Validate inputs at the boundary.

- Use DTOs instead of domain models directly
- Validate required fields and constraints
- Do not trust client input

---

## 6. Null Safety

Prevent runtime errors.

- Check for null (`ArgumentNullException`)
- Use nullable reference types
- Avoid excessive use of null-forgiving operator (`!`)

---

## 7. Dependency Management

Dependencies should be explicit and injectable.

- Use Dependency Injection
- Depend on interfaces, not concrete classes
- Avoid static or global dependencies

---

## 8. Testability

Code should be easy to test.

- Avoid tightly coupled code
- Separate side effects (DB, external APIs)
- Make methods deterministic where possible

---

## 9. Performance Awareness

Avoid obvious inefficiencies.

- Prevent N+1 queries
- Avoid unnecessary allocations
- Use async for I/O-bound operations

---

## 10. Security

Never trust external input.

- Do not accept sensitive data from clients (e.g., userId)
- Prevent injection attacks (SQL, etc.)
- Use authentication context (e.g., JWT claims)

---

## Summary

Readable, decoupled, consistent, and safe code is good C# code.