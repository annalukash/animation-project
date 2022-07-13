import React from 'react';
import { SafeAreaView } from 'react-native';
import { MARGIN } from './utils';
import SortableList from './sortable-list';
import TileItem from './tile-item';

interface ITile {
  id: string;
  color: string;
}

const tileList: ITile[] = [
  {
    id: 'google',
    color: '#7BCCB5',
  },
  {
    id: 'expo',
    color: '#F0FFF0',
  },
  {
    id: 'facebook',
    color: '#3EB489',
  },
  {
    id: 'reanimated',
    color: '#008B8B',
  },
  {
    id: 'github',
    color: '#93FFE8',
  },
  {
    id: 'rnnavigation',
    color: '#77BFC7',
  },
  {
    id: 'youtube',
    color: '#CCFFFF',
  },
  {
    id: 'twitter',
    color: '#EBF4FA',
  },
];

const DraggableSorting = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: MARGIN }}>
      <SortableList>
        {[...tileList, ...tileList].map((tileItem: ITile, index: number) => (
          <TileItem key={`${tileItem.id}-${index}`} id={`${tileItem.id}-${index}`} color={tileItem.color} onLongPress={() => true} />
        ))}
      </SortableList>
    </SafeAreaView>
  );
};

export default DraggableSorting;
