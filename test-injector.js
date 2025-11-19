/**
 * Test Injector - Script para inyectar en la consola de mehaquedadobien
 * 
 * INSTRUCCIONES:
 * 1. Abre mehaquedadobien en tu navegador
 * 2. Abre la consola del navegador (F12)
 * 3. Copia y pega todo este archivo en la consola
 * 4. Ejecuta: startUITest()
 */

(function() {
    'use strict';

    // Estado del test
    const testState = {
        running: false,
        buttonsTested: 0,
        functionsCalled: new Set(),
        modalsOpened: 0,
        errors: 0,
        elementsFound: new Set(),
        elementsNotFound: new Set()
    };

    // Interceptar console.log para detectar funciones
    const originalLog = console.log;
    const originalError = console.error;

    console.log = function(...args) {
        const message = args.join(' ');
        // Detectar llamadas a funciones en logs con formato [FunctionName]
        const funcMatch = message.match(/\[([^\]]+)\]/);
        if (funcMatch) {
            testState.functionsCalled.add(funcMatch[1]);
        }
        originalLog.apply(console, args);
    };

    console.error = function(...args) {
        testState.errors++;
        originalError.apply(console, args);
    };

    // Función para esperar
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Función para hacer click seguro
    async function safeClick(selector, description) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ Click: ${description} (${selector})`);
            testState.elementsFound.add(selector);
            element.click();
            testState.buttonsTested++;
            
            // Detectar modales
            if (selector.includes('modal') || description.toLowerCase().includes('modal')) {
                testState.modalsOpened++;
            }
            
            await wait(300);
            return true;
        } else {
            console.warn(`⚠️  Elemento no encontrado: ${selector}`);
            testState.elementsNotFound.add(selector);
            return false;
        }
    }

    // Función para input seguro
    async function safeInput(selector, value, description) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ Input: ${description} = "${value}"`);
            testState.elementsFound.add(selector);
            element.value = value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            await wait(200);
            return true;
        } else {
            console.warn(`⚠️  Input no encontrado: ${selector}`);
            testState.elementsNotFound.add(selector);
            return false;
        }
    }

    // Test principal
    window.startUITest = async function() {
        console.clear();
        console.log('%c🧪 INICIANDO TEST DE COBERTURA UI', 'font-size: 20px; font-weight: bold; color: #667eea;');
        console.log('═'.repeat(80));
        
        testState.running = true;
        testState.buttonsTested = 0;
        testState.functionsCalled.clear();
        testState.modalsOpened = 0;
        testState.errors = 0;
        testState.elementsFound.clear();
        testState.elementsNotFound.clear();

        try {
            // 1. Menú Principal
            console.log('\n📦 SECCIÓN: Menú Principal');
            console.log('─'.repeat(40));
            await safeClick('#menu-btn', 'Abrir menú hamburguesa');
            await wait(500);
            await safeClick('#new-recipe-btn', 'Nueva receta desde menú');
            await wait(500);

            // 2. Formulario de Receta
            console.log('\n📦 SECCIÓN: Formulario de Receta');
            console.log('─'.repeat(40));
            await safeInput('#recipe-name', 'Receta de Test', 'Nombre de receta');
            await safeClick('#recipe-category-chip', 'Abrir selector de categoría');
            await wait(500);
            
            // Intentar seleccionar una categoría
            const categoryChip = document.querySelector('.category-chip');
            if (categoryChip) {
                categoryChip.click();
                console.log('✅ Categoría seleccionada');
                await wait(300);
            }

            // 3. Ingredientes
            console.log('\n📦 SECCIÓN: Ingredientes');
            console.log('─'.repeat(40));
            await safeInput('#ingredient-name', 'Tomate', 'Nombre ingrediente');
            await safeInput('#ingredient-quantity', '2', 'Cantidad');
            await safeClick('#add-ingredient-btn', 'Añadir ingrediente');
            await wait(500);

            // 4. Electrodomésticos
            console.log('\n📦 SECCIÓN: Electrodomésticos');
            console.log('─'.repeat(40));
            await safeClick('#appliances-section-title', 'Expandir electrodomésticos');
            await wait(300);
            const applianceChip = document.querySelector('.kitchen-appliance-chip');
            if (applianceChip) {
                applianceChip.click();
                console.log('✅ Electrodoméstico seleccionado');
                await wait(300);
            }

            // 5. Secuencias
            console.log('\n📦 SECCIÓN: Secuencias');
            console.log('─'.repeat(40));
            await safeClick('#sequences-section-title', 'Expandir secuencias');
            await wait(300);
            await safeInput('#sequence-description', 'Picar el tomate', 'Descripción secuencia');
            await safeClick('#add-sequence-btn', 'Añadir secuencia');
            await wait(500);

            // 6. Guardar receta
            console.log('\n📦 SECCIÓN: Guardar Receta');
            console.log('─'.repeat(40));
            await safeClick('#save-recipe-btn', 'Guardar receta');
            await wait(1000);

            // 7. Volver a home
            console.log('\n📦 SECCIÓN: Navegación');
            console.log('─'.repeat(40));
            await safeClick('#home-link', 'Volver a home');
            await wait(500);

            // 8. Filtros
            console.log('\n📦 SECCIÓN: Filtros');
            console.log('─'.repeat(40));
            await safeClick('#toggle-filters-btn', 'Toggle filtros');
            await wait(300);
            
            const filterChips = document.querySelectorAll('.filter-chip');
            if (filterChips.length > 0) {
                filterChips[0].click();
                console.log('✅ Filtro aplicado');
                await wait(500);
            }

            // 9. Búsqueda
            console.log('\n📦 SECCIÓN: Búsqueda');
            console.log('─'.repeat(40));
            await safeInput('#recipe-search-input', 'test', 'Buscar receta');
            await wait(500);
            await safeClick('#clear-search-btn', 'Limpiar búsqueda');
            await wait(300);

            // 10. Vistas
            console.log('\n📦 SECCIÓN: Cambio de Vista');
            console.log('─'.repeat(40));
            await safeClick('#view-list-btn', 'Vista lista');
            await wait(500);
            await safeClick('#view-grid-btn', 'Vista grid');
            await wait(500);

            // 11. Configuración
            console.log('\n📦 SECCIÓN: Configuración');
            console.log('─'.repeat(40));
            await safeClick('#menu-btn', 'Abrir menú');
            await wait(300);
            await safeClick('#settings-btn', 'Abrir configuración');
            await wait(500);
            await safeClick('#manage-categories-btn', 'Gestionar categorías');
            await wait(500);
            await safeClick('#close-category-modal', 'Cerrar modal categorías');
            await wait(300);
            await safeClick('#close-settings-modal', 'Cerrar configuración');
            await wait(300);

            // 12. Listas de Compra
            console.log('\n📦 SECCIÓN: Listas de Compra');
            console.log('─'.repeat(40));
            await safeClick('#menu-btn', 'Abrir menú');
            await wait(300);
            await safeClick('#shopping-lists-btn', 'Abrir listas de compra');
            await wait(500);
            await safeClick('#close-shopping-lists-btn', 'Cerrar listas');
            await wait(300);

            // 13. Menús
            console.log('\n📦 SECCIÓN: Menús');
            console.log('─'.repeat(40));
            await safeClick('#menu-btn', 'Abrir menú');
            await wait(300);
            await safeClick('#menus-btn', 'Abrir menús');
            await wait(500);
            await safeClick('#close-menus-btn', 'Cerrar menús');
            await wait(300);

            // 14. Ayuda
            console.log('\n📦 SECCIÓN: Ayuda');
            console.log('─'.repeat(40));
            await safeClick('#menu-btn', 'Abrir menú');
            await wait(300);
            await safeClick('#help-btn', 'Abrir ayuda');
            await wait(500);
            await safeClick('#close-help-modal', 'Cerrar ayuda');
            await wait(300);

            // 15. Probar receta existente (si hay)
            console.log('\n📦 SECCIÓN: Interacción con Recetas');
            console.log('─'.repeat(40));
            const recipeCard = document.querySelector('.recipe-card');
            if (recipeCard) {
                recipeCard.click();
                console.log('✅ Receta abierta');
                await wait(1000);
                
                await safeClick('#back-to-list-btn', 'Volver a lista');
                await wait(500);
            }

        } catch (error) {
            console.error('❌ Error durante el test:', error);
            testState.errors++;
        }

        // Resumen final
        console.log('\n' + '═'.repeat(80));
        console.log('%c✅ TEST COMPLETADO', 'font-size: 18px; font-weight: bold; color: #28a745;');
        console.log('═'.repeat(80));
        
        console.log('\n📊 ESTADÍSTICAS:');
        console.log(`   🔘 Botones probados: ${testState.buttonsTested}`);
        console.log(`   ⚙️  Funciones llamadas: ${testState.functionsCalled.size}`);
        console.log(`   🪟 Modales abiertos: ${testState.modalsOpened}`);
        console.log(`   ❌ Errores: ${testState.errors}`);
        console.log(`   ✅ Elementos encontrados: ${testState.elementsFound.size}`);
        console.log(`   ⚠️  Elementos no encontrados: ${testState.elementsNotFound.size}`);

        if (testState.functionsCalled.size > 0) {
            console.log('\n🔧 FUNCIONES DETECTADAS:');
            Array.from(testState.functionsCalled).sort().forEach(func => {
                console.log(`   - ${func}`);
            });
        }

        if (testState.elementsNotFound.size > 0) {
            console.log('\n⚠️  ELEMENTOS NO ENCONTRADOS:');
            Array.from(testState.elementsNotFound).forEach(selector => {
                console.log(`   - ${selector}`);
            });
        }

        // Generar reporte JSON
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                buttonsTested: testState.buttonsTested,
                functionsCalled: testState.functionsCalled.size,
                modalsOpened: testState.modalsOpened,
                errors: testState.errors,
                elementsFound: testState.elementsFound.size,
                elementsNotFound: testState.elementsNotFound.size
            },
            functions: Array.from(testState.functionsCalled).sort(),
            elementsFound: Array.from(testState.elementsFound).sort(),
            elementsNotFound: Array.from(testState.elementsNotFound).sort()
        };

        console.log('\n📄 REPORTE JSON:');
        console.log(JSON.stringify(report, null, 2));

        // Guardar en variable global para exportar
        window.testReport = report;
        console.log('\n💾 Reporte guardado en: window.testReport');
        console.log('💡 Para exportar: copy(window.testReport)');

        testState.running = false;
    };

    // Función para exportar reporte
    window.exportTestReport = function() {
        if (window.testReport) {
            const blob = new Blob([JSON.stringify(window.testReport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ui-test-report-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            console.log('✅ Reporte exportado');
        } else {
            console.warn('⚠️  No hay reporte disponible. Ejecuta startUITest() primero.');
        }
    };

    console.log('%c🧪 Test Injector Cargado', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('═'.repeat(80));
    console.log('📝 Comandos disponibles:');
    console.log('   • startUITest()       - Iniciar test completo');
    console.log('   • exportTestReport()  - Exportar reporte JSON');
    console.log('   • copy(window.testReport) - Copiar reporte al portapapeles');
    console.log('═'.repeat(80));
    console.log('💡 Ejecuta: startUITest()');

})();
