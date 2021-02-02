/// <reference types="react" />
export interface CreateUserScreenProps {
    createUser: (id: string, email: string) => void;
}
export declare function CreateUserScreen({ createUser }: CreateUserScreenProps): JSX.Element;
