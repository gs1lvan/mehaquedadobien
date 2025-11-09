/**
 * Recipe Content Manager
 * Sistema de gestión de contenido para recetas en formato XML
 */

// PREDEFINED_CATEGORY_IDS is now imported from categories.js

class RecipeContentManager {
    constructor() {
        // State
        this.recipes = [];
        this.filteredRecipes = [];
        this.selectedRecipes = new Set();
        this.history = [];
        this.backups = [];
        this.currentFile = null;
        this.hasUnsavedChanges = false;
        
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

        document.getElementById('filter-hospital').addEventListener('change', (e) => {
            this.filters.hospital = e.target.checked;
            this.applyFilters();
        });

        document.getElementById('filter-menu').addEventListener('change', (e) => {
            this.filters.menu = e.target.checked;
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Horizontal Filters (sync with sidebar filters)
        const searchInputH = document.getElementById('search-input-h');
        if (searchInputH) {
            searchInputH.addEventListener('input', (e) => {
                document.getElementById('search-input').value = e.target.value;
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        const filterCategoryH = document.getElementById('filter-category-h');
        if (filterCategoryH) {
            filterCategoryH.addEventListener('change', (e) => {
                document.getElementById('filter-category').value = e.target.value;
                this.filters.category = e.target.value;
                this.applyFilters();
            });
        }

        const filterAuthorH = document.getElementById('filter-author-h');
        if (filterAuthorH) {
            filterAuthorH.addEventListener('change', (e) => {
                document.getElementById('filter-author').value = e.target.value;
                this.filters.author = e.target.value;
                this.applyFilters();
            });
        }

        const filterNoAuthorH = document.getElementById('filter-no-author-h');
        if (filterNoAuthorH) {
            filterNoAuthorH.addEventListener('change', (e) => {
                document.getElementById('filter-no-author').checked = e.target.checked;
                this.filters.noAuthor = e.target.checked;
                this.applyFilters();
            });
        }

        const filterNoImagesH = document.getElementById('filter-no-images-h');
        if (filterNoImagesH) {
            filterNoImagesH.addEventListener('change', (e) => {
                document.getElementById('filter-no-images').checked = e.target.checked;
                this.filters.noImages = e.target.checked;
                this.applyFilters();
            });
        }

        const filterCaravanH = document.getElementById('filter-caravan-h');
        if (filterCaravanH) {
            filterCaravanH.addEventListener('change', (e) => {
                document.getElementById('filter-caravan').checked = e.target.checked;
                this.filters.caravan = e.target.checked;
                this.applyFilters();
            });
        }

        const filterHospitalH = document.getElementById('filter-hospital-h');
        if (filterHospitalH) {
            filterHospitalH.addEventListener('change', (e) => {
                document.getElementById('filter-hospital').checked = e.target.checked;
                this.filters.hospital = e.target.checked;
                this.applyFilters();
            });
        }

        const filterMenuH = document.getElementById('filter-menu-h');
        if (filterMenuH) {
            filterMenuH.addEventListener('change', (e) => {
                document.getElementById('filter-menu').checked = e.target.checked;
                this.filters.menu = e.target.checked;
                this.applyFilters();
            });
        }

        // Select all
        document.getElementById('select-all-checkbox').addEventListener('change', (e) => {
            this.selectAll(e.target.checked);
        });

        document.getElementById('select-all-btn').addEventListener('click', () => {
            // Toggle: if all are selected, deselect all; otherwise select all
            const allSelected = this.filteredRecipes.length > 0 && 
                               this.filteredRecipes.every(r => this.selectedRecipes.has(r.id));
            this.selectAll(!allSelected);
            // Update checkbox state
            const checkbox = document.getElementById('select-all-checkbox');
            if (checkbox) checkbox.checked = !allSelected;
        });

        // Batch edit
        document.getElementById('batch-edit-btn').addEventListener('click', () => {
            this.openBatchEditModal();
        });

        // Delete selected
        document.getElementById('delete-selected-btn').addEventListener('click', () => {
            this.openDeleteConfirmationModal();
        });

        // Export selected
        document.getElementById('export-selected-btn').addEventListener('click', () => {
            this.exportSelectedRecipes();
        });

        // Actions - Header buttons only
        document.getElementById('download-xml-btn-header').addEventListener('click', () => {
            this.downloadXML();
        });

        document.getElementById('find-replace-btn-header').addEventListener('click', () => {
            this.openFindReplaceModal();
        });

        document.getElementById('new-recipe-btn-header').addEventListener('click', () => {
            this.createNewRecipe();
        });

        document.getElementById('duplicate-btn-header').addEventListener('click', () => {
            this.duplicateSelectedRecipes();
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

            // Special handling for totalTime - convert to minutes for proper sorting
            if (field === 'totalTime') {
                aVal = this.timeToMinutes(aVal);
                bVal = this.timeToMinutes(bVal);
            }
            // Special handling for array fields - sort by length
            else if (field === 'ingredients' || field === 'sequences' || field === 'appliances') {
                aVal = Array.isArray(a[field]) ? a[field].length : 0;
                bVal = Array.isArray(b[field]) ? b[field].length : 0;
            }
            else {
                // Convert to lowercase for string comparison
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
            }

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

    timeToMinutes(timeStr) {
        if (!timeStr) return 0;
        const time = this.parseTimeString(timeStr);
        const hours = parseInt(time.hours) || 0;
        const minutes = parseInt(time.minutes) || 0;
        return hours * 60 + minutes;
    }

    // ==================== FILE HANDLING ====================

    async handleFileUpload(file) {
        if (!file) return;

        // Validate file type
        if (!file.name.endsWith('.xml')) {
            this.showNotification('Por favor selecciona un archivo XML válido', 'error');
            return;
        }

        this.showLoading(true);
        this.currentFile = file;

        try {
            const text = await file.text();
            
            // Log first 200 characters for debugging
            console.log('XML Preview:', text.substring(0, 200));
            
            // Check if file is empty
            if (!text || text.trim().length === 0) {
                throw new Error('El archivo XML está vacío');
            }
            
            this.parseXML(text);
            this.createBackup('Carga inicial');
            this.showNotification(`XML cargado correctamente: ${this.recipes.length} recetas`, 'success');
        } catch (error) {
            console.error('Error loading XML:', error);
            this.showNotification('Error al cargar el XML: ' + error.message, 'error');
            
            // Reset state
            this.recipes = [];
            this.filteredRecipes = [];
            this.showEmptyState(true);
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
            console.error('Parser error:', parserError.textContent);
            throw new Error('XML mal formado: ' + parserError.textContent);
        }

        // Check for root element - support both <recipes> (multiple) and <recipe> (single)
        let recipesRoot = xmlDoc.querySelector('recipes');
        let recipeElements = [];
        
        // If not found, try with documentElement
        if (!recipesRoot) {
            recipesRoot = xmlDoc.documentElement;
            const rootTag = recipesRoot.tagName.toLowerCase();
            console.log('Root element:', rootTag);
            
            // Check if it's a single recipe export
            if (rootTag === 'recipe') {
                console.log('Detected single recipe export format');
                recipeElements = [recipesRoot];
            } else if (rootTag !== 'recipes') {
                throw new Error(`Formato XML no soportado. Encontrado: <${recipesRoot.tagName}>. Se esperaba <recipes> o <recipe>`);
            }
        }

        if (!recipesRoot) {
            throw new Error('El XML no contiene un elemento raíz válido');
        }

        // Parse all recipes (if not already parsed from single recipe)
        if (recipeElements.length === 0) {
            recipeElements = recipesRoot.querySelectorAll('recipe');
        }
        
        if (recipeElements.length === 0) {
            console.warn('No se encontraron elementos <recipe> en el XML');
            this.showNotification('El XML no contiene recetas', 'warning');
        }

        this.recipes = Array.from(recipeElements).map((recipeEl, index) => {
            return this.parseRecipeElement(recipeEl, index);
        });

        console.log(`Parsed ${this.recipes.length} recipe${this.recipes.length !== 1 ? 's' : ''}`);
        
        // Update UI
        this.filteredRecipes = [...this.recipes];
        this.renderDashboard();
        this.renderFilters();
        this.renderTable();
        this.updateDashboardStats(); // Initialize dashboard with all recipes
        this.showEmptyState(false);
    }

    parseRecipeElement(recipeEl, index) {
        const getTextContent = (selector) => {
            const el = recipeEl.querySelector(selector);
            return el ? el.textContent.trim() : '';
        };

        const getBooleanAttribute = (selector, attr = 'value') => {
            const el = recipeEl.querySelector(selector);
            if (!el) return false;
            
            // Try attribute first (format: <caravanFriendly value="true"/>)
            const attrValue = el.getAttribute(attr);
            if (attrValue !== null) {
                return attrValue === 'true';
            }
            
            // Try text content (format: <caravanFriendly>true</caravanFriendly>)
            const textValue = el.textContent.trim().toLowerCase();
            return textValue === 'true';
        };

        // Parse ingredients
        const ingredients = Array.from(recipeEl.querySelectorAll('ingredient')).map(ing => ({
            id: ing.getAttribute('id') || '',
            name: ing.querySelector('name')?.textContent.trim() || '',
            quantity: ing.querySelector('quantity')?.textContent.trim() || '',
            unit: ing.querySelector('unit')?.textContent.trim() || ''
        }));

        // Parse sequences (support both <sequences> and <additionSequences>)
        const sequencesContainer = recipeEl.querySelector('sequences') || recipeEl.querySelector('additionSequences');
        const sequences = sequencesContainer 
            ? Array.from(sequencesContainer.querySelectorAll('sequence')).map(seq => ({
                duration: seq.querySelector('duration')?.textContent.trim() || '',
                description: seq.querySelector('description')?.textContent.trim() || '',
                ingredientIds: Array.from(seq.querySelectorAll('ingredientId')).map(id => id.textContent.trim())
            }))
            : [];

        // Parse images
        const images = Array.from(recipeEl.querySelectorAll('image')).map(img => ({
            name: img.querySelector('name')?.textContent.trim() || '',
            type: img.querySelector('type')?.textContent.trim() || '',
            data: img.querySelector('data')?.textContent.trim() || ''
        }));

        // Parse appliances (support both <kitchenAppliances> and <appliances>)
        const appliancesContainer = recipeEl.querySelector('kitchenAppliances') || recipeEl.querySelector('appliances');
        const appliances = appliancesContainer
            ? Array.from(appliancesContainer.querySelectorAll('appliance')).map(app => app.textContent.trim())
            : [];

        // Parse timestamps
        const createdAtText = getTextContent('createdAt');
        const updatedAtText = getTextContent('updatedAt');
        
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
            menuFriendly: getBooleanAttribute('menuFriendly'),
            createdAt: createdAtText ? new Date(createdAtText) : new Date(),
            updatedAt: updatedAtText ? new Date(updatedAtText) : new Date()
        };
    }

    // ==================== RENDERING ====================

    renderDashboard() {
        const total = this.recipes.length;
        const withAuthor = this.recipes.filter(r => r.author).length;
        const withImages = this.recipes.filter(r => r.images.length > 0).length;
        const totalImages = this.recipes.reduce((sum, r) => sum + r.images.length, 0);
        const totalIngredients = this.recipes.reduce((sum, r) => sum + r.ingredients.length, 0);
        const totalTime = this.recipes.reduce((sum, r) => {
            const time = this.parseTimeString(r.totalTime);
            return sum + (parseInt(time.hours) || 0) + (parseInt(time.minutes) || 0) / 60;
        }, 0);
        const categories = new Set(this.recipes.map(r => r.category)).size;
        const caravan = this.recipes.filter(r => r.caravanFriendly).length;
        const hospital = this.recipes.filter(r => r.hospitalFriendly).length;
        const menu = this.recipes.filter(r => r.menuFriendly).length;

        // Sidebar stats
        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-categories').textContent = categories;
        document.getElementById('stat-with-author').textContent = total > 0 ? Math.round((withAuthor / total) * 100) + '%' : '0%';
        document.getElementById('stat-with-images').textContent = total > 0 ? Math.round((withImages / total) * 100) + '%' : '0%';
        document.getElementById('stat-caravan').textContent = caravan;
        document.getElementById('stat-hospital').textContent = hospital;
        document.getElementById('stat-menu').textContent = menu;

        // Horizontal dashboard stats
        const statTotalH = document.getElementById('stat-total-h');
        const statImagesH = document.getElementById('stat-images-h');
        const statIngredientsH = document.getElementById('stat-ingredients-h');
        const statTimeH = document.getElementById('stat-time-h');
        const statAuthorsH = document.getElementById('stat-authors-h');

        if (statTotalH) statTotalH.textContent = total;
        if (statImagesH) statImagesH.textContent = totalImages;
        if (statIngredientsH) statIngredientsH.textContent = totalIngredients;
        if (statTimeH) statTimeH.textContent = Math.round(totalTime) + 'h';
        if (statAuthorsH) statAuthorsH.textContent = total > 0 ? Math.round((withAuthor / total) * 100) + '%' : '0%';

        // Render incomplete recipes
        this.renderIncompleteRecipes();
    }

    renderIncompleteRecipes() {
        const incomplete = this.recipes.filter(r => {
            return !r.author || !r.totalTime || r.ingredients.length === 0 || r.images.length === 0;
        });

        // Update sidebar version
        const container = document.getElementById('incomplete-recipes');
        const icon = document.getElementById('incomplete-toggle-icon');
        
        if (container && icon) {
            if (incomplete.length === 0) {
                container.innerHTML = '<p style="color: var(--color-success);">✓ Todas las recetas están completas</p>';
                container.style.display = 'none';
                icon.textContent = '▶';
            } else {
                container.style.display = 'block';
                icon.textContent = '▼';

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
        }

        // Update horizontal version
        const containerH = document.getElementById('incomplete-recipes-h');
        const countH = document.getElementById('incomplete-count-h');
        
        if (containerH && countH) {
            countH.textContent = `(${incomplete.length})`;
            
            if (incomplete.length === 0) {
                containerH.innerHTML = '<p style="color: var(--color-success); font-size: 0.875rem;">✓ Todas las recetas están completas</p>';
            } else {
                let html = '<div class="incomplete-recipes-grid">';
                
                incomplete.slice(0, 15).forEach(recipe => {
                    const issues = [];
                    if (!recipe.author) issues.push('sin autor');
                    if (!recipe.totalTime) issues.push('sin tiempo');
                    if (recipe.ingredients.length === 0) issues.push('sin ingredientes');
                    if (recipe.images.length === 0) issues.push('sin imágenes');
                    
                    html += `
                        <div class="incomplete-recipe-item" onclick="rcm.editRecipe('${recipe.id}')">
                            <div class="incomplete-recipe-name">${this.escapeHtml(recipe.name)}</div>
                            <div class="incomplete-recipe-issues">${issues.join(', ')}</div>
                        </div>
                    `;
                });
                
                html += '</div>';
                
                if (incomplete.length > 15) {
                    html += `<p style="margin-top: var(--spacing-sm); font-style: italic; color: var(--color-text-secondary); font-size: 0.875rem;">... y ${incomplete.length - 15} más</p>`;
                }
                
                containerH.innerHTML = html;
            }
        }
    }

    renderFilters() {
        // Populate category filter (sidebar)
        const categories = [...new Set(this.recipes.map(r => r.category))].sort();
        const categorySelect = document.getElementById('filter-category');
        categorySelect.innerHTML = '<option value="">Todas</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        // Populate category filter (horizontal)
        const categorySelectH = document.getElementById('filter-category-h');
        if (categorySelectH) {
            categorySelectH.innerHTML = '<option value="">Todas las categorías</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelectH.appendChild(option);
            });
        }

        // Populate author filter (sidebar)
        const authors = [...new Set(this.recipes.map(r => r.author).filter(a => a))].sort();
        const authorSelect = document.getElementById('filter-author');
        authorSelect.innerHTML = '<option value="">Todos</option>';
        authors.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });

        // Populate author filter (horizontal)
        const authorSelectH = document.getElementById('filter-author-h');
        if (authorSelectH) {
            authorSelectH.innerHTML = '<option value="">Todos los autores</option>';
            authors.forEach(author => {
                const option = document.createElement('option');
                option.value = author;
                option.textContent = author;
                authorSelectH.appendChild(option);
            });
        }
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

        // Parse time for hours and minutes
        const parseTime = (timeStr) => {
            if (!timeStr) return { hours: '', minutes: '' };
            const hourMatch = timeStr.match(/(\d+)\s*h/);
            const minMatch = timeStr.match(/(\d+)\s*min/);
            return {
                hours: hourMatch ? hourMatch[1] : '',
                minutes: minMatch ? minMatch[1] : ''
            };
        };
        
        const time = parseTime(recipe.totalTime);
        
        // Build category options
        let categoryOptions = '';
        PREDEFINED_CATEGORY_IDS.forEach(cat => {
            const selected = cat === recipe.category ? 'selected' : '';
            const displayName = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
            categoryOptions += `<option value="${cat}" ${selected}>${displayName}</option>`;
        });

        tr.innerHTML = `
            <td><input type="checkbox" class="recipe-checkbox" data-recipe-id="${recipe.id}" ${this.selectedRecipes.has(recipe.id) ? 'checked' : ''}></td>
            <td>
                <button class="modal-trigger modal-trigger--icon" onclick="rcm.editRecipe('${recipe.id}')" title="Editar receta">
                    <i class="fa-solid fa-edit"></i>
                </button>
            </td>
            <td style="min-width: 150px;"><input type="text" class="editable-field" data-recipe-id="${recipe.id}" data-field="name" value="${this.escapeHtml(recipe.name)}" style="width: 100%; padding: 4px; border: 1px solid var(--color-border); border-radius: 4px;"></td>
            <td><select class="editable-field" data-recipe-id="${recipe.id}" data-field="category" style="width: 100%; padding: 4px; border: 1px solid var(--color-border); border-radius: 4px;">${categoryOptions}</select></td>
            <td><input type="text" class="editable-field" data-recipe-id="${recipe.id}" data-field="author" value="${this.escapeHtml(recipe.author || '')}" placeholder="Sin autor" style="width: 100%; padding: 4px; border: 1px solid var(--color-border); border-radius: 4px;"></td>
            <td style="min-width: 120px;">
                <div style="display: flex; gap: 4px; align-items: center;">
                    <input type="number" class="editable-time" data-recipe-id="${recipe.id}" data-time-part="hours" ${time.hours ? `value="${time.hours}"` : ''} placeholder="0" min="0" max="24" style="width: 50px; padding: 4px; border: 1px solid var(--color-border); border-radius: 4px;">
                    <span style="font-size: 0.75rem;">h</span>
                    <input type="number" class="editable-time" data-recipe-id="${recipe.id}" data-time-part="minutes" ${time.minutes ? `value="${time.minutes}"` : ''} placeholder="0" min="0" max="59" style="width: 50px; padding: 4px; border: 1px solid var(--color-border); border-radius: 4px;">
                    <span style="font-size: 0.75rem;">min</span>
                </div>
            </td>
            <td style="text-align: center; color: #666;">${recipe.ingredients.length}</td>
            <td style="text-align: center;">${recipe.images.length > 0 ? recipe.images.length : '<span style="color: var(--color-text-secondary);">-</span>'}</td>
            <td style="text-align: center;"><input type="checkbox" class="flag-checkbox" data-recipe-id="${recipe.id}" data-flag="caravanFriendly" ${recipe.caravanFriendly ? 'checked' : ''}></td>
            <td style="text-align: center;"><input type="checkbox" class="flag-checkbox" data-recipe-id="${recipe.id}" data-flag="hospitalFriendly" ${recipe.hospitalFriendly ? 'checked' : ''}></td>
            <td style="text-align: center;"><input type="checkbox" class="flag-checkbox" data-recipe-id="${recipe.id}" data-flag="menuFriendly" ${recipe.menuFriendly ? 'checked' : ''}></td>
        `;

        // Add checkbox event listener for selection
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

        // Add event listeners for editable fields
        const editableFields = tr.querySelectorAll('.editable-field');
        editableFields.forEach(field => {
            field.addEventListener('change', (e) => {
                const recipeId = e.target.dataset.recipeId;
                const fieldName = e.target.dataset.field;
                const value = e.target.value;
                
                // Update recipe data
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (recipe) {
                    recipe[fieldName] = value;
                    this.markUnsavedChanges();
                }
            });
        });

        // Add event listeners for time fields
        const timeFields = tr.querySelectorAll('.editable-time');
        timeFields.forEach(field => {
            // Validate input on change
            field.addEventListener('input', (e) => {
                const timePart = e.target.dataset.timePart;
                let value = parseInt(e.target.value);
                
                // Validate minutes (0-59)
                if (timePart === 'minutes' && value > 59) {
                    e.target.value = 59;
                }
                // Validate hours (0-24)
                if (timePart === 'hours' && value > 24) {
                    e.target.value = 24;
                }
                // No negative values
                if (value < 0) {
                    e.target.value = 0;
                }
            });
            
            field.addEventListener('change', (e) => {
                const recipeId = e.target.dataset.recipeId;
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (!recipe) return;
                
                // Get both hour and minute fields
                const row = e.target.closest('tr');
                const hoursField = row.querySelector('.editable-time[data-time-part="hours"]');
                const minutesField = row.querySelector('.editable-time[data-time-part="minutes"]');
                
                const hours = parseInt(hoursField.value) || 0;
                const minutes = parseInt(minutesField.value) || 0;
                
                // Format time string
                let timeStr = '';
                if (hours > 0) timeStr += `${hours}h`;
                if (minutes > 0) timeStr += (timeStr ? ' ' : '') + `${minutes}min`;
                
                recipe.totalTime = timeStr;
                this.markUnsavedChanges();
            });
        });

        // Add event listeners for flag checkboxes
        const flagCheckboxes = tr.querySelectorAll('.flag-checkbox');
        flagCheckboxes.forEach(flagCheckbox => {
            flagCheckbox.addEventListener('change', (e) => {
                const recipeId = e.target.dataset.recipeId;
                const flag = e.target.dataset.flag;
                const checked = e.target.checked;
                
                // Update recipe data immediately
                const recipe = this.recipes.find(r => r.id === recipeId);
                if (recipe) {
                    recipe[flag] = checked;
                }
                
                // Mark as having unsaved changes
                this.markUnsavedChanges();
            });
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

            // Hospital filter
            if (this.filters.hospital && !recipe.hospitalFriendly) {
                return false;
            }

            // Menu filter
            if (this.filters.menu && !recipe.menuFriendly) {
                return false;
            }

            return true;
        });

        this.renderTable();
        this.updateDashboardStats(); // Update dashboard with filtered data
    }

    updateDashboardStats() {
        // Calculate stats based on filtered recipes
        const recipes = this.filteredRecipes;
        const total = recipes.length;
        const withAuthor = recipes.filter(r => r.author).length;
        const totalImages = recipes.reduce((sum, r) => sum + r.images.length, 0);
        const totalIngredients = recipes.reduce((sum, r) => sum + r.ingredients.length, 0);
        const totalTime = recipes.reduce((sum, r) => {
            const time = this.parseTimeString(r.totalTime);
            return sum + (parseInt(time.hours) || 0) + (parseInt(time.minutes) || 0) / 60;
        }, 0);

        // Update horizontal dashboard stats
        const statTotalH = document.getElementById('stat-total-h');
        const statImagesH = document.getElementById('stat-images-h');
        const statIngredientsH = document.getElementById('stat-ingredients-h');
        const statTimeH = document.getElementById('stat-time-h');
        const statAuthorsH = document.getElementById('stat-authors-h');

        if (statTotalH) statTotalH.textContent = total;
        if (statImagesH) statImagesH.textContent = totalImages;
        if (statIngredientsH) statIngredientsH.textContent = totalIngredients;
        if (statTimeH) statTimeH.textContent = Math.round(totalTime) + 'h';
        if (statAuthorsH) statAuthorsH.textContent = total > 0 ? Math.round((withAuthor / total) * 100) + '%' : '0%';
    }

    clearFilters() {
        this.filters = {
            search: '',
            category: '',
            author: '',
            noAuthor: false,
            noImages: false,
            caravan: false,
            hospital: false,
            menu: false
        };

        document.getElementById('search-input').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-author').value = '';
        document.getElementById('filter-no-author').checked = false;
        document.getElementById('filter-no-images').checked = false;
        document.getElementById('filter-caravan').checked = false;
        document.getElementById('filter-hospital').checked = false;
        document.getElementById('filter-menu').checked = false;

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
        
        // Enable/disable batch edit, delete and export buttons
        document.getElementById('batch-edit-btn').disabled = count === 0;
        document.getElementById('delete-selected-btn').disabled = count === 0;
        document.getElementById('export-selected-btn').disabled = count === 0;
    }

    // ==================== EDITING ====================

    editRecipe(recipeId) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        // Populate modal
        document.getElementById('edit-recipe-id').value = recipe.id;
        document.getElementById('edit-name').value = recipe.name;
        document.getElementById('edit-category').value = recipe.category;
        
        // Parse and set time
        const time = this.parseTimeString(recipe.totalTime);
        document.getElementById('edit-time-hours').value = time.hours || '';
        document.getElementById('edit-time-minutes').value = time.minutes || '';
        
        document.getElementById('edit-author').value = recipe.author;
        document.getElementById('edit-history').value = recipe.history;
        document.getElementById('edit-caravan').checked = recipe.caravanFriendly;
        document.getElementById('edit-hospital').checked = recipe.hospitalFriendly;
        document.getElementById('edit-menu').checked = recipe.menuFriendly;
        document.getElementById('edit-ingredients-count').textContent = recipe.ingredients.length;
        document.getElementById('edit-sequences-count').textContent = recipe.sequences.length;
        document.getElementById('edit-images-count').textContent = recipe.images.length;

        // Populate ingredients textarea
        const ingredientsText = recipe.ingredients.map(ing => {
            const name = ing.name.padEnd(25, ' ');
            const quantity = `${ing.quantity} ${ing.unit}`;
            return `${name}${quantity}`;
        }).join('\n');
        const ingredientsTextarea = document.getElementById('edit-ingredients');
        ingredientsTextarea.value = ingredientsText;
        
        // Auto-resize textarea based on content
        this.autoResizeTextarea(ingredientsTextarea);

        // Populate category dropdown with predefined categories
        const categorySelect = document.getElementById('edit-category');
        categorySelect.innerHTML = '';
        PREDEFINED_CATEGORY_IDS.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            // Capitalize first letter for display
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
            categorySelect.appendChild(option);
        });
        categorySelect.value = recipe.category;

        // Render appliance badges
        this.renderApplianceBadges(recipe);

        // Render sequences
        this.renderSequencesList(recipe);

        // Render images
        this.renderImagesPreview(recipe);
        this.setupImageUpload(recipe);

        // Display timestamps
        const formatDate = (date) => {
            if (!date) return '-';
            const d = date instanceof Date ? date : new Date(date);
            return d.toLocaleString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };
        
        document.getElementById('edit-created-at').textContent = formatDate(recipe.createdAt);
        document.getElementById('edit-updated-at').textContent = formatDate(recipe.updatedAt);

        // Show modal
        document.getElementById('edit-recipe-modal').style.display = 'flex';
    }

    renderSequencesList(recipe) {
        const listElement = document.getElementById('edit-sequences-list');
        listElement.innerHTML = '';

        if (!recipe.sequences || recipe.sequences.length === 0) {
            listElement.innerHTML = '<p style="color: var(--color-text-secondary); font-size: 0.875rem;">No hay secuencias definidas</p>';
            return;
        }

        recipe.sequences.forEach((sequence, index) => {
            const item = document.createElement('div');
            item.className = 'detail-sequence-item';

            // Number
            const numberDiv = document.createElement('div');
            numberDiv.className = 'detail-sequence-number';
            numberDiv.textContent = index + 1;

            // Content
            const contentDiv = document.createElement('div');
            contentDiv.className = 'detail-sequence-content';

            // Description and duration container
            if (sequence.description || sequence.duration) {
                const descDurationDiv = document.createElement('div');
                descDurationDiv.className = 'detail-sequence-desc-duration';

                // Description
                if (sequence.description) {
                    const descriptionSpan = document.createElement('span');
                    descriptionSpan.className = 'detail-sequence-description';
                    descriptionSpan.textContent = sequence.description;
                    descDurationDiv.appendChild(descriptionSpan);
                }

                // Duration
                if (sequence.duration) {
                    const durationSpan = document.createElement('span');
                    durationSpan.className = 'detail-sequence-duration';
                    durationSpan.textContent = ` ⏱️ ${sequence.duration}`;
                    descDurationDiv.appendChild(durationSpan);
                }

                contentDiv.appendChild(descDurationDiv);
            }

            // Ingredients tags
            if (sequence.ingredientIds && sequence.ingredientIds.length > 0) {
                const ingredientsDiv = document.createElement('div');
                ingredientsDiv.className = 'detail-sequence-ingredients';

                sequence.ingredientIds.forEach(ingredientId => {
                    const ingredient = recipe.ingredients.find(ing => ing.id === ingredientId);
                    if (ingredient) {
                        const tag = document.createElement('span');
                        tag.className = 'detail-sequence-ingredient-tag';
                        tag.textContent = ingredient.name;
                        ingredientsDiv.appendChild(tag);
                    }
                });

                contentDiv.appendChild(ingredientsDiv);
            }

            item.appendChild(numberDiv);
            item.appendChild(contentDiv);
            listElement.appendChild(item);
        });
    }

    renderApplianceBadges(recipe) {
        const container = document.getElementById('edit-appliances');
        container.innerHTML = '';

        // Show assigned appliances (read-only)
        if (recipe.appliances.length === 0) {
            container.innerHTML = '<span style="color: var(--color-text-secondary); font-size: 0.875rem;">No hay aparatos asignados</span>';
            return;
        }

        recipe.appliances.forEach(applianceName => {
            const applianceDef = PREDEFINED_APPLIANCES.find(a => a.name === applianceName);
            const emoji = applianceDef ? applianceDef.emoji : '🔧';

            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'appliance-chip';
            chip.disabled = true;
            chip.style.cssText = `
                cursor: default;
                opacity: 1;
                border-color: var(--color-primary);
                background: transparent;
                color: var(--color-text);
            `;
            
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'chip-emoji';
            emojiSpan.textContent = emoji;
            
            chip.appendChild(emojiSpan);
            chip.appendChild(document.createTextNode(` ${applianceName}`));

            container.appendChild(chip);
        });
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
        
        // Format time from hours and minutes inputs
        const hours = parseInt(document.getElementById('edit-time-hours').value) || 0;
        const minutes = parseInt(document.getElementById('edit-time-minutes').value) || 0;
        let timeStr = '';
        if (hours > 0) timeStr += `${hours}h`;
        if (minutes > 0) timeStr += (timeStr ? ' ' : '') + `${minutes}min`;
        recipe.totalTime = timeStr;
        
        recipe.author = document.getElementById('edit-author').value.trim();
        recipe.history = document.getElementById('edit-history').value.trim();
        recipe.caravanFriendly = document.getElementById('edit-caravan').checked;
        recipe.hospitalFriendly = document.getElementById('edit-hospital').checked;
        recipe.menuFriendly = document.getElementById('edit-menu').checked;
        // Appliances are already updated in renderApplianceBadges
        // Ingredients are read-only and not editable in this modal

        // Update timestamp
        recipe.updatedAt = new Date();

        // Update UI
        this.renderDashboard();
        this.renderFilters(); // Update filters dynamically
        this.renderTable();
        this.closeEditRecipeModal();
        this.showNotification('Receta actualizada correctamente', 'success');
    }

    openBatchEditModal() {
        if (this.selectedRecipes.size === 0) return;

        // Update count
        document.getElementById('batch-edit-count').textContent = this.selectedRecipes.size;

        // Populate category dropdown with predefined categories
        const categorySelect = document.getElementById('batch-category');
        categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
        PREDEFINED_CATEGORY_IDS.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            // Capitalize first letter for display
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
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
        this.renderFilters(); // Update filters dynamically
        this.renderTable();
        this.closeBatchEditModal();
        this.showNotification(`${this.selectedRecipes.size} recetas actualizadas`, 'success');
    }

    // ==================== DELETE RECIPES ====================

    openDeleteConfirmationModal() {
        if (this.selectedRecipes.size === 0) return;

        // Update count
        const count = this.selectedRecipes.size;
        document.getElementById('delete-count').textContent = count;

        // Build list of recipes to delete
        const listContainer = document.getElementById('delete-recipe-list');
        listContainer.innerHTML = '';
        
        const ul = document.createElement('ul');
        ul.style.cssText = 'list-style: none; padding: 0; margin: 0;';
        
        this.selectedRecipes.forEach(recipeId => {
            const recipe = this.recipes.find(r => r.id === recipeId);
            if (recipe) {
                const li = document.createElement('li');
                li.style.cssText = 'padding: 8px; margin-bottom: 4px; background: white; border-radius: 4px; border-left: 3px solid var(--color-danger);';
                li.innerHTML = `<strong>${this.escapeHtml(recipe.name)}</strong> <span style="color: var(--color-text-secondary);">(${recipe.category})</span>`;
                ul.appendChild(li);
            }
        });
        
        listContainer.appendChild(ul);

        // Show modal
        document.getElementById('delete-confirmation-modal').style.display = 'flex';
    }

    closeDeleteConfirmationModal() {
        document.getElementById('delete-confirmation-modal').style.display = 'none';
    }

    confirmDeleteRecipes() {
        if (this.selectedRecipes.size === 0) return;

        // Save to history
        this.addToHistory('Eliminar recetas');

        const count = this.selectedRecipes.size;

        // Delete selected recipes
        this.recipes = this.recipes.filter(recipe => !this.selectedRecipes.has(recipe.id));
        
        // Clear selection
        this.selectedRecipes.clear();

        // Update UI
        this.filteredRecipes = [...this.recipes];
        this.renderDashboard();
        this.renderFilters();
        this.renderTable();
        this.closeDeleteConfirmationModal();
        
        this.showNotification(`${count} receta${count !== 1 ? 's' : ''} eliminada${count !== 1 ? 's' : ''}`, 'success');
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

    toggleIncompleteRecipes() {
        // Toggle sidebar version
        const content = document.getElementById('incomplete-recipes');
        const icon = document.getElementById('incomplete-toggle-icon');
        
        if (content && icon) {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.textContent = '▼';
            } else {
                content.style.display = 'none';
                icon.textContent = '▶';
            }
        }

        // Toggle horizontal version
        const contentH = document.getElementById('incomplete-recipes-h');
        const iconH = document.getElementById('incomplete-toggle-icon-h');
        
        if (contentH && iconH) {
            if (contentH.style.display === 'none') {
                contentH.style.display = 'block';
                iconH.textContent = '▼';
            } else {
                contentH.style.display = 'none';
                iconH.textContent = '▶';
            }
        }
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

            // Kitchen Appliances
            xml += `    <kitchenAppliances>\n`;
            recipe.appliances.forEach(app => {
                xml += `      <appliance>${this.escapeXml(app)}</appliance>\n`;
            });
            xml += `    </kitchenAppliances>\n`;

            // Flags
            xml += `    <caravanFriendly value="${recipe.caravanFriendly}"/>\n`;
            xml += `    <hospitalFriendly value="${recipe.hospitalFriendly}"/>\n`;
            xml += `    <menuFriendly value="${recipe.menuFriendly}"/>\n`;

            // Timestamps
            const createdAt = recipe.createdAt instanceof Date ? recipe.createdAt : new Date(recipe.createdAt || Date.now());
            const updatedAt = recipe.updatedAt instanceof Date ? recipe.updatedAt : new Date(recipe.updatedAt || Date.now());
            xml += `    <createdAt>${createdAt.toISOString()}</createdAt>\n`;
            xml += `    <updatedAt>${updatedAt.toISOString()}</updatedAt>\n`;

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

    exportSelectedRecipes() {
        if (this.selectedRecipes.size === 0) {
            this.showNotification('No hay recetas seleccionadas', 'warning');
            return;
        }

        // Filter recipes to only include selected ones
        const selectedRecipesList = this.recipes.filter(recipe => 
            this.selectedRecipes.has(recipe.id)
        );

        // Generate XML for selected recipes only
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recipes>\n';

        selectedRecipesList.forEach(recipe => {
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

            // Kitchen Appliances
            xml += `    <kitchenAppliances>\n`;
            recipe.appliances.forEach(app => {
                xml += `      <appliance>${this.escapeXml(app)}</appliance>\n`;
            });
            xml += `    </kitchenAppliances>\n`;

            // Flags
            xml += `    <caravanFriendly value="${recipe.caravanFriendly}"/>\n`;
            xml += `    <hospitalFriendly value="${recipe.hospitalFriendly}"/>\n`;
            xml += `    <menuFriendly value="${recipe.menuFriendly}"/>\n`;

            // Timestamps
            const createdAt = recipe.createdAt instanceof Date ? recipe.createdAt : new Date(recipe.createdAt || Date.now());
            const updatedAt = recipe.updatedAt instanceof Date ? recipe.updatedAt : new Date(recipe.updatedAt || Date.now());
            xml += `    <createdAt>${createdAt.toISOString()}</createdAt>\n`;
            xml += `    <updatedAt>${updatedAt.toISOString()}</updatedAt>\n`;

            xml += `  </recipe>\n`;
        });

        xml += '</recipes>';

        // Download
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const now = new Date();
        const filename = `recetas_seleccionadas_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.xml`;
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification(`${selectedRecipesList.length} recetas exportadas: ${filename}`, 'success');
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

        const undoBtn = document.getElementById('undo-btn-header');
        if (undoBtn) {
            undoBtn.disabled = false;
        }
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
            const undoBtn = document.getElementById('undo-btn-header');
            if (undoBtn) {
                undoBtn.disabled = true;
            }
        }
    }

    createBackup(description) {
        const backup = {
            description,
            timestamp: new Date(),
            recipes: JSON.parse(JSON.stringify(this.recipes))
        };

        this.backups.push(backup);

        // Keep only last 3 backups (reduced to save space)
        if (this.backups.length > 3) {
            this.backups.shift();
        }

        // Save to localStorage with quota handling
        try {
            localStorage.setItem('rcm_backups', JSON.stringify(this.backups));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.warn('LocalStorage quota exceeded. Clearing old backups...');
                // Clear all backups and try again with just the current one
                this.backups = [backup];
                try {
                    localStorage.setItem('rcm_backups', JSON.stringify(this.backups));
                    this.showNotification('Espacio limitado: solo se guardó el backup más reciente', 'warning');
                } catch (e2) {
                    console.error('Cannot save backup even after clearing:', e2);
                    this.showNotification('No se pudo guardar el backup (espacio insuficiente)', 'error');
                }
            } else {
                console.error('Error saving backup:', e);
            }
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
        
        // Enable/disable action buttons (header only)
        document.getElementById('download-xml-btn-header').disabled = show;
        document.getElementById('find-replace-btn-header').disabled = show;
        document.getElementById('new-recipe-btn-header').disabled = show;
        document.getElementById('duplicate-btn-header').disabled = show;
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

    autoResizeTextarea(textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate the number of lines
        const lineCount = (textarea.value.match(/\n/g) || []).length + 1;
        
        // Set minimum and maximum heights
        const minLines = 2;
        const maxLines = 20;
        const lineHeight = 20; // Approximate line height in pixels
        
        // Calculate height based on content
        const lines = Math.max(minLines, Math.min(lineCount, maxLines));
        const newHeight = lines * lineHeight + 20; // +20 for padding
        
        textarea.style.height = newHeight + 'px';
    }

    // ==================== CREATE & DUPLICATE ====================

    createNewRecipe() {
        const newRecipe = {
            id: `recipe-${Date.now()}`,
            name: 'Nueva Receta',
            category: 'carne',
            totalTime: '',
            author: '',
            history: '',
            preparationMethod: '',
            ingredients: [],
            sequences: [],
            images: [],
            appliances: [],
            caravanFriendly: false,
            hospitalFriendly: false,
            menuFriendly: false
        };

        this.addToHistory('Crear nueva receta');
        this.recipes.push(newRecipe);
        this.renderFilters(); // Update filters dynamically
        this.applyFilters();
        this.renderDashboard();
        this.showNotification('Nueva receta creada', 'success');
        
        // Open edit modal for the new recipe
        this.editRecipe(newRecipe.id);
    }

    duplicateSelectedRecipes() {
        if (this.selectedRecipes.size === 0) {
            this.showNotification('Selecciona al menos una receta para duplicar', 'warning');
            return;
        }

        this.addToHistory(`Duplicar ${this.selectedRecipes.size} receta(s)`);

        const duplicatedRecipes = [];
        this.selectedRecipes.forEach(recipeId => {
            const original = this.recipes.find(r => r.id === recipeId);
            if (original) {
                const duplicate = {
                    ...JSON.parse(JSON.stringify(original)),
                    id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    name: `${original.name} (copia)`
                };
                duplicatedRecipes.push(duplicate);
            }
        });

        this.recipes.push(...duplicatedRecipes);
        this.selectedRecipes.clear();
        this.renderFilters(); // Update filters dynamically
        this.applyFilters();
        this.renderDashboard();
        this.showNotification(`${duplicatedRecipes.length} receta(s) duplicada(s)`, 'success');
    }

    // ==================== UNSAVED CHANGES ====================

    markUnsavedChanges() {
        this.hasUnsavedChanges = true;
        // Enable save buttons
        document.getElementById('save-changes-top-btn')?.classList.remove('hidden');
        document.getElementById('save-changes-bottom-btn')?.classList.remove('hidden');
    }

    saveTableChanges() {
        if (!this.hasUnsavedChanges) {
            this.showNotification('No hay cambios pendientes', 'info');
            return;
        }

        this.addToHistory('Guardar cambios de tabla');
        this.hasUnsavedChanges = false;
        
        // Hide save buttons
        document.getElementById('save-changes-top-btn')?.classList.add('hidden');
        document.getElementById('save-changes-bottom-btn')?.classList.add('hidden');
        
        this.renderDashboard();
        this.showNotification('Cambios guardados correctamente', 'success');
    }

    // ==================== IMAGE MANAGEMENT ====================

    setupImageUpload(recipe) {
        const dropzone = document.getElementById('edit-images-dropzone');
        const input = document.getElementById('edit-images-input');

        // Click to select files
        dropzone.addEventListener('click', () => {
            input.click();
        });

        // File input change
        input.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files, recipe);
            input.value = ''; // Reset input
        });

