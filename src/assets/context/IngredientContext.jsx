import PropTypes from 'prop-types';

import { createContext, useState, useContext } from 'react';

const IngredientContext = createContext();

export const IngredientProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);
    const [editIngredient, setEditIngredient] = useState(null);

    return (
        <IngredientContext.Provider value={{ editMode, setEditMode, editIngredient, setEditIngredient }}>
            {children}
        </IngredientContext.Provider>
    );
};
IngredientProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useIngredient = () => useContext(IngredientContext);
