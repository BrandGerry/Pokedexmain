const INITIAL_STATE = {
    name:"",
    api: null,
    onlypokemon: "",
    pokepage: 20
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_NAME":
            return{
                ...state,
                name: action.payload
            }
        case "SET_API":
            return{
                ...state,
                api: action.payload
            }
        case "SET_ONLYPOKEMON":
            return{
                ...state,
                onlypokemon: action.payload
            }
        case "SET_POKEPAGE":
            return{
                ...state,
                pokepage: action.payload
            }
        default:
            return state;
    }
    

}

export default reducer;