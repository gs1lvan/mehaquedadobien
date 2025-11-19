/**
 * Script para analizar todas las funciones JavaScript en el proyecto
 * Extrae funciones definidas y genera un reporte de uso
 */

const fs = require('fs');
const path = require('path');

class FunctionAnalyzer {
    constructor() {
        this.definedFunctions = new Map(); // nombre -> { tipo, linea, archivo }
        this.usedFunctions = new Set();
        this.eventListeners = new Map(); // elemento -> funciones
    }

    /**
     * Analizar archivo JavaScript
     */
    analyzeFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const fileName = path.basename(filePath);

        console.log(`\n📄 Analizando: ${fileName}`);

        // Buscar definiciones de funciones
        lines.forEach((line, index) => {
            const lineNum = index + 1;

            // Funciones de clase: methodName() {
            const classMethodMatch = line.match(/^\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*{/);
            if (classMethodMatch) {
                const funcName = classMethodMatch[1];
                if (!['if', 'for', 'while', 'switch', 'catch'].includes(funcName)) {
                    this.definedFunctions.set(funcName, {
                        type: 'class-method',
                        line: lineNum,
                        file: fileName
                    });
                }
            }

            // Funciones tradicionales: function name() {
            const funcMatch = line.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
            if (funcMatch) {
                const funcName = funcMatch[1];
                this.definedFunctions.set(funcName, {
                    type: 'function',
                    line: lineNum,
                    file: fileName
                });
            }

            // Funciones flecha asignadas: const name = () => {
            const arrowMatch = line.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/);
            if (arrowMatch) {
                const funcName = arrowMatch[1];
                this.definedFunctions.set(funcName, {
                    type: 'arrow-function',
                    line: lineNum,
                    file: fileName
                });
            }

            // Event listeners: addEventListener('click', () => this.functionName())
            const eventListenerMatch = line.match(/addEventListener\s*\(\s*['"]([^'"]+)['"]\s*,\s*(?:\([^)]*\)\s*=>)?\s*(?:this\.)?([a-zA-Z_$][a-zA-Z0-9_$]*)/);
            if (eventListenerMatch) {
                const eventType = eventListenerMatch[1];
                const funcName = eventListenerMatch[2];
                if (!this.eventListeners.has(eventType)) {
                    this.eventListeners.set(eventType, new Set());
                }
                this.eventListeners.get(eventType).add(funcName);
                this.usedFunctions.add(funcName);
            }

            // Llamadas a funciones: this.functionName( o functionName(
            const callMatches = line.matchAll(/(?:this\.)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g);
            for (const match of callMatches) {
                const funcName = match[1];
                // Excluir palabras clave y constructores comunes
                if (!['if', 'for', 'while', 'switch', 'catch', 'console', 'parseInt', 'parseFloat', 'Date', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean'].includes(funcName)) {
                    this.usedFunctions.add(funcName);
                }
            }
        });
    }

    /**
     * Generar reporte
     */
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 REPORTE DE ANÁLISIS DE FUNCIONES');
        console.log('='.repeat(80));

        // Funciones definidas
        console.log(`\n✅ Total de funciones definidas: ${this.definedFunctions.size}`);
        
        const byType = {};
        this.definedFunctions.forEach((info, name) => {
            byType[info.type] = (byType[info.type] || 0) + 1;
        });
        
        console.log('\nPor tipo:');
        Object.entries(byType).forEach(([type, count]) => {
            console.log(`  - ${type}: ${count}`);
        });

        // Funciones usadas
        console.log(`\n✅ Total de funciones usadas: ${this.usedFunctions.size}`);

        // Funciones NO usadas
        const unusedFunctions = [];
        this.definedFunctions.forEach((info, name) => {
            if (!this.usedFunctions.has(name)) {
                unusedFunctions.push({ name, ...info });
            }
        });

        console.log(`\n⚠️  Funciones potencialmente NO usadas: ${unusedFunctions.length}`);
        if (unusedFunctions.length > 0) {
            console.log('\nListado:');
            unusedFunctions
                .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
                .forEach(func => {
                    console.log(`  - ${func.name} (${func.type}) en ${func.file}:${func.line}`);
                });
        }

        // Event listeners
        console.log(`\n🎯 Event Listeners encontrados: ${this.eventListeners.size} tipos`);
        this.eventListeners.forEach((funcs, event) => {
            console.log(`  - ${event}: ${funcs.size} funciones`);
        });

        // Guardar reporte en archivo
        this.saveReport(unusedFunctions);
    }

    /**
     * Guardar reporte en archivo
     */
    saveReport(unusedFunctions) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalDefined: this.definedFunctions.size,
                totalUsed: this.usedFunctions.size,
                totalUnused: unusedFunctions.length
            },
            definedFunctions: Array.from(this.definedFunctions.entries()).map(([name, info]) => ({
                name,
                ...info,
                used: this.usedFunctions.has(name)
            })),
            unusedFunctions: unusedFunctions,
            eventListeners: Object.fromEntries(
                Array.from(this.eventListeners.entries()).map(([event, funcs]) => [
                    event,
                    Array.from(funcs)
                ])
            )
        };

        fs.writeFileSync(
            'function-analysis-report.json',
            JSON.stringify(report, null, 2)
        );
        console.log('\n💾 Reporte guardado en: function-analysis-report.json');
    }
}

// Ejecutar análisis
const analyzer = new FunctionAnalyzer();

// Analizar archivos JavaScript
const jsFiles = [
    'mehaquedadobien/script.js',
    'mehaquedadobien/models.js',
    'mehaquedadobien/menu-manager.js',
    'mehaquedadobien/categories.js'
];

jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        analyzer.analyzeFile(file);
    } else {
        console.log(`⚠️  Archivo no encontrado: ${file}`);
    }
});

analyzer.generateReport();
