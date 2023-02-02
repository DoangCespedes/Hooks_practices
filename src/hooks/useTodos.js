import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

// Aqui inicializamos el estado y lo guardamos en el local storage

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
  
    //al state le cambiamos el nombre a todos para identificarlo mas porque esta sera nuestra lista de tareas de la app
    //la parte del dispach solo se llama asi solo cuando tenemos un solo reducer , si tenemos mas es conveniente poner el nombre del dispach para identificar el reducer al cual queremos hacer uso 
    const [ todos, dispatch ] = useReducer( todoReducer, [], init );

    //Usamos el efecto para trabajar con el local storage y transformamos el string a JSON
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        // console.log(id)
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    return {
        todos,

        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=> !todo.done).length,

        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }

}
