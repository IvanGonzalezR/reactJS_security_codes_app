import React from 'react';
// import './UseState.css';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }){

   // REDUCER
   const [state, dispatch] = React.useReducer(reducer, initialState);

   const onConfirmed = () => {
      dispatch({ type: actionTypes.confirmed });
   };

   const onError = () => {
      dispatch({ type: actionTypes.error });
   };

   const onWrite = (newValue) => {
      dispatch({ type: actionTypes.write, payload: newValue });
   }

   const onCheck = () => {
      dispatch({ type: actionTypes.check });
   };

   const onDelete = () => {
      dispatch({ type: actionTypes.delete });
   };

   const onReset = () => {
      dispatch({ type: actionTypes.reset });
   };

   React.useEffect(() => {

      if(!!state.loading){
         setTimeout(() => {

            if(state.value === SECURITY_CODE){
               onConfirmed();
            } else {
               onError();
            }
         }, 2000);
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
               onChange={(event) => 
                  onWrite(event.target.value)
                  // onWrite(event.target.value)
               }
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

const reducer = (state, action) => {
   if (reducerObject(state)[action.type]){
      return reducerObject(state, action.payload)[action.type];
   } else {
      return state;
   }
}

const initialState = {
   value: '',
   error: false,
   loading: false,
   deleted: false,
   confirmed: false,
}

const actionTypes = {
   error: 'ERROR',
   check: 'CHECK',
   confirmed: 'CONFIRMED',
   write: 'WRITE',
   delete: 'DELETE',
   reset: 'RESET',
}

const reducerObject = (state, payload) => ({
      [actionTypes.error]: {
         ...state,
         error: true,
         loading: false
      },
      [actionTypes.check]: {
         ...state,
         loading: true,
         error: false
      },
      [actionTypes.confirmed]: {
         ...state,
         loading: false,
         error: false,
         confirmed: true
      },
      [actionTypes.write]: {
         ...state,
         value: payload
      },
      [actionTypes.delete]: {
         ...state,
         deleted: true
      },
      [actionTypes.reset]: {
         ...state,
         deleted: false,
         confirmed: false,
         value: ''
      },
});



export { UseReducer };