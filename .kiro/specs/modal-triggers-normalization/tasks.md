# Plan de Implementación

- [x] 1. Analizar y documentar controles modales existentes


  - Identificar todos los selectores CSS de badges que abren modales en styles.css
  - Identificar todos los selectores CSS de botones que abren modales en styles.css
  - Identificar todos los selectores CSS de enlaces que abren modales en styles.css
  - Crear un documento de mapeo con todas las clases identificadas y sus propiedades
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Crear estructura base del archivo modal-triggers.css


  - Crear el archivo modal-triggers.css en el directorio raíz
  - Agregar comentarios de encabezado con descripción y propósito del archivo
  - Definir la estructura de secciones (Base, Badges, Buttons, Links, Icons, Theme Support, Responsive)
  - Importar y referenciar las variables CSS del sistema
  - _Requisitos: 2.1, 2.5_

- [x] 3. Implementar clase base .modal-trigger


  - Escribir estilos base compartidos por todos los controles modales
  - Implementar estado hover con transform scale(1.05)
  - Implementar estado active con transform scale(0.95)
  - Implementar estado focus con outline y outline-offset
  - Agregar propiedades de cursor, transition y user-select
  - _Requisitos: 4.1, 4.5, 4.6, 3.5, 3.6_

- [x] 4. Implementar modificador .modal-trigger--badge


  - Extraer estilos comunes de badges modales (recipe-ingredients-badge, recipe-options-badge, etc.)
  - Unificar padding usando variables de espaciado del sistema
  - Unificar font-size y font-weight
  - Unificar border-radius usando variables de radio del sistema
  - Unificar background con rgba y backdrop-filter
  - Unificar box-shadow usando variables de sombra del sistema
  - Implementar estado hover específico para badges
  - _Requisitos: 2.2, 3.1, 3.2, 3.3, 3.4, 3.7, 4.2_

- [x] 5. Implementar variantes de posición para badges


  - Crear clase .modal-trigger--badge-top-left con position absolute
  - Crear clase .modal-trigger--badge-top-right con position absolute
  - Crear clase .modal-trigger--badge-bottom-left con position absolute
  - Crear clase .modal-trigger--badge-bottom-right con position absolute
  - _Requisitos: 4.2_

- [x] 6. Implementar variantes de tamaño para badges


  - Crear clase .modal-trigger--badge-sm con padding y font-size reducidos
  - Crear clase .modal-trigger--badge-lg con padding y font-size aumentados
  - _Requisitos: 4.2, 3.2, 3.3_

- [x] 7. Implementar modificador .modal-trigger--button


  - Extraer estilos comunes de botones modales (category-chip, btn-upload-media, etc.)
  - Unificar background, border y color usando variables del sistema
  - Unificar padding y border-radius
  - Unificar font-size y font-weight
  - Implementar estado hover con border-color y box-shadow
  - Implementar estado active con background-color
  - Implementar estado selected con background primary
  - Implementar estado disabled con opacity y pointer-events
  - _Requisitos: 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.3_

- [x] 8. Implementar modificador .modal-trigger--link


  - Definir estilos base para enlaces modales
  - Unificar color usando variable primary
  - Implementar estado hover con text-decoration y color
  - Implementar estado active con color primary-light
  - _Requisitos: 2.4, 3.1, 3.5, 3.6, 4.4_

- [x] 9. Implementar modificador .modal-trigger--icon


  - Definir estilos para controles modales de solo icono
  - Establecer width y height fijos (36px)
  - Aplicar border-radius 50% para forma circular
  - Implementar estado hover con background
  - _Requisitos: 4.2_

- [x] 10. Implementar soporte para tema oscuro


  - Agregar estilos body.dark-theme para .modal-trigger--badge
  - Agregar estilos body.dark-theme para .modal-trigger--button
  - Agregar estilos body.dark-theme para .modal-trigger--link
  - Usar variables CSS del sistema para colores en tema oscuro
  - _Requisitos: 6.6_

- [x] 11. Implementar responsive design


  - Agregar media query para mobile (max-width: 767px) con tamaños reducidos
  - Agregar media query para tablet (768px - 1024px) con tamaños intermedios
  - Ajustar padding y font-size para cada breakpoint
  - Mantener consistencia con breakpoints existentes del sistema
  - _Requisitos: 6.5, 2.6_

- [x] 12. Agregar fallbacks y compatibilidad


  - Agregar @supports para backdrop-filter con fallback
  - Agregar prefijos vendor si es necesario (-webkit-, -moz-)
  - Verificar compatibilidad con navegadores objetivo
  - _Requisitos: 6.1, 6.2, 6.3, 6.4_

- [x] 13. Crear archivo de documentación con ejemplos


  - Crear archivo docs/modal-triggers-examples.md
  - Agregar ejemplos HTML para badges modales con diferentes posiciones
  - Agregar ejemplos HTML para botones modales con diferentes estados
  - Agregar ejemplos HTML para enlaces modales
  - Agregar ejemplos de combinación de clases base y modificadoras
  - Incluir notas sobre accesibilidad y atributos ARIA
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 14. Vincular modal-triggers.css en el HTML



  - Agregar etiqueta <link> en el <head> del archivo HTML principal
  - Colocar después de styles.css para mantener cascada correcta
  - Verificar que no hay conflictos de especificidad
  - _Requisitos: 6.1_

- [x] 15. Actualizar clases en componentes existentes (migración gradual)


  - Agregar nuevas clases junto a las existentes en badges de ingredientes
  - Agregar nuevas clases junto a las existentes en badges de opciones
  - Agregar nuevas clases junto a las existentes en badges de PDF
  - Agregar nuevas clases junto a las existentes en botones de categoría
  - Agregar nuevas clases junto a las existentes en botones de carga
  - Verificar que los estilos se aplican correctamente sin romper el diseño
  - _Requisitos: 6.1, 6.2_



- [ ] 16. Validar y optimizar el CSS generado
  - Ejecutar validador CSS (W3C CSS Validator)
  - Verificar que no hay duplicación innecesaria
  - Optimizar selectores para mejor rendimiento
  - Verificar especificidad de selectores

  - Agregar comentarios CSS para documentar secciones
  - _Requisitos: 2.5, 6.1_

- [ ] 17. Testing visual en diferentes estados
  - Verificar estado normal de todos los controles modales
  - Verificar estado hover de todos los controles modales
  - Verificar estado active de todos los controles modales

  - Verificar estado focus de todos los controles modales
  - Verificar estado disabled donde aplique
  - _Requisitos: 3.5, 3.6_

- [ ] 18. Testing responsive en diferentes dispositivos
  - Probar en mobile (< 768px) con Chrome DevTools

  - Probar en tablet (768px - 1024px) con Chrome DevTools
  - Probar en desktop (> 1024px)
  - Verificar que los tamaños se ajustan correctamente
  - _Requisitos: 6.5_

- [x] 19. Testing de compatibilidad con temas


  - Probar todos los controles en tema claro
  - Probar todos los controles en tema oscuro
  - Verificar contraste de colores en ambos temas
  - Verificar que las transiciones funcionan en ambos temas
  - _Requisitos: 6.6_

- [ ] 20. Testing de compatibilidad con navegadores
  - Probar en Chrome (últimas 2 versiones)
  - Probar en Firefox (últimas 2 versiones)
  - Probar en Safari (últimas 2 versiones)
  - Probar en Edge (últimas 2 versiones)
  - Verificar fallbacks de backdrop-filter
  - _Requisitos: 6.1_
