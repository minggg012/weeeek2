import {Text, StyleSheet, Pressable, TouchableHighlight } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPress, type="PRIMARY", bgColor, fgColor}) => {
  return (
    <TouchableHighlight
        onPress={onPress} 
        style={[
          styles.container,
          styles[`container_${type}`], 
          bgColor ? {backgroundColor: bgColor} : {}
        ]}>
      <Text
        style={[
          styles.text, 
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {}
          ]}>
            {text}
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: "100%",
        height: 50,
        maxWidth: 500,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',

        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    container_PRIMARY: {
      backgroundColor: "#e1b1b1"
    },
    container_TERTIARY: {
      backgroundColor: '#b1b1c1'
    },
    text_TERTIARY: {
        color: 'black'
    },
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17
    }
})

export default CustomButton