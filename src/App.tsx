import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screens from './interfaces/enums/Screens';
import Home from './screens/home';
import CircleSnake from './screens/circle-snake';
import DraggableSorting from './screens/draggable-sorting/draggable-sorting';

export type RootStackParamList = {
  Home: undefined;
  CircleSnake: undefined;
  DraggableSorting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface IRoute {
  name: Screens;
  component: () => JSX.Element;
  options?: object,
}
export const routeList: IRoute[] = [
  { name: Screens.CircleSnake, component: CircleSnake },
  { name: Screens.DraggableSorting, component: DraggableSorting },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.HOME}>
        <Stack.Screen name={Screens.HOME} component={Home} />
        {routeList.map((routeItem: IRoute) => (
          <Stack.Screen key={routeItem.name} name={routeItem.name} component={routeItem.component} options={routeItem.options} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
