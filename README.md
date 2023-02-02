/*-------------------------------  HOOKS  --------------------------------*/

/!----------------------------------------------------- NOTA ------------------------------------------------!/
En el presente Repositorio alojaremos distintos customHooks que nos serviran como plantillas para poder reutilizarlos en otra ocacion.

-----------------------------------------------------------------------------------------------------------------

Es de suma importancia el buen manejo de los hooks y saber su funcionamiento por esta razon quedan grabados los apuntes de la teoria del manejo de los hooks y sus practicas de uso.

------------------------------------------------------------------------------------------------------------------

( useState ) = manejamos el estado y su funcionamiento , declaramos en su estado inicial como queremos que se muestre por primera vez antes de hacer que cambie por medio de la funcion q crearemos para su seteo por medio de setSatate()

-----------------------------------------------------------------------------------------------------------------

( customHooks ) = Sabemos que los hooks son  funciones y hacerlas por separados en otro componente es lo mas recomendable , ya que estas tambien llevan su logica y dependen de otros hooks , es importante no mezclar los customHooks con la logica de negocio  con el componente que se va a usar , todo esto para que el customHook pueda ser reutilizable . los custom hooks se exportan y retornan la funcion que vamos a usar en el otro componente que vamos a usar por ejm:

import { useState } from "react"

export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue)

    const increment = (value = 1) =>{
        setCounter(counter + value)
    }

    return {
        counter,
        increment,
    }
}

podemos estudiar mas a fondo la logica de este custom hook en la carpeta hooks useCounter.
La inicializacion del valor de en el que usaremos en la funcion es de gran importacia manejarlo en la logica que sera llamado en el componente que lo importe por ejm:

import { useCounter } from '../hooks/useCounter'

const {counter, increment, reset, decrement} = useCounter()

<button onClick={() => increment(2)} className='btn btn-primary'>+1</button>

-----------------------------------------------------------------------------------------------------------------

( useEfect ) = Son efectos secundarios de nuestra funcion, esta es su estructura, se basa para el montado del estado de un componente y el desmontado de este mismo hasta cumplir su ciclo de vida.  ejm :

useEffect(()=> {
    cuerpo de la funcion
    {Montado} 

    return () => {
        funcion de limpieza
        {desMontado}
    }
}, [arreglo de dependencias])

-----------------------------------------------------------------------------------------------------------------

(useFetch) = es un customHook creado para hacer llamado a las apis, podemos usar como plantilla para algun otro proyecto , trabaja con un manejo de estado usando useState para el renderizado de la data , el loading y el manejo de rerrores ,tambien un useEffect con dependencia en la url para dispararse cada vez que la url sea cambiada .

----------------------------------------------------------------------------------------------------------------

(useRef) = Nos sirve como referencia para cualquier elemento que queremos seleccionar en nuestro DOM , este trabaja como un disparador de evento , usando nuestro estado solo que no renderiza solo hace referencia.

---------------------------------------------------------------------------------------------------------------

(useLayutEfect) = La firma es idéntica a useEffect, pero se dispara de forma síncrona después de todas las mutaciones de DOM. Use esto para leer el diseño del DOM y volver a renderizar de forma sincrónica. Las actualizaciones programadas dentro de useLayoutEffect se vaciarán sincrónicamente, antes de que el navegador tenga la oportunidad de pintar.

Prefiera el useEffect estándar cuando sea posible para evitar el bloqueo de actualizaciones visuales.

Consejo

Si estas migrando código de un componente de clase, recuerda que useLayoutEffect se activa en la misma fase que componentDidMount y componentDidUpdate. Sin embargo, recomendamos empezar con useEffect primero y solo intentar con useLayoutEffect si lo anterior causa problemas.

---------------------------------------------------------------------------------------------------------------

(React.memo) = si notamos depreciacion en nuestro app, React.memo se usa para una mejora en el desempeño en algunos casos memoizando el resultado. Esto significa que React omitirá renderizar el componente y reusará el último resultado renderizado. 

----------------------------------------------------------------------------------------------------------------

(useMemo) = solo volverá a calcular el valor memorizado cuando una de las dependencias haya cambiado. Esta optimización ayuda a evitar cálculos costosos en cada render.

En otras palabras , si tenemos un estado en nuestro componente que es muy pesado y por ende ya renderizo y no es necesario que vuelva a renderizar porque consume mucha memoria lo usamos , pero OJO es solo cuando el componente que no queremos que se redibuje sea estatico ya que se guardar en un espacio de memoria , para un componente dinamico no sirve.

----------------------------------------------------------------------------------------------------------------

(useCallback) = Es bueno usarlo cuando la funcion que manda a renderizar mi componente no se aloja en mi componente y de esta manera usando React.memo aun no me funciona .
useCallback devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado. Esto es útil cuando se transfieren callbacks a componentes hijos optimizados que dependen de la igualdad de referencia para evitar renders innecesarias 

--------------------------------------------------------------------------------------------------------------

NOTA = ES IMPORTANTE COMPRENDER QUE  useMemo , REact.memo y useCallback solo se usan cuando percibo una desapreciacion en mi applicacion y no quiero que se vuelva a dibujar todo mi componente , solo lo que necesito que se redibuje. Pero OJO es solo cuando el componente que no queremos que se redibuje sea estatico ya que se guardar en un espacio de memoria , para un componente dinamico no sirve.
 

---------------------------------------------------------------------------------------------------------------
Ademas del useId tambien podemos generar ids de la siguiente manera :
    id: new Date().getTime();
y tambien podemos hacerle una operacion para que nos de un numero diferente por ejm:
    id: new Date().getTime() * 3;

----------------------------------------------------------------------------------------------
useReducer = const [state, dispatch] = useReducer(reducer, initialArg, init);

useReducer a menudo es preferible a useState cuando se tiene una lógica compleja que involucra múltiples subvalores o cuando el próximo estado depende del anterior. useReducer además te permite optimizar el rendimiento para componentes que activan actualizaciones profundas, porque puedes pasar hacia abajo dispatch en lugar de callbacks.

EJM:
/*--- SE INICIALIZA EL ESTADO ---*/
const initialState = {count: 0};

/*--- DECLARAMOS EL REDUCER CON TODOS SUS CASOS DE USO ---*/
function reducer(state, action) {
    /*--- DECLARAMOS LA ACCION POR SU TIPO --*/
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

/*--- DECLARAMOS EL COMPONENTE ---*/
function Counter() {
    /*--- INVOCAMOS EL useReducer ---*/
    /*--- EL DISPATCH SETEA EL ESTADO ---*/
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button> /*--- LLAMAMOS A LA ACCION POR SU TIPO PARA DECLARARLE EL EVENTO---*/
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}