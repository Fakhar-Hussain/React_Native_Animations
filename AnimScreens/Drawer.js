import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Animated, PanResponder, StatusBar, Dimensions ,Image, TouchableOpacity, FlatList,ImageBackground } from 'react-native'


export default function DrawerBox() {
  const {height, width} = Dimensions.get('window')

  const [showMenu , setShowMenu] = useState(false)
  const [selectedItem , setSelectedItem] = useState(0)
  
  const moveToRight = useRef(new Animated.Value(1)).current; 
  const scale = useRef(new Animated.Value(0)).current;
  const Position = new Animated.ValueXY({x:0, y:0})
  
  let SpringAnim = (index) => {
    setSelectedItem(index)
    Animation()
  }




  const Animation = () => {
    Animated.parallel([
      Animated.timing(moveToRight, {
        toValue: showMenu ? 0 : 150,
        useNativeDriver: true,
        duration: 300,  
      }),
      Animated.timing(scale, {
        useNativeDriver: true,
        toValue: showMenu ? 1 : 0.7,
        duration: 300,
      })
    ]).start()
    
    setShowMenu(!showMenu)
  }
  

  const dataItem = [
    { 
      title: 'Home',
      Uri : {uri: "https://www.pixelstalk.net/wp-content/uploads/2016/10/Cartoon-iPhone-HD-Backgrounds.jpg"}
    },
    { 
      title: 'Explore',
      Uri : {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9TIzBu7rYXvq2WW6LOTHkP64Bi5UMWw9PVba9XdsljlyX-Wmdd709HtVBk-fDCn0Cdk&usqp=CAU"}

    }, 
    { 
      title: 'Library',
      Uri : {uri: "https://wallpaperaccess.com/full/5354504.gif"}

    },
    { 
      title: 'Friends',
      Uri : {uri: "https://i.pinimg.com/736x/0b/a4/ec/0ba4ecbc9a043926922955bf052b4d3b.jpg"}

    },
    { 
      title: 'Chat', 
      Uri : {uri: "https://w0.peakpx.com/wallpaper/525/372/HD-wallpaper-detective-pikachu-yellow-smile-cute.jpg"}

    },
  ]
  
  return (
    // MAIN View
    <View style={styles.container}>



                {/* DRAWER VIEW */}
      <View style={styles.DrawerView}>
        <View style={styles.DrawerUserView}>
            <Image style={styles.DrawerUserImage} source={{uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png'}} /> 
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.DrawerUserName}>Fakhar Hussain </Text>
              <Text style={styles.DrawerUserID}> By React Native Coder </Text>
            </View>
        </View>

        <View style={{top: 50}}>
          
          <FlatList 
            data={dataItem} 
            renderItem={({item , index}) => {
              return(
                <View style={{}} >
                  <TouchableOpacity onPress={() => SpringAnim(index) } style={[styles.DrawerBtnsView, {backgroundColor: selectedItem == index ? "#fff" : "transparent" }]}>
                    <Text style={[styles.DrawerBtnsTxt , {color: selectedItem == index ? "#000" : "#efefef"}]}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )
            }} 
          />

        </View>

      </View>
          



            {/* Home ANIMATION VIEW */}
        <Animated.View style={[ styles.MainAnimationView, {transform: [{translateX: moveToRight},{scale: scale} ] , borderRadius: !showMenu ? 0 : 30 }]}>
            <View style={{flexDirection:'row',backgroundColor: 'transparent',height: 70}}>
                <TouchableOpacity onPress={() => Animation() } style={styles.DrawerImageView}>
                <Image source={{uri: 'https://assets.stickpng.com/images/588a6507d06f6719692a2d15.png'}} style={styles.DrawerImage} /> 
                </TouchableOpacity>
                <Text style={{top: 22,left: 16, fontSize: 22,fontWeight: 'bold',color: '#000'}} >{dataItem[selectedItem].title}</Text>
            </View>
            <ImageBackground source={dataItem[selectedItem].Uri} resizeMode='cover' style={{width: width, height: '92%' }}>
            </ImageBackground>
        </Animated.View>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MainAnimationView: {
    flex: 1,
    backgroundColor: '#fff',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  DrawerImage:{
    width: 30,
    height: 34,
  },
  DrawerImageView:{
    width: 30,
    height: 34, 
    marginTop: 20,
    marginLeft: 20 
  },
  

  DrawerView: {
    flex: 1,
    backgroundColor: '#666',
    padding: 20,
  },
  DrawerUserView: {
    flexDirection: 'row'
  },
  DrawerUserImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  DrawerUserName: {
    fontSize: 24,
    color: '#fff',
    top: 4,
    left: 12

  },
  DrawerUserID: {
    fontSize: 14,
    color: '#fff',
    top: 2,
    left: 12
  },


  DrawerBtnsView:{
    width: 150, 
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 26,
  },
  DrawerBtnsTxt:{
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },

})



