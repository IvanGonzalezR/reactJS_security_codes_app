import React from 'react';
import './UseState.css';

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
   const [state, setState] = React.useState({
      value: '',
      error: false,
      loading: false,
      deleted: false,
      confirmed: false,
   });

   const onConfirmed = () => {
      setState({
         ...state,
            loading: false,
            error: false,
            confirmed: true,
      });
   };

   const onError = () => {
      setState({
         ...state,
         error: true,
         loading: false
      }); 
   };

   const onWrite = (newValue) => {
      setState({
         ...state,
         value: newValue
      });
   }

   const onCheck = () => {
      setState({
         ...state,
         loading: true, 
         error: false
      });
   };

   const onDelete = () => {
      setState({
         ...state,
         deleted: true
      });
   };

   const onReset = () => {
      setState({
         ...state,
         deleted: false,
         confirmed: false,
         value: '',
      });
   };

   React.useEffect(() => {

      if(!!state.loading){
         setTimeout(() => {

            if(state.value === SECURITY_CODE){
               onConfirmed();
            } else {
               onError();
            }
         }, 3000);
      }
   }, [state.loading]);

   if(!state.deleted && !state.confirmed){
      return (
         <>
            <h1>Eliminar {name}</h1>
            <p>Por favor, escribe el codigo de seguridad.</p>

            {!!state.error && (
               <p className='p-error'>Error: El codigo de seguridad es incorrecto.</p>
            )}
            {!!state.loading && (
               <p>Cargando...</p>
            )}

            <input 
               placeholder="Codigo de seguridad" 
               value={state.value}
               onChange={(event) => onWrite(event.target.value)}
            />
            <button onClick={() => {
               onCheck();
            }}>
               Comprobar
            </button>
         </>
      );
   } else if(!!state.confirmed && !state.deleted){
      return(
         <>
            <h1>¿Estas seguro de que quieres eliminar {name}?</h1>
            <button
               onClick={() => {
                  onReset();
               }}>
                  No, volver
            </button>
            <button 
               className='btn-delete'
               onClick={() => {
                  onDelete();
               }}>
                  Si, eliminar
            </button>
         </>
      );
   } else {
      return(
         <>
            <h1>Se ha eliminado {name}</h1>
            <button 
               onClick={() => {
                  onReset();
               }}>
               Volver atras
            </button>
         </>
      );
   }

   
}

export { UseState };