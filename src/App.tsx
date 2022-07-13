import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/home';
import CircleSnake from './screens/circle-snake';
import Screens from './interfaces/enums/Screens';

export type RootStackParamList = {
  Home: undefined;
  CircleSnake: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface IRoute {
  name: Screens;
  component: () => JSX.Element;
}
export const routeList: IRoute[] = [
  { name: Screens.CircleSnake, component: CircleSnake },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.HOME}>
        <Stack.Screen name={Screens.HOME} component={Home} />
        {routeList.map((routeItem: IRoute) => (
          <Stack.Screen key={routeItem.name} name={routeItem.name} component={routeItem.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
