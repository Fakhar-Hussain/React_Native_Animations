import React from 'react'
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native'

export default function RotatingBox() {
  
  const Position = new Animated.ValueXY({x:0,y:0})
  let Anim = () => {
    Animated.spring(Position, {
      toValue: {x: 230, y: 540},
      useNativeDriver: true,
      duration: 2000,
      speed: 0
    }).start()
  }
  const Rotate = Position.x.interpolate({
    inputRange: [0 , 100],
    outputRange: ['0deg' , '145deg']
  })
  
  return (
    <Animated.View style={[styles.container, ]}>
      <TouchableOpacity onPress={() => Anim()} style={[styles.boxView ,{transform: [{translateX: Position.x},{translateY: Position.y},{rotate: Rotate}]} ]}>
        <Text style={{fontWeight: 'bold' , fontSize: 24}} >
          BOX
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  boxView: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
})

















