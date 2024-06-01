import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          toast.error(error.data.message);
        }
      }
    });
  }, [errors]);
};

const useMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mutate] = mutationHook();

  const excuteMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || 'Updating data...');

    try {
      const res = await mutate(...args);
      if (res.data) {
        toast.success(res.data.message || 'data successfully updated', {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(
          res.error.data.message || 'data uploading failure Please try again.',
          {
            id: toastId,
          }
        );
      }
    } catch (err) {
      console.log(err.message);
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return { excuteMutation, isLoading, data };
};

const useSocketEvent = (socket, handlers) => {
  useEffect(()=>{
    Object.entries(handlers).forEach(([event, handler])=>{
      socket.on(event, handler);
    })
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers])
}

export { useErrors, useMutation, useSocketEvent };
