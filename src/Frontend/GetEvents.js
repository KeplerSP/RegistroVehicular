export default async function getEvents(contrato, matricula) {
  //* Primero revisar con UpdateMatricula, sino encontramos nada entonces pasamos e NewMatricula
  return getMatriculaInfo(contrato, matricula)
}

async function getMatriculaInfo(contrato, matricula) {

  const data = ["", "", "", "", false, "", []];

  let encontrada = false;
  let posicion;
  const eventFilter = contrato.filters.UpdateMatricula();
  const events = await contrato.queryFilter(eventFilter);
  /// 'events' recoge todas la coincidencias con el evento "UpdateMatricula()"

  // Recorrer todos los eventos de UpdateMatricula traidos en 'events'
  events.forEach(function (elemento, indice, array) {
    if (matricula == elemento.args[0]) {
      encontrada = true;
      /// Almacenamos la posición del último evento emitido que cooincida con la matricula buscada
      posicion = indice;
    }
  })

  if (encontrada) {
    //* Si la matricula fue encontrada en UpdateMatricula, pasaremos a capturar sus valores
    let prueba = (events[posicion].args)[1]; /// -> Accede al array dentro de args
    for (let index = 0; index < prueba.length; index++) {
      const element = prueba[index];
      /// Entramos al arreglo de infracciones y obtenemos su elementos individuales
      if (index == 6) {
        for (let i = 0; i < element.length; i++) {
          data[6].push({ nombre: element[i][0], fecha: element[i][1] })
        }
      } else {
        /// Almacenaremos: nombre - emision - modelo - matricula - vigencia
        data[index] = element;
      }
    }

  } else {
    //* De lo contrario pasaremos a buscar en NewMatricula
    let eventFilter = contrato.filters.NewMatricula();
    let events = await contrato.queryFilter(eventFilter);
    // Recorrer todos los eventos de NewMatricula traidos en 'events'
    events.forEach(function (elemento, indice, array) {
      if (matricula == elemento.args[0]) {
        encontrada = true;
        /// Almacenamos la posición del último evento emitido que cooincida con la matricula buscada
        posicion = indice;
      }
    })

    if (encontrada) {
      let prueba = (events[posicion].args)[1]; /// -> Accede al array dentro de args

      for (let index = 0; index < prueba.length; index++) {
        const element = prueba[index];
        /// Al ser un evento de NewMatricula no es necesario capturar su array de infracciones
        if (index != 6) {
          /// Almacenaremos: nombre - emision - modelo - matricula - vigencia
          data[index] = element;
        }
      }
    }
  }

  return data;
}