import React from 'react';
import './UseState.css';

const SECURITY_CODE = 'paradigma';

function UseState({ name }){

   const [value, setValue] = React.useState('');
   const [error, setError] = React.useState(false);
   const [loading, setLoading] = React.useState(false);

   console.log(value);

   React.useEffect(() => {

      if(!!loading){
         setTimeout(() => {

            if(value === SECURITY_CODE){
               setError(false);
            } else {
               setError(true); 
            }
            setLoading(false);
         }, 3000);
      }
   }, [loading]);

   return (
         <>
            <h1>Eliminar {name}</h1>
            <p>Por favor, escribe el codigo de seguridad.</p>

            {!!error && (
               <p className='p-error'>Error: El codigo de seguridad es incorrecto.</p>
            )}
            {!!loading && (
               <p>Cargando...</p>
            )}

            <input 
               placeholder="Codigo de seguridad" 
               value={value}
               onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={() => {
               setLoading(true);
               setError(false);
            }}>
               Comprobar
            </button>
         </>
      );
}

export { UseState };