        // Drag and drop
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            this.handleImageUpload(e.dataTransfer.files, recipe);
        });
    }

    async handleImageUpload(files, recipe) {
        if (!files || files.length === 0) return;

        for (const file of files) {
            try {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.showNotification(`${file.name} no es una imagen válida`, 'error');
                    continue;
                }

                // Process and compress image
                const processedImage = await this.processImageFile(file);
                
                // Add to recipe images
                recipe.images.push(processedImage);
                
                this.showNotification(`Imagen ${file.name} añadida`, 'success');
            } catch (error) {
                this.showNotification(`Error al procesar ${file.name}: ${error.message}`, 'error');
            }
        }

        // Re-render images
        this.renderImagesPreview(recipe);
        this.markUnsavedChanges();
    }

    async processImageFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        // Calculate dimensions (max 1920px)
                        let width = img.width;
                        let height = img.height;
                        const maxDimension = 1920;

                        if (width > maxDimension || height > maxDimension) {
                            if (width > height) {
                                height = (height / width) * maxDimension;
                                width = maxDimension;
                            } else {
                                width = (width / height) * maxDimension;
                                height = maxDimension;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        // Start with 80% quality
                        let quality = 0.8;
                        let compressedData = canvas.toDataURL('image/jpeg', quality);

                        // Reduce quality until under 500KB
                        const maxSize = 500 * 1024; // 500 KB in bytes
                        while (compressedData.length > maxSize && quality > 0.1) {
                            quality -= 0.1;
                            compressedData = canvas.toDataURL('image/jpeg', quality);
                        }

                        // Create image object
                        const imageObj = {
                            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                            name: file.name,
                            type: 'image/jpeg',
                            data: compressedData,
                            size: compressedData.length
                        };

                        resolve(imageObj);
                    } catch (error) {
                        reject(new Error('Error al comprimir imagen: ' + error.message));
                    }
                };

                img.onerror = () => {
                    reject(new Error('Error al cargar imagen'));
                };

                img.src = e.target.result;
            };

            reader.onerror = () => {
                reject(new Error('Error al leer archivo'));
            };

            reader.readAsDataURL(file);
        });
    }

    renderImagesPreview(recipe) {
        const preview = document.getElementById('edit-images-preview');
        const count = document.getElementById('edit-images-count');
        
        preview.innerHTML = '';
        count.textContent = recipe.images.length;

        if (recipe.images.length === 0) {
            preview.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary); font-size: 0.875rem;">No hay imágenes</p>';
            return;
        }

        recipe.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'media-preview-item';

            // Image container
            const container = document.createElement('div');
            container.className = 'media-preview-container';

            const img = document.createElement('img');
            img.src = image.data;
            img.alt = image.name;
            img.className = 'media-preview-image';
            img.style.cursor = 'pointer';
            img.title = 'Click para ampliar';
            
            // Add click handler to open image in modal
            img.addEventListener('click', () => {
                this.openImageModal(image.data, image.name);
            });
            
            container.appendChild(img);

            // Actions
            const actions = document.createElement('div');
            actions.className = 'media-actions';

            // Move buttons (only if multiple images)
            if (recipe.images.length > 1) {
                const upBtn = document.createElement('button');
                upBtn.type = 'button';
                upBtn.className = 'media-move-btn';
                upBtn.textContent = '▲';
                upBtn.title = 'Mover arriba';
                upBtn.addEventListener('click', () => {
                    this.moveImage(recipe, index, -1);
                });

                const downBtn = document.createElement('button');
                downBtn.type = 'button';
                downBtn.className = 'media-move-btn';
                downBtn.textContent = '▼';
                downBtn.title = 'Mover abajo';
                downBtn.addEventListener('click', () => {
                    this.moveImage(recipe, index, 1);
                });

                actions.appendChild(upBtn);
                actions.appendChild(downBtn);
            }

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'media-delete-btn';
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.title = 'Eliminar';
            deleteBtn.addEventListener('click', () => {
                this.deleteImage(recipe, index);
            });

            actions.appendChild(deleteBtn);

            // Info
            const info = document.createElement('div');
            info.className = 'media-info';

            const name = document.createElement('span');
            name.className = 'media-name';
            name.textContent = image.name;
            name.title = image.name;

            const size = document.createElement('span');
            size.className = 'media-size';
            size.textContent = this.formatFileSize(image.size);

            info.appendChild(name);
            info.appendChild(size);

            item.appendChild(container);
            item.appendChild(actions);
            item.appendChild(info);

            preview.appendChild(item);
        });
    }

    moveImage(recipe, index, direction) {
        const newIndex = index + direction;
        
        if (newIndex < 0 || newIndex >= recipe.images.length) return;

        // Swap
        const temp = recipe.images[index];
        recipe.images[index] = recipe.images[newIndex];
        recipe.images[newIndex] = temp;

        this.renderImagesPreview(recipe);
        this.markUnsavedChanges();
    }

    deleteImage(recipe, index) {
        if (!confirm('¿Eliminar esta imagen?')) return;

        recipe.images.splice(index, 1);
        this.renderImagesPreview(recipe);
        this.markUnsavedChanges();
    }

    openImageModal(imageSrc, imageName) {
        const modal = document.getElementById('image-preview-modal');
        if (!modal) return;

        const img = document.getElementById('image-preview-img');
        const title = document.getElementById('image-preview-title');

        if (img) img.src = imageSrc;
        if (title) title.textContent = imageName;

        modal.classList.remove('hidden');

        // Close on overlay click
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.onclick = () => this.closeImageModal();
        }

        // Close on X button
        const closeBtn = document.getElementById('close-image-preview');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeImageModal();
        }

        // Close on ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeImageModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    closeImageModal() {
        const modal = document.getElementById('image-preview-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    parseTimeString(timeStr) {
        if (!timeStr) return { hours: '', minutes: '' };
        const hourMatch = timeStr.match(/(\d+)\s*h/);
        const minMatch = timeStr.match(/(\d+)\s*min/);
        return {
            hours: hourMatch ? hourMatch[1] : '',
            minutes: minMatch ? minMatch[1] : ''
        };
    }
}

// Initialize the application
const rcm = new RecipeContentManager();
