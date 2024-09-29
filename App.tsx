import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Page} from './components';
import {useSharedValue} from 'react-native-reanimated';
import {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
const data = [
  {
    key: '1',
    name: 'BANANA',
    images: ['bannana', 'bannana1'],
    colors: ['#f8e68e', '#eaba41'],
  },

  {
    key: '2',
    name: 'GREENAPPLE',
    images: ['greenapple', 'greenapple1'],
    colors: ['#c5f095', '#71b609'],
  },
  {
    key: '3',
    name: 'STRAWBERRY',
    images: ['strawberry', 'strawberry1'],
    colors: ['#e293ab', '#eb3e77'],
  },
  {
    key: '4',
    name: 'CARAMEL',
    images: ['caramel', 'caramel1'],
    colors: ['#edc68c', '#ec9a17'],
  },
];

const App = () => {
  const translateX = useSharedValue(0);
  const [findex, setFindex] = useState(3);
  const scrollRef = useRef(null);

  const scrollHandler = (event: any) => {
    translateX.value = event.nativeEvent.contentOffset.x;
  };
  const scrollToIndex = (index: any) => {
    setFindex(index);
    scrollRef.current?.scrollTo({x: index * width, animated: true});
  };

  const onMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setFindex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'default'} />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <Page
            key={item.key}
            item={item}
            translateX={translateX}
            index={index}
          />
        ))}
      </ScrollView>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (findex > 0) {
              scrollToIndex(findex - 1);
            }
          }}>
          <Ionicons
            name="chevron-left"
            size={20}
            color={data[findex].colors[0]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (findex < data.length - 1) {
              scrollToIndex(findex + 1);
            }
          }}>
          <Ionicons
            name="chevron-right"
            size={20}
            color={data[findex].colors[0]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    position: 'absolute',
    bottom: 40,
    display: 'flex',
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
