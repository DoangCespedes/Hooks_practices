import { useCallback, useEffect, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';


export const CallbackHook = () => {

    const [counter, setCounter] = useState( 10 );

    const incrementFather = useCallback(
      //El value es el valor de increment(5) del ShowIncrement
      (value) => {
        // De esta manera solo se tomara el valor inicial del counter que en este caso es 10 y por ende siempre dara 11 la suma porque quedara memorizado
      // setCounter( counter + 1 );
        setCounter( (c) => c + value );
        //La c es el valor del counter
      //De esta manera si se sumara el nuevo valor del state 
      },
      [],
    );

    useEffect(() => {
      // incrementFather();
    }, [incrementFather])
    
    
    // const incrementFather = () => {
    //     setCounter( counter + 1);
    // }


    return (
        <>
            <h1>useCallback Hook: { counter } </h1>
            <hr />

            <ShowIncrement increment={ incrementFather } />
        </>
    )
}
