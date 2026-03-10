import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

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

/** WEB: renders a scrollable div with mapped items */
export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  className,
  contentContainerClassName,
  horizontal,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
}: FlatListProps<T>) {
  return (
    <div className={cn(horizontal ? 'overflow-x-auto flex flex-row' : 'overflow-y-auto flex flex-col', className)}>
      <div className={cn('flex', horizontal ? 'flex-row' : 'flex-col', contentContainerClassName)}>
        {ListHeaderComponent}
        {data.length === 0
          ? ListEmptyComponent
          : data.map((item, index) => (
              <div key={keyExtractor(item, index)}>
                {renderItem({ item, index })}
                {ItemSeparatorComponent && index < data.length - 1 && <ItemSeparatorComponent />}
              </div>
            ))}
        {ListFooterComponent}
      </div>
    </div>
  );
}
