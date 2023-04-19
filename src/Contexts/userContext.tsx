import { ReactElement, createContext, useState } from 'react';
import { TUser } from '../Types/users';
import { TAlbums } from '../Types/albums';
import { userDefault } from '../constant/userDefault';
interface UserContextProps {
    children: ReactElement;
}
export interface UserContextInterface {
    user: TUser;
    setUser: (value: TUser) => void;
}
export const UserContext = createContext<UserContextInterface>({
    user: userDefault,
    setUser: (value: TUser) => {},
});
export const UserContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<TUser | null>(null);
    const handleUserChange = (user: TUser | null) => {
        setUser(user);
    };
    const contextValue = {
        user: user,
        setUser: handleUserChange,
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
