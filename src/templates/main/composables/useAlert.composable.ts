import { AlertPosition } from '@/shared/components/alert/alert-position.enum';

export default function useAlert() {
  const alert: {
    show: boolean,
    message?: string,
    newClass?: string,
    position?: string
  } = {
    show: false,
    newClass: 'bg-danger text-white',
    position: AlertPosition.BOTTOM,
  };


  const setMessage = (message: string): void => {
    alert.message = message;
  }

  const showAlert = (): void => {
    alert.show = !alert.show;
  }

  return {
    alert,
    setMessage,
    showAlert,
  }
}