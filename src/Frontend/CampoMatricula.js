import React, { useState } from "react";

function CampoMatricula(props) {

  // Tenemos que manejar que ocurre cuando cambia el contenido del formulario.(el usuario escribe)
  const [input, setInput] = useState('');

  const manejarCambio = e => {
    // e.target.value => nos va a permitir extraer el valor del campo de texto que introdujo el usuario.
    setInput(e.target.value);
  }

  // Se recibe como argumento un evento, este valor nos va a permitir que la pagina
  // se vuelva a cargar cuando se envie el formulario.
  const manejarEnvio = e => {
    e.preventDefault(); //->Evita que se vuelva a carga la app al enviar el formulario.

    //! MODIFICAR de acuerdo a la informacion a mostrar de una matricula

    //•onSubmit -> Función que se pasará como parámetro mediante un prop. (el nombre es un estandar)
    props.onSubmit(input);
  }

  return (
    <>
      <h5>Matricula</h5>
      <form onSubmit={manejarEnvio} >
        <input
          type='text'
          placeholder='Ejemplo DBA-005'
          name='Texto'
          onChange={manejarCambio}
        />
        <br />
        <button>
          BUSCAR
        </button>
      </form>
    </>
  );
}

export default CampoMatricula;