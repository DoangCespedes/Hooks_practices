

const initialState = [{
    id: 1,
    todo: 'Recolectar la piedra del Alma',
    done: false,
}];


const todoReducer = ( state = initialState, action = {} ) => {

    if ( action.type === '[TODO] add todo' ){
        return [ ...state, action.payload ];
    }

    return state;
}

let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'Recolectar la priedra del poder',
    done: false
}


const addTodoAction = {
    //El type seria un simple string que nos ayudara a identificar la accion
    type: '[TODO] add todo',
    //El payload seria la carga, es decir el nuevo estado de la accion
    payload: newTodo,
}


todos = todoReducer( todos, addTodoAction );


console.log({state: todos})





