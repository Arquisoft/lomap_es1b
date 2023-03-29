import { createContext } from 'react';
import { Dispatch, useReducer } from "react";
import { IPMarker } from "../shared/SharedTypes";

export enum Types {
    ADD_MARKER = 'ADD_MARKER',
    SET_MARKER = 'SET_MARKER'
}

type MarkerActions = {
    type: Types.ADD_MARKER;
    payload: {
        marker: IPMarker;
    };
} | {
    type: Types.SET_MARKER;
    payload: {
        markers: IPMarker[];
    }
}

export const MarkerContext = createContext<{ state: IPMarker[], dispatch: Dispatch<MarkerActions> }>({ state: [], dispatch: () => null })

export const markerReducer = (state: IPMarker[], action: MarkerActions): IPMarker[] => {
    switch (action.type) {
        case Types.SET_MARKER:
            return action.payload.markers
        case Types.ADD_MARKER:
            return [action.payload.marker, ...state]
        default:
            return state
    }
}

export const MarkerContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(markerReducer, []);

    return (
        <MarkerContext.Provider value={{ state, dispatch }}>
            {children}
        </MarkerContext.Provider>
    )
}