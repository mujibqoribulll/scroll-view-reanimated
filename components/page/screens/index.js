import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {RadialGradient} from 'react-native-gradients';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const images = {
  bannana: require('../../../src/assets/bannana.png'),
  bannana1: require('../../../src/assets/bannana1.png'),
  greenapple: require('../../../src/assets/greenapple.png'),
  greenapple1: require('../../../src/assets/greenapple1.png'),
  strawberry: require('../../../src/assets/strawberry.png'),
  strawberry1: require('../../../src/assets/strawberry1.png'),
  caramel: require('../../../src/assets/caramel.png'),
  caramel1: require('../../../src/assets/caramel1.png'),
};

const {height, width} = Dimensions.get('window');

// fruits positions
const positions = [
  {top: 10, left: 120, rotation: -115},
  {top: 130, left: 240, rotation: 30},
  {top: 45, left: 15, rotation: 45},
  {top: 340, left: 10, rotation: 10},
  {top: 576, left: 20, rotation: 75},
  {top: 490, left: 55, rotation: 90},
  {top: 510, left: 285, rotation: 105},
  {top: 150, left: 116, rotation: 15},
  {top: 530, left: 178, rotation: -75},
  {top: 690, left: 200, rotation: -50},
];

const Page = ({index, translateX, item}) => {
  console.log('item', JSON.stringify(item, null, 2));
  const colorList = [
    {offset: '10%', color: item?.colors?.[0], opacity: '1'},
    {offset: '100%', color: item?.colors?.[1], opacity: '0.8'},
  ];

  // input range according to translation X
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  // animated style for main donut image
  const rImgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX?.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP,
    );
    const rotate = interpolate(
      translateX?.value,
      inputRange,
      [-180, 0, 180],
      Extrapolate.CLAMP,
    );

    const translateXImg = interpolate(
      translateX?.value,
      inputRange,
      [width * 0 - 40, 0, width * 1.7 + 100],
      Extrapolate.CLAMP,
    );

    const translateYImg = interpolate(
      translateX?.value,
      inputRange,
      [height * 1.2, 0, -height * 1.2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      rotate,
      transform: [
        {translateX: translateXImg},
        {translateY: translateYImg},
        {rotate: `${rotate}deg`},
      ],
    };
  });

  // animated style for Name of donut flavor

  const rTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-0.5, 1, -0.5],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [-170, 0, 110],
      Extrapolate.CLAMP,
    );
    // const scaleY = interpolate(
    //     translateX.value,
    //     inputRange,
    //     [2.5, 2.5, 2.5],
    //     Extrapolate.CLAMP
    // );

    return {
      opacity,
      transform: [{translateY}, {scaleY: 2.9}],
    };
  });

  // animated style for fruits
  const rFruits = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [
        (index - 1) * width,
        index * width - 150,
        index * width,
        index * width + 150,
        (index + 1) * width,
      ],
      [0, 0, 1, 0, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });

  // animated style for gradient bg

  const rGradientStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      zIndex: -1,
    };
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[styles.gradientBg, rGradientStyle]}
        pointerEvents="none">
        <RadialGradient
          x="50%"
          y="50%"
          rx="50%"
          ry="25%"
          colorList={colorList}
        />
      </Animated.View>

      <View style={styles.fruitsContainer}>
        {Array(10)
          .fill(null)
          .map((_, i) => {
            const {top, left, rotation} = positions[i];
            return (
              <Animated.Image
                key={i}
                source={images[item.images[1]]}
                style={[
                  styles.fruits,
                  {
                    position: 'absolute',
                    top,
                    left,

                    transform: [{rotate: `${rotation}deg`}],
                  },
                  rFruits,
                ]}
              />
            );
          })}
      </View>

      <View style={[styles.textContainer]}>
        <Animated.Text style={[styles.title, rTextStyle]}>
          {item.name}
        </Animated.Text>
      </View>

      <Animated.Image
        source={images[item.images[0]]}
        style={[styles.img, rImgStyle]}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  img: {
    height: 250,
    width: 250,
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.34,
    position: 'absolute',
    textAlign: 'center',
    maxWidth: width * 0.9,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    position: 'absolute',
    top: 15,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 1,
  },
  fruitsContainer: {
    height: height,
    width: width,
  },
  fruits: {
    height: 60,
    width: 60,
  },
  gradientBg: {
    position: 'absolute',
    width: width,
    height: height,
  },
});
