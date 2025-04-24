import { createContext } from "react";

interface ModalContitionType {
  isOpen: boolean;
  toggleModal: () => void;
}

const ModalContext = createContext<ModalContitionType | undefined>(undefined);
export default ModalContext;
