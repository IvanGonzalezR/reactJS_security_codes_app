import React from "react";
import { Loading } from "../Loading";

const SECURITY_CODE = 'paradigma';
class ClassState extends React.Component {

   constructor(props){
      super(props);

      this.state = {
         value: '',
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
            if(this.state.value === SECURITY_CODE){
               this.setState({error: false, loading: false});
            }else{
               this.setState({error: true, loading: false});
            }
         }, 3000);
      }
   }

   render() {
      return (
         <>
            <h1>Eliminar {this.props.name}</h1>
            <p>Por favor, escribe el codigo de seguridad.</p>

            {(!!this.state.error && !this.state.loading) && (
               <p>Error: El codigo de seguridad es incorrecto.</p>
            )}
            {!!this.state.loading && (
               <Loading />
            )}

            <input
               value={this.state.value}
               placeholder="Codigo de seguridad" 
               onChange={(event) => this.setState({value: event.target.value})}
            />
            <button onClick={()=> this.setState({loading: true})} >Comprobar</button>
         </>
      );
   }
}

export { ClassState };