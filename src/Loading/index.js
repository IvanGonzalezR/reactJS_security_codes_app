import React from "react";

class Loading extends React.Component {

   componentWillUnmount(){
      console.log('Component Will Unmount');
   }

   render() {
      return (
         <>
            <p>Cargando...</p>
         </>
      );
   }
}

export { Loading };