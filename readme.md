# Un ejercicio para crear un CRUD simple, en vanilla js

## [Demo](https://jaumevibu.github.io/dreamOn-Crud/)

Iteracion 1

- [x] input para añadir nombre a un item

- [x] que se añada a un array

- [x] añadir boton a cada item de la lista renderizada para borrar el item

- [x] añadir boton a cada item de la lista renderizada para editar el item.

  - [x] poner el texto del item dentro del input
  - [x] cambiar texto boton add por update
  - [x] al clickar, modificar el elemento del array (si esta en blanco no hacer nada)

---

Iteracion 2

- [x] preguntar url imagen a cada item e insertar imagen en la lista
- [x] añadir persistencia usando localstorage

---

Iteracion 3

![sketch de la aplicación](./img/readme-sketch01.png)

- [x] añadir input filtro
- [x] refactorizar: el form de añadir este oculto hasta pulsar boton/icono
- [x] corregir nextId con persistencia...

---

After preview

- [x] item-card\_\_desc height no se deforme en funcion de lineas de texto -> mostrar solo primeros 21 caracteres + ..., pero guardar completo por si las
- [x] cambiar display usando toggle 'd-none'
- [x] validar que url sea una url
- [x] tanto titulo/nombre como url son required, validar que no esten en blanco
- [x] refactorizar css, componentes, vars, global...
- [x] refactorizar cambios de display con classlist toggle

---

Semana 06, nuevos objetivos:

- [ ] crear objetos CRUD siguiendo patron MVC
  - [ ] model
  - [ ] itemListView
  - [ ] controller
- [ ] realizar los cambios aplicando TDD
  - [x] Using Jest with jsdom env
