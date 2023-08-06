import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textStyles } from '../config/styles';
import Button from './Button';
import { PaystackPlan } from '../api/paystack';
import { formatNGN } from '../utils/helper';

type Prop = {
  plan: PaystackPlan;
  onPress: (plan: PaystackPlan) => void;
};

const PlanItem: React.FC<Prop> = ({ plan, onPress }) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{plan.name}</Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={style.price}>₦ {formatNGN(plan.amount / 100)}</Text>
        <Text style={style.interval}> / {plan.interval}</Text>
      </View>
      <Text style={style.description}>{plan.description}</Text>
      <Button
        onPress={() => onPress(plan)}
        buttonStyle={style.button}
        textStyle={style.buttonText}
        title="Get Started"
      />
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 49,
  },
  buttonText: {
    ...textStyles.body,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat_Semi_Bold',
  },
  container: {
    paddingHorizontal: 32,
    paddingVertical: 23,
    backgroundColor: '#0E4F73',
    borderRadius: 10,
  },
  description: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    ...textStyles.body,
    color: '#fff',
    fontFamily: 'Montserrat_Semi_Bold',
    marginBottom: 20,
  },
  price: {
    fontFamily: 'Montserrat_Bold',
    fontSize: 32,
    lineHeight: 39,
    color: '#fff',
  },
  interval: {
    fontFamily: 'Montserrat_Bold',
    lineHeight: 24,
    fontSize: 20,
    color: '#fff',
  },
});

export default PlanItem;
