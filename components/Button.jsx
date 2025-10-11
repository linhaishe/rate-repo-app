import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './styleComponent/Text';
import theme from './styleComponent/theme';

const styles = StyleSheet.create({
  defaultBtn: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    width: '70%',
  },
  defaultBtnText: {
    color: '#fff',
  },
  defaultBtnWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    gap: 30,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    width: '100%',
  },
});

export const Button = (props) => {
  return (
    <Pressable
      onPress={() => {
        props?.onPress();
      }}
      style={[styles?.defaultBtn, props?.buttonStyles]}
    >
      <Text
        style={[styles?.defaultBtnText, props?.textStyles]}
        fontWeights={'bold'}
      >
        {props?.children}
      </Text>
    </Pressable>
  );
};
