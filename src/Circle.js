import Svg, {Path} from 'react-native-svg';

import React from 'react';
import {View, StyleSheet} from 'react-native';



export default function Circle() {
    function slice() {
        let slices = [];
      //option 1  Equal size pieces
        slices.push({percent: 0.15, color: 'blue', id:"1", image: "stave.png"});
        slices.push({percent: 0.15, color: 'red', id:"2"});
        slices.push({percent: 0.17, color: 'green', id:"3"});
        slices.push({percent: 0.17, color: 'yellow', id:"4"});
        slices.push({percent: 0.14, color: 'purple', id:"5"});
        slices.push({percent: 0.14, color: 'grey', id:"6"});
        slices.push({percent: 0.14, color: 'black', id:"7"});
    
        //option 2  Different size pieces
        // const numberOfSlice = 6; //number for slice
    
        // const colorArr = ['red', 'green', 'yellow', 'blue']; //color the slice
        // for (let i = 0; i < numberOfSlice; i++) {
        //   slices.push({percent: 1 / numberOfSlice, color: colorArr[i] || 'gray'});
        // }
    
        let cumulativePercent = 0;
    
        function getCoordinatesForPercent(percent) {
          const x = Math.cos(2 * Math.PI * percent);
          const y = Math.sin(2 * Math.PI * percent);
          return [x, y];
        }
    
        let arr = [];
        arr = slices.map(slice => {
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += slice.percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
          const pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            'L 0 0', // Line
          ].join(' ');
          return <Path d={pathData} fill={slice.color} key={pathData} />;
        });
        return arr;
      }
    
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Svg
          height="80%"
          width="80%"
          viewBox="-1 -1 2 2"
          style={{transform: [{rotate: '-90deg'}]}}>
          {slice()}
        </Svg>
      </View>
    );
}
