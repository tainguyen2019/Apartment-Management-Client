import {
  useRef,
  useState,
  useCallback,
  MouseEventHandler,
  KeyboardEventHandler,
  useEffect,
} from 'react';

const useDropdown = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const prevShowRef = useRef(show);

  const handleToggle = useCallback(() => setShow((prev) => !prev), []);

  const handleOpen = useCallback(() => setShow(true), []);

  const handleClose = useCallback<MouseEventHandler<any>>((e) => {
    if (anchorRef.current?.contains(e.target as Node)) {
      return;
    }
    setShow(false);
  }, []);

  const handleListKeyDown = useCallback<KeyboardEventHandler>((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setShow(false);
    }
  }, []);

  useEffect(() => {
    if (anchorRef.current && prevShowRef.current === true && show === false) {
      anchorRef.current.focus();
    }
  }, [show]);

  return {
    anchorRef,
    show,
    handleToggle,
    handleOpen,
    handleClose,
    handleListKeyDown,
  };
};

export default useDropdown;
