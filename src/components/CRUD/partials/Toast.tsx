import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  const createNotification = (type: string) => {
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message');
          break;
        case 'success':
          toast.success('Success');
          break;
        case 'warning':
          toast.warning('Warning message');
          break;
        case 'error':
          toast.error('Error message');
          break;
      }
    };
  };

  return (
    <div>
      {/* <button className='btn btn-success'
        onClick={createNotification('success')}>Success
      </button> */}
      {/* <hr />
      <button className='btn btn-info'
        onClick={createNotification('info')}>Info
      </button>
      <hr />
      <button className='btn btn-warning'
        onClick={createNotification('warning')}>Warning
      </button>
      <hr />
      <button className='btn btn-danger'
        onClick={createNotification('error')}>Error
      </button> */}
      <ToastContainer />
    </div>
  )
}