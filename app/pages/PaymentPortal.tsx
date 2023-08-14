import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingStackParamList } from '../navigation/SettingNavigator';
//@ts-ignore
import RNPaystack from 'react-native-paystack';
import Yup from 'yup';
import AppMaskedInput from '../components/AppMaskedInput';

type Prop = NativeStackScreenProps<
  SettingStackParamList,
  'Payment_Portal',
  'Setting'
>;

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
  cardNumber: Yup.string().required('Card Number is required'),
  cvc: Yup.string().required('CVV is required'),
});

const PaymentPortal: React.FC<Prop> = ({ route }) => {
  const chargeCard = () => {
    RNPaystack.chargeCard({
      cardNumber: '4123450131001381',
      expiryMonth: '10',
      expiryYear: '17',
      cvc: '883',
      email: 'chargeIOS@master.dev',
      amountInKobo: 150000,
      subAccount: 'ACCT_pz61jjjsslnx1d9',
    });
  };

  return (
    <View>{/* <AppMaskedInput mask={['/d', '/d', '/', '/d', '/d']} /> */}</View>
  );
};

export default PaymentPortal;

const styles = StyleSheet.create({});
