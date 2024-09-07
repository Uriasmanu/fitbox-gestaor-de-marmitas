import PropTypes from 'prop-types';
import { useState, useContext, createContext } from 'react';

// Contexto para gerenciar o estado de edição e ingrediente atual

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

// Hook personalizado para usar o contexto de ingredientes
export const useIngredient = () => {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error('useIngredient must be used within an IngredientProvider');
    }
    return context;
};

IngredientProvider.propTypes = {
    children: PropTypes.node.isRequired,
};