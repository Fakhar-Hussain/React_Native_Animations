import React, { useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Animated, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  FlatList, 
  Image 
} from 'react-native'

const { width, height } = Dimensions.get('screen');
const BG = ['#333', '#c48974', '#ffabc3', '#B98EFF'];

const dataItem = [
  {
    Key: 0,
    image: { uri: "https://o.remove.bg/downloads/648328db-6cab-4649-9541-d3795eb068db/kisspng-perfume-eau-de-toilette-eau-sauvage-versace-armani-5b2c64b13aebf4.8218721415296360172414-removebg-preview.png" },
    Title: 'Perfume is the invisible, unforgettable, fashionable accessory.'
  },
  {
    Key: 1,
    image: { uri: "https://o.remove.bg/downloads/5ebabbfa-e25e-4c25-8d40-ee7566886754/kisspng-tote-bag-handbag-messenger-bags-leather-fashion-bags-5b0f60a6b22669.0496842215277344387297-removebg-preview.png" },
    Title: 'A handbag is only one item to be worn with a complete outfit.'
  },
  {
    Key: 2,
    image: { uri: "https://o.remove.bg/downloads/5a261bff-ffc6-4b22-8e6e-0909bd69c1d1/watch-1330910__340-removebg-preview.png" },
    Title: 'A watch will make you feel confident and build your confidence.'
  },
  {
    Key: 3,
    image: { uri: "https://o.remove.bg/downloads/51dfe59c-c1d7-44c2-a30a-c1257c781970/243-2436770_school-water-bottle-png-transparent-png-removebg-preview.png" },
    Title: 'People who carry reusable water bottles are more likely to stay hydrated'
  }
]



const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row', }} >
      {
        dataItem.map((item, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp'
          })
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.8, 0.6],
            extrapolate: 'clamp'
          })

          return (
            <Animated.View
              key={index}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
                margin: 8,
                opacity,
                transform: [{ scale: scale }]
              }}
            />
          )
        })
      }
    </View>
  )
}


const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: BG.map((item, index) => index * width),
    outputRange: BG.map((item) => item)
  })

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
  )
}


const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)
  ), 1)

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '10deg', '35deg'],
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  })

  return (
    <Animated.View
      style={{
        width: height,
        height: width * 1.8,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate: rotate
          },
          {
            translateX: translateX
          }
        ]
      }}
    >

    </Animated.View>
  )
}


const SkipBtn = () => {

  return (
    <Animated.View style={{alignSelf: 'flex-end'}} >
      <TouchableOpacity
        onPress={() => console.log('Skip Button')}
        style={{
          width: 90,
          height: 40,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'flex-end',
          bottom: 40,
          elevation: 6,
          right: 10          
        }} >
        <Text style={{
            fontSize: 18,
            fontWeight: '800',
            color: '#333'
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}


export default function ScrollSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.container]} >
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />


      <FlatList
        data={dataItem}
        keyExtractor={(item) => item.Key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }} >

              <View style={{ flex: 0.7, justifyContent: "center" }} >
                <Image
                  source={(item.image)}
                  style={{
                    width: width,
                    height: height / 2.5,
                    resizeMode: 'contain'
                  }}
                />
              </View>

              <View style={{ flex: 0.3, top: 80 }} >
                <Text style={{ fontWeight: '400', fontSize: 22, color: '#fff' }} >
                  {item.Title}
                </Text>
              </View>

            </View>
          )
        }}
      />
      <Indicator style={{}} scrollX={scrollX} />

      <SkipBtn />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
})