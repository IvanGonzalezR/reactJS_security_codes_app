import React from "react";
import { Loading } from "../Loading";

class ClassState extends React.Component {

   constructor(props){
      super(props);

      this.state = {
         error: false,
         loading: false,
      };
   }

   // UNSAFE_componentWillMount(){
   //    console.log('Component Will mount');
   // }

   // componentDidMount(){
   //    console.log('Component Did mount');
   // }

   componentDidUpdate(){
      console.log('Component Did Update');
      if(!!this.state.loading){
         setTimeout(() => {
            this.setState({loading: !this.state.loading});
         }, 3000);
      }
   }

   render() {
      return (
         <>
            <h1>Eliminar {this.props.name}</h1>
            <p>Por favor, escribe el codigo de seguridad.</p>

            {!!this.state.error && (
               <p>Error: El codigo de seguridad es incorrecto.</p>
            )}
            {!!this.state.loading && (
               <Loading />
            )}

            <input placeholder="Codigo de seguridad" />
            <button onClick={()=> this.setState({loading: true})} >Comprobar</button>
         </>
      );
   }
}

export { ClassState };