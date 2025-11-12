# Debug Logger Usage Guide

## Quick Start

The application now includes a configurable debug logging system that allows you to control the verbosity of console output.

## Setting Debug Level

### In Browser Console
```javascript
// Production mode - no debug logs
localStorage.setItem('DEBUG_LEVEL', '0');

// Development mode - info, warnings, and errors (default)
localStorage.setItem('DEBUG_LEVEL', '3');

// Verbose mode - all logs including detailed parsing
localStorage.setItem('DEBUG_LEVEL', '4');

// Reload the page for changes to take effect
location.reload();
```

### Using the API
```javascript
// Set level programmatically
DebugLogger.level = DebugLogger.LEVELS.NONE;      // 0
DebugLogger.level = DebugLogger.LEVELS.ERROR;     // 1
DebugLogger.level = DebugLogger.LEVELS.WARN;      // 2
DebugLogger.level = DebugLogger.LEVELS.INFO;      // 3 (default)
DebugLogger.level = DebugLogger.LEVELS.VERBOSE;   // 4

// Check current level
console.log('Current debug level:', DebugLogger.level);
```

## Debug Levels Explained

### Level 0: NONE (Production)
**Use when:** Deploying to production
**Output:** No debug logs at all
**Performance:** Zero overhead

```javascript
DebugLogger.level = 0;
// No logs will appear
```

### Level 1: ERROR
**Use when:** You only want to see critical errors
**Output:** Only error messages
**Performance:** Minimal overhead

```javascript
DebugLogger.level = 1;
DebugLogger.error('Module', 'Critical error occurred');
// Output: [Module] Critical error occurred
```

### Level 2: WARN
**Use when:** You want to see potential issues
**Output:** Warnings and errors
**Performance:** Low overhead

```javascript
DebugLogger.level = 2;
DebugLogger.warn('Parse', 'Ingredient ID not found:', id);
// Output: [Parse] Ingredient ID not found: abc-123
```

### Level 3: INFO (Default)
**Use when:** Normal development
**Output:** Info messages, warnings, and errors
**Performance:** Moderate overhead

```javascript
DebugLogger.level = 3;
DebugLogger.info('Parse', 'Successfully parsed recipe:', data);
// Output: [Parse] Successfully parsed recipe: {name: "Paella", ...}
```

### Level 4: VERBOSE
**Use when:** Debugging complex issues
**Output:** All logs including detailed parsing steps
**Performance:** Higher overhead (not recommended for production)

```javascript
DebugLogger.level = 4;
DebugLogger.verbose('Parse', 'Processing sequence', seq.step);
// Output: [Parse] Processing sequence 1
```

## Usage Examples

### For Developers Adding New Features

```javascript
// Use appropriate log levels
function importRecipe(xmlData) {
    DebugLogger.info('Import', 'Starting recipe import');
    
    try {
        const recipe = parseXML(xmlData);
        DebugLogger.verbose('Import', 'Parsed recipe:', recipe);
        
        if (!recipe.name) {
            DebugLogger.warn('Import', 'Recipe has no name, using default');
        }
        
        return recipe;
    } catch (error) {
        DebugLogger.error('Import', 'Failed to import recipe:', error);
        throw error;
    }
}
```

### For QA Testing

```javascript
// Enable verbose logging to see all parsing details
localStorage.setItem('DEBUG_LEVEL', '4');
location.reload();

// Import a QR code and check console for detailed logs
// You'll see:
// [Parse] Parsed sequences: 3
// [Parse] ID mapping size: 5
// [Parse] Processing sequence 1 with 2 ingredients
// [Parse] Successfully parsed recipe: {...}
```

### For Production Deployment

```javascript
// Disable all debug logs before deploying
localStorage.setItem('DEBUG_LEVEL', '0');

// Or set in your build script
if (process.env.NODE_ENV === 'production') {
    DebugLogger.level = DebugLogger.LEVELS.NONE;
}
```

## Best Practices

### 1. Choose the Right Level
- **ERROR:** Critical failures that break functionality
- **WARN:** Potential issues that don't break functionality
- **INFO:** Important milestones and successful operations
- **VERBOSE:** Detailed step-by-step information

### 2. Use Consistent Prefixes
```javascript
// Good - consistent prefixes by module
DebugLogger.info('Parse', 'Parsing XML...');
DebugLogger.info('Import', 'Importing recipe...');
DebugLogger.info('Export', 'Exporting to PDF...');

// Bad - inconsistent prefixes
DebugLogger.info('xml', 'Parsing...');
DebugLogger.info('IMPORT', 'Importing...');
DebugLogger.info('pdf-export', 'Exporting...');
```

### 3. Include Relevant Context
```javascript
// Good - includes context
DebugLogger.warn('Parse', `Ingredient ID not found: ${id}`);

// Bad - missing context
DebugLogger.warn('Parse', 'Not found');
```

### 4. Don't Log Sensitive Data
```javascript
// Good - log structure, not content
DebugLogger.info('Auth', 'User logged in:', { userId: user.id });

// Bad - logging sensitive data
DebugLogger.info('Auth', 'User logged in:', { password: user.password });
```

## Troubleshooting

### Logs Not Appearing?
1. Check your debug level: `console.log(DebugLogger.level)`
2. Make sure you're using the right method for your level
3. Reload the page after changing the level

### Too Many Logs?
1. Lower the debug level: `DebugLogger.level = 2` (warnings only)
2. Or disable completely: `DebugLogger.level = 0`

### Need More Details?
1. Increase the debug level: `DebugLogger.level = 4` (verbose)
2. Check the browser console for all output

## Performance Impact

| Level | Overhead | Use Case |
|-------|----------|----------|
| 0 (NONE) | None | Production |
| 1 (ERROR) | Minimal | Production with error tracking |
| 2 (WARN) | Low | Staging/QA |
| 3 (INFO) | Moderate | Development |
| 4 (VERBOSE) | Higher | Debugging specific issues |

## Migration from console.log

### Before
```javascript
console.log('[Parse] Parsed sequences:', sequences.length);
console.log('[Parse] ID mapping:', idMapping);
```

### After
```javascript
DebugLogger.info('Parse', 'Parsed sequences:', sequences.length);
DebugLogger.verbose('Parse', 'ID mapping:', idMapping);
```

## Future Enhancements

Potential improvements to consider:
- [ ] Add timestamp to logs
- [ ] Add log filtering by prefix
- [ ] Add log export functionality
- [ ] Add remote logging for production errors
- [ ] Add performance timing utilities

---

**Remember:** Always set `DEBUG_LEVEL` to `0` in production to avoid performance overhead and console clutter!
