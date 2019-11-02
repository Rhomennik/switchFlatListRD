import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ANIMATION_DURATION = 250;
const ITEM_HEIGHT = 60;

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 1,
    }).start();
  }

  onRemove = () => {
    const {onRemove} = this.props;

    if (onRemove) {
      Animated.timing(this._animated, {
        toValue: 0,
        duration: ANIMATION_DURATION,
      }).start(() => onRemove());
    }
  };

  render() {
    const {text, onSwipeFromLeft} = this.props;

    const rowStyles = [
      {
        height: this._animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ITEM_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
      {opacity: this._animated},
    ];

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

    const RigthActions = ({progress, dragX}) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity onPress={this.onRemove}>
          <View style={styles.rigthActions}>
            <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
              Deletar
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Animated.View style={rowStyles}>
        <Swipeable
          renderLeftActions={LeftActions}
          onSwipeableLeftOpen={onSwipeFromLeft}
          renderRightActions={(progress, dragX) => (
            <RigthActions progress={progress} dragX={dragX} />
          )}>
          <View style={styles.item}>
            <Text style={styles.name}>{text}</Text>
          </View>
        </Swipeable>
      </Animated.View>
    );
  }
}

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
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
