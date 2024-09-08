import PropTypes from 'prop-types';
import { createContext, useContext, useState } from "react";

// Criando o contexto
const SidebarContext = createContext();

// Provider para o contexto da Sidebar
export const SidebarProvider = ({ children }) => {
  const [sidebarVisivel, setSidebarVisivel] = useState(false);
  
  const controleSidebar = () => setSidebarVisivel(!sidebarVisivel);

  return (
    <SidebarContext.Provider value={{ sidebarVisivel, controleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook customizado para usar o contexto da Sidebar
export const useSidebar = () => useContext(SidebarContext);
