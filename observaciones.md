Querida Elsa, 

Cuando me escribiste en la entrega de tu TP me esperaba algo diferente. Una web que no funcionara, imposible de navegar, llena de errores por todos lados. Fue una muy agradable sorpresa descubrir todo lo contrario, un trabajo que, si bien refleja la falta de tiempo, es funcional, se puede recorrer y tiene un código muy bueno. Me alegra mucho ver esta entrega, y confirmar que, si esto es lo que podes hacer sin tiempo... podes hacer cualquier cosa cuando tengas la motivacion y las horas de tu lado!

A nivel visual, obviamente tenes varios faltantes, pero me parece bien que hayas priorizado elcomportamiento por sobre el css.  El responsive no esta implementado y te diria que, de querer continuar mejorando este proyecto para publicar, tanto los estilos como el responsive deberia ser lo primero que encares. Pensa tambien que vamos a necesitar imagenes para las que no vienen de la API.

A nivel funcionalidades, veo que en general se cumple todo lo que pedimos y todo funciona aceptablemente. Se que este no era un trabajo facil, asi que no es poco. Algunas cositas que te podria comentar como prioritarias para arreglar es: ocultar el paginado en la seccion detalles (eventualmente incorporarlo de nuevo, pero esta vez con los comics o personajes que vengan en el detalle: eso para despues). El select deberia cambiar al elegir personajes, ya que no filtramos por "mas nuevos" y "mas antiguos" (en este caso con un hidden alcanza). Se deberian deshabilitar los botones de primera y anterior pagina en la pagina 0, y los de ultima y proxima en la ultima pagina. Con esas cosas creo que arreglas buena parte de los bugs que tiene tu web. 

Otra cosita a comentar es que en la descripcion en el detalle del comic estas asumiendo que vendrá la información que necesitas. Eso es un error, en las APIs en general, y en la de Marvel en particular. Notá que si falta la descripción terminamos viendo "descripción: null" en la web. Cuando trabajamos con APIs, o con información que haya escrito un usuario, *siempre* debemos programar a la defensiva: asumiendo que todo lo que puede salir mal, saldrá mal. Que no vendrá la información que esperamos, que vendrá vacía, o mal formateada.  En lugar de agregar simplemente `description` a la tarjeta, agregamos `description || "No hay descripcion disponible"`, asi nuestro usuario no ve un `null` o un campo vacio. Esto para la fecha, la descripcion, los creadores y la imagen. 

A nivel codigo, 

El HTML esta muy bien. Usas a la perfecccion las etiquetas semanticas, la accesibilidad esta bien cuidada y aprecio mucho que hayas incluido un form. Usas correctamente SASS, hay buena aplicacion de las variables, mixins y anidados, y tu codigo demuestra haber comprendido bien como usarlo. La arquitectura esta bien implementada. Solo falta aumentarlo, agregar mas variables (las que necesites) y dejarlo un poco mas prolijo (sin codigo comentado, etc)

El JS esta muy bien. Usan correctamente los conocimientos vistos a lo largo del modulo, el codigo en general es prolijo y bien funcionalizado. Noto muuuchos console.log que a esta altura, despues de 5 TPs donde lo menciono, no son disculpables. El JS esta algo desprolijo, muchos saltos de linea, mucho codigo comentado. 

Una vez que dejes todo mas o menos como lo queres, podemos pensar en mejorar el JS. Muchas funciones son muuuy similares, solo cambiando algunas cosas en caso de que sean comics o personajes. Te animo a que pruebes abstraer un poco el codigo asi no queda tan repetitivo: dividir todo en funciones mas pequeñas, tratar de reuitlizar codigo. 

Con respecto al github, me gusta mucho el README, pero a nivel formato se puede mejorar (lee un poquito sobre markdown para usar titulos, listas, etc). Fue una alegria ver los commits y branches y notar lo prolija que fuiste para trabajar. 

Tengo que ponerte una nota "no tan buena", a pesar de que tu codigo esta excelente, por las funcionalidades que faltan. Pero la calidad de tu codigo es altisima: tengo en claro que lo que te limita es la falta de tiempo y no de talento, ganas o capacidad. Felicitaciones nuevamente por este hermoso trabajo. 
 
  ✅ Respeta la consigna
  ❌ Respeta el diseño dado
  ✅ Respeta el funcionamiento
  ❌ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ✅ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅ Nombres de branchs adecuados

  ❌ Componentización de estilos (SASS)
  ❌  Funciones pequeñas // a veces
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ❌  Reutilización de lógica / funciones  // a veces 
  ✅ Commits con mensajes adecuados

Nota final: **7**
