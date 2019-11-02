import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rigthActions: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    // flex: 1,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
});

export const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
        Arquivar
      </Animated.Text>
    </View>
  );
};

const RigthActions = ({progress, dragX, onPress}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rigthActions}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          Deletar
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const ListItem = ({text, onSwipeFromLeft, onRightPress, itemStyles}) => {
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={(progress, dragX) => (
        <RigthActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}>
      <Animated.View style={itemStyles}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </Swipeable>
  );
};

export default ListItem;
