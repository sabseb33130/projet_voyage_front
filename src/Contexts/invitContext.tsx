import { ReactElement, createContext, useState } from 'react';
import { invit } from '../Types/photos';
import { invitDefault } from '../constant/invitationDefault';

interface InvitContextProps {
    children: ReactElement;
}
export interface InvitContextInterface {
    invit: { id: string };
    setInvit: (value: invit) => void;
}
export const InvitContext = createContext<InvitContextInterface>({
    invit: invitDefault,
    setInvit: (invit: invit) => {},
});
export const InvitContextProvider = ({ children }: InvitContextProps) => {
    const [invit, setInvit] = useState<invit>(invitDefault);
    const handleInvit = (invit: invit) => {
        setInvit(invit);
    };
    const contextValue = {
        invit: invit,
        setInvit: handleInvit,
    };
    return (
        <InvitContext.Provider value={contextValue}>
            {children}
        </InvitContext.Provider>
    );
};
