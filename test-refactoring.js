/**
 * Test de Refactorización - Verificar que BaseManager funciona correctamente
 * 
 * INSTRUCCIONES:
 * 1. Abre mehaquedadobien/index.html en tu navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este archivo completo
 * 4. Ejecuta: testRefactoring()
 */

(function() {
    'use strict';

    window.testRefactoring = async function() {
        console.clear();
        console.log('%c🧪 TEST DE REFACTORIZACIÓN', 'font-size: 20px; font-weight: bold; color: #667eea;');
        console.log('═'.repeat(80));

        const results = {
            passed: 0,
            failed: 0,
            tests: []
        };

        function test(name, fn) {
            try {
                fn();
                results.passed++;
                results.tests.push({ name, status: 'PASS' });
                console.log(`✅ PASS: ${name}`);
                return true;
            } catch (error) {
                results.failed++;
                results.tests.push({ name, status: 'FAIL', error: error.message });
                console.error(`❌ FAIL: ${name}`, error);
                return false;
            }
        }

        console.log('\n📦 SECCIÓN 1: Verificar Clases Base');
        console.log('─'.repeat(40));

        test('BaseManager existe', () => {
            if (typeof BaseManager === 'undefined') {
                throw new Error('BaseManager no está definido');
            }
        });

        test('ModalManager existe', () => {
            if (typeof ModalManager === 'undefined') {
                throw new Error('ModalManager no está definido');
            }
        });

        test('TimeUtils existe', () => {
            if (typeof TimeUtils === 'undefined') {
                throw new Error('TimeUtils no está definido');
            }
        });

        console.log('\n📦 SECCIÓN 2: Verificar Managers Refactorizados');
        console.log('─'.repeat(40));

        test('CategoryManager extiende BaseManager', () => {
            const cm = new CategoryManager();
            if (!(cm instanceof BaseManager)) {
                throw new Error('CategoryManager no extiende BaseManager');
            }
            if (typeof cm.load !== 'function') {
                throw new Error('CategoryManager no tiene método load()');
            }
            if (typeof cm.save !== 'function') {
                throw new Error('CategoryManager no tiene método save()');
            }
        });

        test('CollectionManager extiende BaseManager', () => {
            const cm = new CollectionManager();
            if (!(cm instanceof BaseManager)) {
                throw new Error('CollectionManager no extiende BaseManager');
            }
            if (typeof cm.load !== 'function') {
                throw new Error('CollectionManager no tiene método load()');
            }
        });

        test('ShoppingListManager extiende BaseManager', () => {
            const slm = new ShoppingListManager();
            if (!(slm instanceof BaseManager)) {
                throw new Error('ShoppingListManager no extiende BaseManager');
            }
            if (typeof slm.load !== 'function') {
                throw new Error('ShoppingListManager no tiene método load()');
            }
        });

        test('MenuManager extiende BaseManager', () => {
            const mm = new MenuManager();
            if (!(mm instanceof BaseManager)) {
                throw new Error('MenuManager no extiende BaseManager');
            }
            if (typeof mm.load !== 'function') {
                throw new Error('MenuManager no tiene método load()');
            }
        });

        console.log('\n📦 SECCIÓN 3: Verificar Funcionalidad de BaseManager');
        console.log('─'.repeat(40));

        test('BaseManager.load() funciona', () => {
            const bm = new BaseManager('test_key', []);
            const data = bm.load();
            if (!Array.isArray(data)) {
                throw new Error('load() no retorna un array');
            }
        });

        test('BaseManager.save() funciona', () => {
            const bm = new BaseManager('test_key_save', []);
            const testData = [{ id: 1, name: 'Test' }];
            const result = bm.save(testData);
            if (result !== true) {
                throw new Error('save() no retorna true');
            }
            
            // Verificar que se guardó
            const loaded = bm.load();
            if (loaded.length !== 1 || loaded[0].name !== 'Test') {
                throw new Error('Los datos no se guardaron correctamente');
            }
        });

        test('BaseManager.exists() funciona', () => {
            const bm = new BaseManager('test_key_exists', []);
            bm.save([{ test: true }]);
            if (!bm.exists()) {
                throw new Error('exists() no detecta datos guardados');
            }
        });

        test('BaseManager.clear() funciona', () => {
            const bm = new BaseManager('test_key_clear', []);
            bm.save([{ test: true }]);
            bm.clear();
            if (bm.exists()) {
                throw new Error('clear() no eliminó los datos');
            }
        });

        test('BaseManager.getSize() funciona', () => {
            const bm = new BaseManager('test_key_size', []);
            bm.save([{ test: 'data' }]);
            const size = bm.getSize();
            if (typeof size !== 'number' || size <= 0) {
                throw new Error('getSize() no retorna un número válido');
            }
        });

        console.log('\n📦 SECCIÓN 4: Verificar Compatibilidad con Datos Existentes');
        console.log('─'.repeat(40));

        test('CategoryManager carga datos existentes', () => {
            const cm = new CategoryManager();
            // Debería cargar sin errores
            if (!Array.isArray(cm.customCategories)) {
                throw new Error('customCategories no es un array');
            }
        });

        test('CollectionManager carga datos existentes', () => {
            const cm = new CollectionManager();
            if (!Array.isArray(cm.collections)) {
                throw new Error('collections no es un array');
            }
        });

        test('ShoppingListManager carga datos existentes', () => {
            const slm = new ShoppingListManager();
            if (!Array.isArray(slm.lists)) {
                throw new Error('lists no es un array');
            }
        });

        test('MenuManager carga datos existentes', () => {
            const mm = new MenuManager();
            if (!Array.isArray(mm.menus)) {
                throw new Error('menus no es un array');
            }
        });

        console.log('\n📦 SECCIÓN 5: Verificar TimeUtils');
        console.log('─'.repeat(40));

        test('TimeUtils.toMinutes() funciona', () => {
            const minutes = TimeUtils.toMinutes('2h 30min');
            if (minutes !== 150) {
                throw new Error(`Expected 150, got ${minutes}`);
            }
        });

        test('TimeUtils.fromMinutes() funciona', () => {
            const time = TimeUtils.fromMinutes(150);
            if (time !== '2h 30min') {
                throw new Error(`Expected "2h 30min", got "${time}"`);
            }
        });

        test('TimeUtils.formatTimeForDisplay() funciona', () => {
            const formatted = TimeUtils.formatTimeForDisplay('2h 30min');
            if (!formatted.includes('2') || !formatted.includes('30')) {
                throw new Error(`Formato incorrecto: ${formatted}`);
            }
        });

        test('TimeUtils.add() funciona', () => {
            const sum = TimeUtils.add('1h 30min', '2h 15min');
            const minutes = TimeUtils.toMinutes(sum);
            if (minutes !== 225) { // 90 + 135 = 225
                throw new Error(`Expected 225 minutes, got ${minutes}`);
            }
        });

        test('TimeUtils.compare() funciona', () => {
            const result = TimeUtils.compare('1h', '2h');
            if (result !== -1) {
                throw new Error(`Expected -1, got ${result}`);
            }
        });

        console.log('\n📦 SECCIÓN 6: Verificar ModalManager');
        console.log('─'.repeat(40));

        test('ModalManager se puede instanciar', () => {
            const mm = new ModalManager();
            if (typeof mm.open !== 'function') {
                throw new Error('ModalManager no tiene método open()');
            }
            if (typeof mm.close !== 'function') {
                throw new Error('ModalManager no tiene método close()');
            }
        });

        test('ModalManager.isOpen() funciona', () => {
            const mm = new ModalManager();
            if (mm.isOpen('test-modal')) {
                throw new Error('Modal no debería estar abierto');
            }
        });

        test('ModalManager.getTopModal() funciona', () => {
            const mm = new ModalManager();
            const top = mm.getTopModal();
            if (top !== null) {
                throw new Error('No debería haber modal superior');
            }
        });

        // Limpiar datos de test
        console.log('\n🧹 Limpiando datos de test...');
        localStorage.removeItem('test_key');
        localStorage.removeItem('test_key_save');
        localStorage.removeItem('test_key_exists');
        localStorage.removeItem('test_key_clear');
        localStorage.removeItem('test_key_size');

        // Resumen
        console.log('\n' + '═'.repeat(80));
        console.log('%c📊 RESUMEN DE TESTS', 'font-size: 18px; font-weight: bold; color: #28a745;');
        console.log('═'.repeat(80));
        console.log(`✅ Tests pasados: ${results.passed}`);
        console.log(`❌ Tests fallidos: ${results.failed}`);
        console.log(`📊 Total: ${results.tests.length}`);
        console.log(`🎯 Tasa de éxito: ${((results.passed / results.tests.length) * 100).toFixed(1)}%`);

        if (results.failed > 0) {
            console.log('\n❌ TESTS FALLIDOS:');
            results.tests.filter(t => t.status === 'FAIL').forEach(t => {
                console.log(`   - ${t.name}: ${t.error}`);
            });
        }

        console.log('\n' + '═'.repeat(80));
        
        if (results.failed === 0) {
            console.log('%c🎉 ¡TODOS LOS TESTS PASARON!', 'font-size: 16px; font-weight: bold; color: #28a745;');
            console.log('%c✅ La refactorización funciona correctamente', 'font-size: 14px; color: #28a745;');
        } else {
            console.log('%c⚠️  ALGUNOS TESTS FALLARON', 'font-size: 16px; font-weight: bold; color: #dc3545;');
            console.log('%cRevisa los errores arriba', 'font-size: 14px; color: #dc3545;');
        }

        return results;
    };

    console.log('%c🧪 Test de Refactorización Cargado', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('═'.repeat(80));
    console.log('💡 Ejecuta: testRefactoring()');
    console.log('═'.repeat(80));

})();
