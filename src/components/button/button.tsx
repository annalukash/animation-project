import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IProps {
  title: string;
  onPress: () => void;
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(252, 3, 98, 0.5)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    color: '#000',
    maxHeight: 20,
  },
});

const Button = (props: IProps) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={Styles.container} activeOpacity={0.8} onPress={onPress}>
      <Text style={Styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
