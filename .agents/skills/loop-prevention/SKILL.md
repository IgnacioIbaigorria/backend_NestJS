---
name: loop-prevention
description: Guidelines to prevent infinite tool-calling loops, failed tool retries, and tool discovery halts.
---

# Tool Execution and Anti-Loop Guidelines

Whenever attempting to search for or invoke a tool:

1. **Max 2 Retries Rule**:
   - Never call a tool search or the same tool more than 2 consecutive times.
   - If a tool search does not return an exact match on the first attempt, do NOT query tool-search again with slightly different keywords.

2. **Native Fallback**:
   - If a dedicated tool or MCP server is unavailable or fails, immediately fall back to standard terminal commands (`bash`, `powershell`, `npm`, `git`, `grep`).
   - If you need file contents and file-reading tools fail, use shell utilities (`cat`, `type`, `Get-Content`).

3. **Fail-Fast & Ask**:
   - If you are unable to proceed after one fallback attempt, stop immediately, report the exact roadblock to the user, and ask for input rather than retrying.
