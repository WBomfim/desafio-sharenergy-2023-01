import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  children: React.ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ children, setShow }: ModalProps): JSX.Element {
  return (
    <div
      className={`flex justify-center items-center translate-x-0 translate-y-0
        fixed top-0 left-0 w-full h-full bg-black bg-opacity-50`}
    >
      <div
        className={`flex flex-col justify-center items-center w-96 h-4/6
          bg-white rounded-lg`}
      >
        <button
        className="relative bottom-7 left-40 mt-5 mr-5"
        onClick={ () => setShow(false) }
        >
          <CloseIcon className='text-4xl' />
        </button>
        <div>
          { children }
        </div>
      </div>
    </div>
  )
};
