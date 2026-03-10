import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
import { ReactNode } from 'react';

export interface FlatListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  contentContainerClassName?: string;
  horizontal?: boolean;
  ListEmptyComponent?: ReactNode;
  ListHeaderComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  ItemSeparatorComponent?: () => ReactNode;
}

/** NATIVE: React Native FlatList */
export function FlatList<T>({ renderItem, ...props }: FlatListProps<T>) {
  return (
    <RNFlatList
      renderItem={({ item, index }) => renderItem({ item, index }) as any}
      {...(props as any)}
    />
  );
}
