/**
 * Recipe Content Manager
 * Sistema de gestión de contenido para recetas en formato XML
 */

class RecipeContentManager {
    constructor() {
        // State
        this.recipes = [];
        this.filteredRecipes = [];
        this.selectedRecipes = new Set();
        this.history = [];
        this.backups = [];
        this.currentFile = null;
        
        // Filters
        this.filters = {
            search: '',
            category: '',
            author: '',
            noAuthor: false,
            noImages: false,
            caravan: false
        };

        // Sorting
        this.sortField = null;
        this.sortDirection = 'asc';

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.loadBackups();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S or Cmd+S - Download XML
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (this.recipes.length > 0) {
                    this.downloadXML();
                }
            }

            // Ctrl+Z or Cmd+Z - Undo
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                if (this.history.length > 0) {
                    this.undo();
                }
            }

            // Ctrl+F or Cmd+F - Focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('search-input').focus();
            }

            // Escape - Close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            }
        });
    }

    setupEventListeners() {
        // File input
        document.getElementById('xml-file-input').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });

        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Filters
        document.getElementById('filter-category').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filter-author').addEventListener('change', (e) => {
            this.filters.author = e.target.value;
            this.applyFilters();
        });

        document.getElementById('filter-no-author').addEventListener('change', (e) => {
            this.filters.noAuthor = e.target.checked;
            this.applyFilters();
        });

        document.getElementById('filter-no-images').addEventListener('change', (e) => {
            this.filters.noImages = e.target.checked;
            this.applyFilters();
        });

        document.getElementById('filter-caravan').addEventListener('change', (e) => {
            this.filters.caravan = e.target.checked;
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Select all
        document.getElementById('select-all-checkbox').addEventListener('change', (e) => {
            this.selectAll(e.target.checked);
        });

        document.getElementById('select-all-btn').addEventListener('click', () => {
            this.selectAll(true);
        });

        // Batch edit
        document.getElementById('batch-edit-btn').addEventListener('click', () => {
            this.openBatchEditModal();
        });

        // Actions
        document.getElementById('undo-btn').addEventListener('click', () => {
            this.undo();
        });

        document.getElementById('export-csv-btn').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('download-xml-btn').addEventListener('click', () => {
            this.downloadXML();
        });

        document.getElementById('find-replace-btn').addEventListener('click', () => {
            this.openFindReplaceModal();
        });

        // Batch edit modal
        document.getElementById('batch-update-author').addEventListener('change', (e) => {
            document.getElementById('batch-author').disabled = !e.target.checked;
        });

        document.getElementById('batch-update-category').addEventListener('change', (e) => {
            document.getElementById('batch-category').disabled = !e.target.checked;
        });

        document.getElementById('batch-update-history').addEventListener('change', (e) => {
            document.getElementById('batch-history').disabled = !e.target.checked;
        });

        document.getElementById('batch-update-time').addEventListener('change', (e) => {
            document.getElementById('batch-time').disabled = !e.target.checked;
        });

        // Table sorting
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => {
                this.sortTable(th.dataset.sort);
            });
        });
    }

    sortTable(field) {
        if (this.sortField === field) {
            // Toggle direction
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }

        // Sort filtered recipes
        this.filteredRecipes.sort((a, b) => {
            let aVal = a[field] || '';
            let bVal = b[field] || '';

            // Convert to lowercase for string comparison
            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        // Update table headers
        document.querySelectorAll('.sortable').forEach(th => {
            th.classList.remove('asc', 'desc');
            if (th.dataset.sort === field) {
                th.classList.add(this.sortDirection);
            }
        });

        this.renderTable();
    }

    // ==================== FILE HANDLING ====================

    async handleFileUpload(file) {
        if (!file) return;

        this.showLoading(true);
        this.currentFile = file;

        try {
            const text = await file.text();
            this.parseXML(text);
            this.createBackup('Carga inicial');
            this.showNotification('XML cargado correctamente', 'success');
        } catch (error) {
            console.error('Error loading XML:', error);
            this.showNotification('Error al cargar el XML: ' + error.message, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    parseXML(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('XML mal formado');
        }

        // Check for root element
        const recipesRoot = xmlDoc.querySelector('recipes');
        if (!recipesRoot) {
            throw new Error('El XML no contiene el elemento raíz <recipes>');
        }

        // Parse all recipes
        const recipeElements = xmlDoc.querySelectorAll('recipe');
        this.recipes = Array.from(recipeElements).map((recipeEl, index) => {
            return this.parseRecipeElement(recipeEl, index);
        });

        console.log(`Parsed ${this.recipes.length} recipes`);
        
        // Update UI
        this.filteredRecipes = [...this.recipes];
        this.renderDashboard();
        this.renderFilters();
        this.renderTable();
        this.showEmptyState(false);
    }

    parseRecipeElement(recipeEl, index) {
        const getTextContent = (selector) => {
            const el = recipeEl.querySelector(selector);
            return el ? el.textContent.trim() : '';
        };

        const getBooleanAttribute = (selector, attr = 'value') => {
            const el = recipeEl.querySelector(selector);
            return el ? el.getAttribute(attr) === 'true' : false;
        };

        // Parse ingredients
        const ingredients = Array.from(recipeEl.querySelectorAll('ingredient')).map(ing => ({
            id: ing.getAttribute('id') || '',
            name: ing.querySelector('name')?.textContent.trim() || '',
            quantity: ing.querySelector('quantity')?.textContent.trim() || '',
            unit: ing.querySelector('unit')?.textContent.trim() || ''
        }));

        // Parse sequences
        const sequences = Array.from(recipeEl.querySelectorAll('sequence')).map(seq => ({
            duration: seq.querySelector('duration')?.textContent.trim() || '',
            description: seq.querySelector('description')?.textContent.trim() || '',
            ingredientIds: Array.from(seq.querySelectorAll('ingredientId')).map(id => id.textContent.trim())
        }));

        // Parse images
        const images = Array.from(recipeEl.querySelectorAll('image')).map(img => ({
            name: img.querySelector('name')?.textContent.trim() || '',
            type: img.querySelector('type')?.textContent.trim() || '',
            data: img.querySelector('data')?.textContent.trim() || ''
        }));

        // Parse appliances
        const appliances = Array.from(recipeEl.querySelectorAll('appliance')).map(app => 
            app.textContent.trim()
        );

        return {
            id: recipeEl.getAttribute('id') || `recipe-${index}`,
            name: getTextContent('name'),
            category: getTextContent('category'),
            totalTime: getTextContent('totalTime'),
            author: getTextContent('author'),
            history: getTextContent('history'),
            preparationMethod: getTextContent('preparationMethod'),
            ingredients,
            sequences,
            images,
            appliances,
            caravanFriendly: getBooleanAttribute('caravanFriendly'),
            hospitalFriendly: getBooleanAttribute('hospitalFriendly'),
            menuFriendly: getBooleanAttribute('menuFriendly')
        };
    }

    // ==================== RENDERING ====================

    renderDashboard() {
        const total = this.recipes.length;
        const withAuthor = this.recipes.filter(r => r.author).length;
        const withImages = this.recipes.filter(r => r.images.length > 0).length;
        const categories = new Set(this.recipes.map(r => r.category)).size;
        const caravan = this.recipes.filter(r => r.caravanFriendly).length;
        const hospital = this.recipes.filter(r => r.hospitalFriendly).length;

        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-categories').textContent = categories;
        document.getElementById('stat-with-author').textContent = total > 0 ? Math.round((withAuthor / total) * 100) + '%' : '0%';
        document.getElementById('stat-with-images').textContent = total > 0 ? Math.round((withImages / total) * 100) + '%' : '0%';
        document.getElementById('stat-caravan').textContent = caravan;
        document.getElementById('stat-hospital').textContent = hospital;

        // Render incomplete recipes
        this.renderIncompleteRecipes();
    }

    renderIncompleteRecipes() {
        const incomplete = this.recipes.filter(r => {
            return !r.author || !r.totalTime || r.ingredients.length === 0 || r.images.length === 0;
        });

        const container = document.getElementById('incomplete-recipes');
        
        if (incomplete.length === 0) {
            container.innerHTML = '<p style="color: var(--color-success);">✓ Todas las recetas están completas</p>';
            return;
        }

        let html = `<p style="margin-bottom: var(--spacing-sm);">${incomplete.length} receta${incomplete.length !== 1 ? 's' : ''} incompleta${incomplete.length !== 1 ? 's' : ''}</p>`;
        html += '<div style="max-height: 200px; overflow-y: auto;">';
        
        incomplete.slice(0, 10).forEach(recipe => {
            const issues = [];
            if (!recipe.author) issues.push('sin autor');
            if (!recipe.totalTime) issues.push('sin tiempo');
            if (recipe.ingredients.length === 0) issues.push('sin ingredientes');
            if (recipe.images.length === 0) issues.push('sin imágenes');
            
            html += `
                <div style="padding: var(--spacing-xs); margin-bottom: var(--spacing-xs); background: var(--color-background); border-radius: 4px; cursor: pointer;" onclick="rcm.editRecipe('${recipe.id}')">
                    <div style="font-weight: 500;">${this.escapeHtml(recipe.name)}</div>
                    <div style="font-size: 0.75rem; color: var(--color-danger);">${issues.join(', ')}</div>
                </div>
            `;
        });
        
        if (incomplete.length > 10) {
            html += `<p style="margin-top: var(--spacing-xs); font-style: italic;">... y ${incomplete.length - 10} más</p>`;
        }
        
        html += '</div>';
        container.innerHTML = html;
    }

    renderFilters() {
        // Populate category filter
        const categories = [...new Set(this.recipes.map(r => r.category))].sort();
        const categorySelect = document.getElementById('filter-category');
        categorySelect.innerHTML = '<option value="">Todas</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        // Populate author filter
        const authors = [...new Set(this.recipes.map(r => r.author).filter(a => a))].sort();
        const authorSelect = document.getElementById('filter-author');
        authorSelect.innerHTML = '<option value="">Todos</option>';
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });
    }

    renderTable() {
        const tbody = document.getElementById('recipe-table-body');
        tbody.innerHTML = '';

        if (this.filteredRecipes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: var(--spacing-xl); color: var(--color-text-secondary);">No se encontraron recetas</td></tr>';
            return;
        }

        this.filteredRecipes.forEach(recipe => {
            const row = this.createRecipeRow(recipe);
            tbody.appendChild(row);
        });

        this.updateSelectedCount();
    }

    createRecipeRow(recipe) {
        const tr = document.createElement('tr');
        tr.dataset.recipeId = recipe.id;
        
        if (this.selectedRecipes.has(recipe.id)) {
            tr.classList.add('selected');
        }

        tr.innerHTML = `
            <td><input type="checkbox" class="recipe-checkbox" data-recipe-id="${recipe.id}" ${this.selectedRecipes.has(recipe.id) ? 'checked' : ''}></td>
            <td>${this.escapeHtml(recipe.name)}</td>
            <td>${this.escapeHtml(recipe.category)}</td>
            <td>${this.escapeHtml(recipe.author) || '<span style="color: var(--color-text-secondary);">Sin autor</span>'}</td>
            <td>${this.escapeHtml(recipe.totalTime)}</td>
            <td>${recipe.caravanFriendly ? '✅' : '❌'}</td>
            <td>${recipe.hospitalFriendly ? '✅' : '❌'}</td>
            <td>${recipe.menuFriendly ? '✅' : '❌'}</td>
            <td>${recipe.images.length}</td>
            <td>
                <button class="modal-trigger modal-trigger--icon" onclick="rcm.editRecipe('${recipe.id}')" title="Editar receta">
                    <i class="fa-solid fa-edit"></i>
                </button>
            </td>
        `;

        // Add checkbox event listener
        const checkbox = tr.querySelector('.recipe-checkbox');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.selectedRecipes.add(recipe.id);
                tr.classList.add('selected');
            } else {
                this.selectedRecipes.delete(recipe.id);
                tr.classList.remove('selected');
            }
            this.updateSelectedCount();
        });

        return tr;
    }

    // ==================== FILTERS ====================

    applyFilters() {
        this.filteredRecipes = this.recipes.filter(recipe => {
            // Search filter
            if (this.filters.search && !recipe.name.toLowerCase().includes(this.filters.search)) {
                return false;
            }

            // Category filter
            if (this.filters.category && recipe.category !== this.filters.category) {
                return false;
            }

            // Author filter
            if (this.filters.author && recipe.author !== this.filters.author) {
                return false;
            }

            // No author filter
            if (this.filters.noAuthor && recipe.author) {
                return false;
            }

            // No images filter
            if (this.filters.noImages && recipe.images.length > 0) {
                return false;
            }

            // Caravan filter
            if (this.filters.caravan && !recipe.caravanFriendly) {
                return false;
            }

            return true;
        });

        this.renderTable();
    }

    clearFilters() {
        this.filters = {
            search: '',
            category: '',
            author: '',
            noAuthor: false,
            noImages: false,
            caravan: false
        };

        document.getElementById('search-input').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-author').value = '';
        document.getElementById('filter-no-author').checked = false;
        document.getElementById('filter-no-images').checked = false;
        document.getElementById('filter-caravan').checked = false;

        this.applyFilters();
    }

    // ==================== SELECTION ====================

    selectAll(checked) {
        this.selectedRecipes.clear();
        
        if (checked) {
            this.filteredRecipes.forEach(recipe => {
                this.selectedRecipes.add(recipe.id);
            });
        }

        // Update checkboxes
        document.querySelectorAll('.recipe-checkbox').forEach(cb => {
            cb.checked = checked;
        });

        // Update row styling
        document.querySelectorAll('#recipe-table-body tr').forEach(tr => {
            if (checked) {
                tr.classList.add('selected');
            } else {
                tr.classList.remove('selected');
            }
        });

        this.updateSelectedCount();
    }

    updateSelectedCount() {
        const count = this.selectedRecipes.size;
        document.getElementById('selected-count').textContent = `${count} seleccionada${count !== 1 ? 's' : ''}`;
        
        // Enable/disable batch edit button
        document.getElementById('batch-edit-btn').disabled = count === 0;
    }

    // ==================== EDITING ====================

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        // Populate modal
        document.getElementById('edit-recipe-id').value = recipe.id;
        document.getElementById('edit-name').value = recipe.name;
        document.getElementById('edit-category').value = recipe.category;
        document.getElementById('edit-time').value = recipe.totalTime;
        document.getElementById('edit-author').value = recipe.author;
        document.getElementById('edit-history').value = recipe.history;
        document.getElementById('edit-preparation').value = recipe.preparationMethod;
        document.getElementById('edit-caravan').checked = recipe.caravanFriendly;
        document.getElementById('edit-hospital').checked = recipe.hospitalFriendly;
        document.getElementById('edit-menu').checked = recipe.menuFriendly;
        document.getElementById('edit-ingredients-count').textContent = recipe.ingredients.length;
        document.getElementById('edit-sequences-count').textContent = recipe.sequences.length;
        document.getElementById('edit-images-count').textContent = recipe.images.length;

        // Populate category dropdown
        const categories = [...new Set(this.recipes.map(r => r.category))].sort();
        const categorySelect = document.getElementById('edit-category');
        categorySelect.innerHTML = '';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
        categorySelect.value = recipe.category;

        // Show modal
        document.getElementById('edit-recipe-modal').style.display = 'flex';
    }

    closeEditRecipeModal() {
        document.getElementById('edit-recipe-modal').style.display = 'none';
    }

    saveEditRecipe() {
        const recipeId = document.getElementById('edit-recipe-id').value;
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        // Validate
        const name = document.getElementById('edit-name').value.trim();
        if (!name) {
            this.showNotification('El nombre es obligatorio', 'error');
            return;
        }

        const category = document.getElementById('edit-category').value;
        if (!category) {
            this.showNotification('La categoría es obligatoria', 'error');
            return;
        }

        // Check for duplicate names
        const duplicate = this.recipes.find(r => r.id !== recipeId && r.name.toLowerCase() === name.toLowerCase());
        if (duplicate) {
            this.showNotification('Ya existe una receta con ese nombre', 'warning');
        }

        // Save to history
        this.addToHistory('Editar receta individual');

        // Update recipe
        recipe.name = name;
        recipe.category = category;
        recipe.totalTime = document.getElementById('edit-time').value.trim();
        recipe.author = document.getElementById('edit-author').value.trim();
        recipe.history = document.getElementById('edit-history').value.trim();
        recipe.preparationMethod = document.getElementById('edit-preparation').value.trim();
        recipe.caravanFriendly = document.getElementById('edit-caravan').checked;
        recipe.hospitalFriendly = document.getElementById('edit-hospital').checked;
        recipe.menuFriendly = document.getElementById('edit-menu').checked;

        // Update UI
        this.renderDashboard();
        this.renderTable();
        this.closeEditRecipeModal();
        this.showNotification('Receta actualizada correctamente', 'success');
    }

    openBatchEditModal() {
        if (this.selectedRecipes.size === 0) return;

        // Update count
        document.getElementById('batch-edit-count').textContent = this.selectedRecipes.size;

        // Populate category dropdown
        const categories = [...new Set(this.recipes.map(r => r.category))].sort();
        const categorySelect = document.getElementById('batch-category');
        categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        // Reset form
        document.getElementById('batch-update-author').checked = false;
        document.getElementById('batch-update-category').checked = false;
        document.getElementById('batch-update-history').checked = false;
        document.getElementById('batch-update-time').checked = false;
        document.getElementById('batch-author').value = '';
        document.getElementById('batch-author').disabled = true;
        document.getElementById('batch-category').value = '';
        document.getElementById('batch-category').disabled = true;
        document.getElementById('batch-history').value = '';
        document.getElementById('batch-history').disabled = true;
        document.getElementById('batch-time').value = '';
        document.getElementById('batch-time').disabled = true;
        document.getElementById('batch-caravan').checked = false;
        document.getElementById('batch-hospital').checked = false;
        document.getElementById('batch-menu').checked = false;
        document.querySelector('input[name="batch-mode"][value="overwrite"]').checked = true;

        // Show modal
        document.getElementById('batch-edit-modal').style.display = 'flex';
    }

    closeBatchEditModal() {
        document.getElementById('batch-edit-modal').style.display = 'none';
    }

    applyBatchEdit() {
        const mode = document.querySelector('input[name="batch-mode"]:checked').value;
        const updates = {};
        let updateCount = 0;

        // Collect updates
        if (document.getElementById('batch-update-author').checked) {
            updates.author = document.getElementById('batch-author').value;
        }
        if (document.getElementById('batch-update-category').checked) {
            updates.category = document.getElementById('batch-category').value;
        }
        if (document.getElementById('batch-update-history').checked) {
            updates.history = document.getElementById('batch-history').value;
        }
        if (document.getElementById('batch-update-time').checked) {
            updates.totalTime = document.getElementById('batch-time').value;
        }

        // Flags
        const updateFlags = document.getElementById('batch-caravan').checked || 
                           document.getElementById('batch-hospital').checked || 
                           document.getElementById('batch-menu').checked;

        if (updateFlags) {
            updates.caravanFriendly = document.getElementById('batch-caravan').checked;
            updates.hospitalFriendly = document.getElementById('batch-hospital').checked;
            updates.menuFriendly = document.getElementById('batch-menu').checked;
        }

        // Save to history
        this.addToHistory('Edición en lote');

        // Apply updates
        this.selectedRecipes.forEach(recipeId => {
            const recipe = this.recipes.find(r => r.id === recipeId);
            if (!recipe) return;

            Object.keys(updates).forEach(key => {
                if (mode === 'empty' && recipe[key]) {
                    // Skip if field is not empty
                    return;
                }
                recipe[key] = updates[key];
                updateCount++;
            });
        });

        // Update UI
        this.renderDashboard();
        this.renderTable();
        this.closeBatchEditModal();
        this.showNotification(`${this.selectedRecipes.size} recetas actualizadas`, 'success');
    }

    // ==================== FIND AND REPLACE ====================

    openFindReplaceModal() {
        document.getElementById('find-replace-modal').style.display = 'flex';
        document.getElementById('find-preview').style.display = 'none';
    }

    closeFindReplaceModal() {
        document.getElementById('find-replace-modal').style.display = 'none';
    }

    previewFindReplace() {
        const field = document.getElementById('find-field').value;
        const findText = document.getElementById('find-text').value;
        const caseSensitive = document.getElementById('find-case-sensitive').checked;

        if (!findText) {
            this.showNotification('Ingresa un texto a buscar', 'warning');
            return;
        }

        let matchCount = 0;
        this.recipes.forEach(recipe => {
            const value = String(recipe[field] || '');
            const searchValue = caseSensitive ? value : value.toLowerCase();
            const searchText = caseSensitive ? findText : findText.toLowerCase();
            
            if (searchValue.includes(searchText)) {
                matchCount++;
            }
        });

        document.getElementById('find-preview-text').textContent = 
            `Se encontraron ${matchCount} coincidencias en el campo "${this.getFieldLabel(field)}"`;
        document.getElementById('find-preview').style.display = 'block';
    }

    applyFindReplace() {
        const field = document.getElementById('find-field').value;
        const findText = document.getElementById('find-text').value;
        const replaceText = document.getElementById('replace-text').value;
        const caseSensitive = document.getElementById('find-case-sensitive').checked;

        if (!findText) {
            this.showNotification('Ingresa un texto a buscar', 'warning');
            return;
        }

        // Save to history
        this.addToHistory('Buscar y reemplazar');

        let replaceCount = 0;
        this.recipes.forEach(recipe => {
            const value = String(recipe[field] || '');
            
            if (caseSensitive) {
                if (value.includes(findText)) {
                    recipe[field] = value.replaceAll(findText, replaceText);
                    replaceCount++;
                }
            } else {
                const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                if (regex.test(value)) {
                    recipe[field] = value.replace(regex, replaceText);
                    replaceCount++;
                }
            }
        });

        // Update UI
        this.renderTable();
        this.closeFindReplaceModal();
        this.showNotification(`${replaceCount} reemplazos realizados`, 'success');
    }

    getFieldLabel(field) {
        const labels = {
            name: 'Nombre',
            author: 'Autor',
            category: 'Categoría',
            history: 'Historia',
            preparationMethod: 'Método de preparación'
        };
        return labels[field] || field;
    }

    toggleHelp() {
        const modal = document.getElementById('help-modal');
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    }

    // ==================== EXPORT ====================

    generateXML() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recipes>\n';

        this.recipes.forEach(recipe => {
            xml += `  <recipe id="${recipe.id}">\n`;
            xml += `    <name>${this.escapeXml(recipe.name)}</name>\n`;
            xml += `    <category>${this.escapeXml(recipe.category)}</category>\n`;
            xml += `    <totalTime>${this.escapeXml(recipe.totalTime)}</totalTime>\n`;
            xml += `    <author>${this.escapeXml(recipe.author)}</author>\n`;
            xml += `    <history>${this.escapeXml(recipe.history)}</history>\n`;
            xml += `    <preparationMethod>${this.escapeXml(recipe.preparationMethod)}</preparationMethod>\n`;
            
            // Ingredients
            xml += `    <ingredients>\n`;
            recipe.ingredients.forEach(ing => {
                xml += `      <ingredient id="${ing.id}">\n`;
                xml += `        <name>${this.escapeXml(ing.name)}</name>\n`;
                xml += `        <quantity>${this.escapeXml(ing.quantity)}</quantity>\n`;
                xml += `        <unit>${this.escapeXml(ing.unit)}</unit>\n`;
                xml += `      </ingredient>\n`;
            });
            xml += `    </ingredients>\n`;

            // Sequences
            xml += `    <sequences>\n`;
            recipe.sequences.forEach(seq => {
                xml += `      <sequence>\n`;
                xml += `        <duration>${this.escapeXml(seq.duration)}</duration>\n`;
                xml += `        <description>${this.escapeXml(seq.description)}</description>\n`;
                xml += `        <ingredientIds>\n`;
                seq.ingredientIds.forEach(id => {
                    xml += `          <ingredientId>${this.escapeXml(id)}</ingredientId>\n`;
                });
                xml += `        </ingredientIds>\n`;
                xml += `      </sequence>\n`;
            });
            xml += `    </sequences>\n`;

            // Images
            xml += `    <images>\n`;
            recipe.images.forEach(img => {
                xml += `      <image>\n`;
                xml += `        <name>${this.escapeXml(img.name)}</name>\n`;
                xml += `        <type>${this.escapeXml(img.type)}</type>\n`;
                xml += `        <data>${img.data}</data>\n`;
                xml += `      </image>\n`;
            });
            xml += `    </images>\n`;

            // Appliances
            xml += `    <appliances>\n`;
            recipe.appliances.forEach(app => {
                xml += `      <appliance>${this.escapeXml(app)}</appliance>\n`;
            });
            xml += `    </appliances>\n`;

            // Flags
            xml += `    <caravanFriendly value="${recipe.caravanFriendly}"/>\n`;
            xml += `    <hospitalFriendly value="${recipe.hospitalFriendly}"/>\n`;
            xml += `    <menuFriendly value="${recipe.menuFriendly}"/>\n`;

            xml += `  </recipe>\n`;
        });

        xml += '</recipes>';
        return xml;
    }

    downloadXML() {
        const xml = this.generateXML();
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const now = new Date();
        const filename = `recetas_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.xml`;
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification(`XML descargado: ${filename}`, 'success');
    }

    exportToCSV() {
        if (this.recipes.length === 0) {
            this.showNotification('No hay recetas para exportar', 'warning');
            return;
        }

        // CSV Headers
        const headers = [
            'ID', 'Nombre', 'Categoría', 'Tiempo Total', 'Autor', 'Historia',
            'Método de Preparación', 'Ingredientes', 'Secuencias', 'Imágenes',
            'Aparatos', 'Apto Caravana', 'Apto Hospital', 'Apto Menú'
        ];

        // CSV Rows
        const rows = this.recipes.map(recipe => {
            return [
                recipe.id,
                this.escapeCSV(recipe.name),
                this.escapeCSV(recipe.category),
                this.escapeCSV(recipe.totalTime),
                this.escapeCSV(recipe.author),
                this.escapeCSV(recipe.history),
                this.escapeCSV(recipe.preparationMethod),
                recipe.ingredients.length,
                recipe.sequences.length,
                recipe.images.length,
                recipe.appliances.join('; '),
                recipe.caravanFriendly ? 'Sí' : 'No',
                recipe.hospitalFriendly ? 'Sí' : 'No',
                recipe.menuFriendly ? 'Sí' : 'No'
            ];
        });

        // Generate CSV
        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.join(',') + '\n';
        });

        // Download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const now = new Date();
        const filename = `recetas_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}.csv`;
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification(`CSV exportado: ${filename}`, 'success');
    }

    escapeCSV(text) {
        if (!text) return '';
        text = String(text);
        if (text.includes(',') || text.includes('"') || text.includes('\n')) {
            return '"' + text.replace(/"/g, '""') + '"';
        }
        return text;
    }

    // ==================== HISTORY & BACKUP ====================

    addToHistory(action) {
        this.history.push({
            action,
            timestamp: new Date(),
            recipes: JSON.parse(JSON.stringify(this.recipes))
        });

        // Keep only last 50 actions
        if (this.history.length > 50) {
            this.history.shift();
        }

        document.getElementById('undo-btn').disabled = false;
    }

    undo() {
        if (this.history.length === 0) return;

        const lastState = this.history.pop();
        this.recipes = lastState.recipes;
        this.filteredRecipes = [...this.recipes];
        
        this.renderDashboard();
        this.renderTable();
        this.showNotification('Cambios deshechos', 'success');

        if (this.history.length === 0) {
            document.getElementById('undo-btn').disabled = true;
        }
    }

    createBackup(description) {
        const backup = {
            description,
            timestamp: new Date(),
            recipes: JSON.parse(JSON.stringify(this.recipes))
        };

        this.backups.push(backup);

        // Keep only last 5 backups
        if (this.backups.length > 5) {
            this.backups.shift();
        }

        // Save to localStorage
        try {
            localStorage.setItem('rcm_backups', JSON.stringify(this.backups));
        } catch (e) {
            console.error('Error saving backup:', e);
        }
    }

    loadBackups() {
        try {
            const stored = localStorage.getItem('rcm_backups');
            if (stored) {
                this.backups = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading backups:', e);
        }
    }

    // ==================== UI HELPERS ====================

    showLoading(show) {
        document.getElementById('loading-state').classList.toggle('hidden', !show);
        document.getElementById('table-container').classList.toggle('hidden', show);
    }

    showEmptyState(show) {
        document.getElementById('empty-state').classList.toggle('hidden', !show);
        document.getElementById('table-container').classList.toggle('hidden', show);
        
        // Enable/disable action buttons
        document.getElementById('export-csv-btn').disabled = show;
        document.getElementById('download-xml-btn').disabled = show;
        document.getElementById('find-replace-btn').disabled = show;
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${this.escapeHtml(message)}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        container.appendChild(toast);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeXml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}

// Initialize the application
const rcm = new RecipeContentManager();
