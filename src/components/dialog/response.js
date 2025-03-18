import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const errorDialog = (msg) => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: 'Error!',
    textBody: msg,
    button: 'close',
  });
};

const errorToast = (msg) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: 'Error!',
    textBody: msg,
    button: 'close',
  });
};

const successDialog = (msg, onPressButton, header) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success!',
    textBody: msg,
    button: 'close',
    onPressButton: onPressButton,
  });
};
const successToast = (msg) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success!',
    textBody: msg,
    button: 'close',
  });
};

export { errorDialog, errorToast, successDialog, successToast };
