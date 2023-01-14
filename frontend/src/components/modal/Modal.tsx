import './modal.css';

type ModalProps = {
  children: React.ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ children, setShow }: ModalProps): JSX.Element {
  return (
    <div className='modal'>
      <div className='modal-main'>
        <div className='modal-children'>
          { children }
        </div>
      </div>
      <button
        className='modal-close'
        onClick={ () => setShow(false) }
      >
        X
      </button>
    </div>
  )
};
