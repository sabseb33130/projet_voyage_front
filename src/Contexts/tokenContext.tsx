import { ReactElement, createContext, useState } from 'react';

/* export const UserContext = React.createContext({
    user: {
        prenom: '',
        nom: '',
        pseudo: '',
        email: '',

        adresse_line1: '',
        adresse_line2: '',
        ville: '',
        codepostal: '',
        departement: '',
        album: [],
        photo: [],
    } as unknown as TUser,
    setUser: (value: TUser) => {},
}); */

/**
 * Définition de l'interface de nos props
 */
interface TokenContextProps {
    children: ReactElement;
}

/**
 * Définition de l'interface pour notre context
 */
export interface TokenContextInterface {
    access_token: string | null;
    onTokenChange: (token: string | null) => void;
}

/**
 * Initialisation de notre context avec une première valeur (l'objet)
 */
export const TokenContext = createContext<TokenContextInterface>({
    access_token: null,
    onTokenChange: (token: string | null) => {},
});

/**
 * Création de notre composant provider de context
 */
export const TokenContextProvider = ({ children }: TokenContextProps) => {
    /**
     * Mise en place de la logique interne de notre context
     * Cela permet de mettre à dispo une fonction pour mettre
     * à jour l'état de connection de notre utilisateur
     * et d'accéder au token via notre context
     */
    const [token, setToken] = useState<string | null>(null);

    const handleTokenChange = (token: string | null) => {
        setToken(token);
    };

    const contextValue = {
        access_token: token,
        onTokenChange: handleTokenChange,
    };

    return (
        <TokenContext.Provider value={contextValue}>
            {children}
        </TokenContext.Provider>
    );
};
