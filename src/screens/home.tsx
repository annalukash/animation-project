import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { IRoute, routeList, RootStackParamList } from '../App';
import Button from '../components/button/button';
import Screens from '../interfaces/enums/Screens';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

type Props = NativeStackScreenProps<RootStackParamList, Screens.HOME>;

const Home = (props: Props) => {
  const { navigation } = props;

  const onNavigate = (route: Screens): void => {
    navigation.navigate(route);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.inner}>
        {routeList.map((routeItem: IRoute) => (
          <Button key={routeItem.name} title={routeItem.name} onPress={() => onNavigate(routeItem.name)} />
        ))}
      </View>
    </View>
  );
};

export default Home;