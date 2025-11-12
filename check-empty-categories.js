// Script de diagnóstico para verificar categorías vacías
// Ejecutar en la consola del navegador cuando la app esté cargada

function checkEmptyCategories() {
    console.log('=== DIAGNÓSTICO DE CATEGORÍAS VACÍAS ===\n');
    
    // Obtener todas las categorías
    const allCategories = [
        ...window.app.categoryManager.customCategories,
        ...window.app.categoryManager.predefinedCategories
    ];
    
    console.log('Total de categorías:', allCategories.length);
    console.log('Total de recetas:', window.app.recipes.length);
    console.log('\n');
    
    // Separar categorías con y sin recetas
    const categoriesWithRecipes = [];
    const emptyCategories = [];
    
    allCategories.forEach(category => {
        const recipesInCategory = window.app.recipes.filter(r => r.category === category.id);
        
        if (recipesInCategory.length > 0) {
            categoriesWithRecipes.push({
                name: category.name,
                emoji: category.emoji,
                id: category.id,
                count: recipesInCategory.length,
                recipes: recipesInCategory.map(r => r.name)
            });
        } else {
            emptyCategories.push({
                name: category.name,
                emoji: category.emoji,
                id: category.id
            });
        }
    });
    
    // Mostrar categorías con recetas
    console.log('✅ CATEGORÍAS CON RECETAS (' + categoriesWithRecipes.length + '):');
    console.log('─'.repeat(60));
    categoriesWithRecipes
        .sort((a, b) => b.count - a.count)
        .forEach(cat => {
            console.log(`${cat.emoji} ${cat.name}: ${cat.count} receta(s)`);
            console.log(`   ID: ${cat.id}`);
            console.log(`   Recetas: ${cat.recipes.join(', ')}`);
            console.log('');
        });
    
    // Mostrar categorías vacías
    console.log('\n❌ CATEGORÍAS VACÍAS (' + emptyCategories.length + '):');
    console.log('─'.repeat(60));
    if (emptyCategories.length === 0) {
        console.log('¡Todas las categorías tienen recetas! 🎉');
    } else {
        emptyCategories.forEach(cat => {
            console.log(`${cat.emoji} ${cat.name}`);
            console.log(`   ID: ${cat.id}`);
            console.log('');
        });
    }
    
    // Resumen
    console.log('\n📊 RESUMEN:');
    console.log('─'.repeat(60));
    console.log(`Total categorías: ${allCategories.length}`);
    console.log(`Con recetas: ${categoriesWithRecipes.length} (${Math.round(categoriesWithRecipes.length / allCategories.length * 100)}%)`);
    console.log(`Vacías: ${emptyCategories.length} (${Math.round(emptyCategories.length / allCategories.length * 100)}%)`);
    console.log(`Total recetas: ${window.app.recipes.length}`);
    
    // Retornar objeto con los datos
    return {
        total: allCategories.length,
        withRecipes: categoriesWithRecipes,
        empty: emptyCategories,
        totalRecipes: window.app.recipes.length
    };
}

// Ejecutar automáticamente
console.log('Para ejecutar el diagnóstico, escribe: checkEmptyCategories()');
console.log('O simplemente espera 2 segundos...\n');

setTimeout(() => {
    checkEmptyCategories();
}, 2000);
