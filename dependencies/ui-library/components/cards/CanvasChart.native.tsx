import { View } from '../../core/View';
import { Text } from '../../core/Text';

interface CanvasChartProps {
  data: { label: string; value: number; color: string }[];
  title?: string;
}

/** NATIVE: simple text-based chart (canvas not available on native) */
export function CanvasChart({ data, title = 'Chart' }: CanvasChartProps) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <View className="p-5 rounded-xl border border-white/10 bg-white/5">
      <Text className="text-white/40 text-xs uppercase tracking-wider mb-3">{title}</Text>
      <View className="gap-2">
        {data.map(item => (
          <View key={item.label} className="flex-row items-center gap-2">
            <Text className="text-white/50 text-xs w-20">{item.label}</Text>
            <View className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
              />
            </View>
            <Text className="text-white/70 text-xs w-6 text-right">{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
