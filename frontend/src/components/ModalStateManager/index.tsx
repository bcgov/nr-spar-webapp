import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// This can go to a separate file
interface ModalManagerProps {
  renderLauncher: React.ElementType;
  children: React.ElementType;
}

const ModalStateManager = (
  {
    renderLauncher: LauncherContent,
    children: ModalContent
  }: ModalManagerProps
) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
          <ModalContent open={open} setOpen={setOpen} />,
          // @ts-ignore
          document.getElementById('root') ? document.getElementById('root') : document.body
        )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

export default ModalStateManager;
