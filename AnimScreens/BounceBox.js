import React from 'react'
import { StyleSheet, Text, View, Animated, PanResponder, TouchableOpacity } from 'react-native'

export default function BounceBox() {

  const Position = new Animated.ValueXY({x:0,y:0})
  
  const Pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {dx: Position.x ,dy: Position.y}
      ],
      {useNativeDriver: false}
    ),
    onPanResponderRelease: () => {
      Animated.spring(Position, {
        toValue: {x:0 , y:0},
        bounciness: 40,
        speed: 0,
        useNativeDriver: true,
      }).start()
    }
    
  })


  return (
    <Animated.View {...Pan.panHandlers} style={[styles.container, ]}>
      <TouchableOpacity style={[styles.boxView ,{transform: [{translateX: Position.x},{translateY: Position.y}]} ]}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  boxView: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

