import { Component } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { textStyles } from '../../config/styles';

type Prop = {
  title: string;
  description: string;
  show: boolean;
  PositiveBtn: React.ReactElement;
  NegativeBtn: React.ReactElement;
  close: () => void;
};

const Prompt: React.FC<Prop> = ({
  show,
  close,
  title,
  description,
  PositiveBtn,
  NegativeBtn,
}) => {
  return (
    <Modal
      animationType="slide"
      style={{
        backgroundColor: '#000000',
        backfaceVisibility: 'visible',
      }}
      transparent
      visible={show}
      onRequestClose={close}
    >
      <Pressable style={style.container}>
        <View style={style.modalView}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.desc}>{description}</Text>
          <View style={style.btnContainer}>
            {NegativeBtn}
            {PositiveBtn}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 31,
    paddingVertical: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30,
  },
  title: {
    ...textStyles.heading3,
    marginBottom: 20,
  },
  desc: {
    ...textStyles.body,
    textAlign: 'center',
    fontFamily: 'Montserrat_Semi_Bold',
    marginBottom: 24,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});

export default Prompt;
