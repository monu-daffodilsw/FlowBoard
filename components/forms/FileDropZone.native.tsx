import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { Pressable } from '@/components/core/Pressable';
import { Attachment } from '@/types';
import { formatFileSize } from '@/utils/utils';

interface FileDropZoneProps {
  attachments: Attachment[];
  onAdd: (attachment: Attachment) => void;
  onRemove: (id: string) => void;
}

/** NATIVE: file picker placeholder (expo-document-picker not installed yet) */
export function FileDropZone({ attachments, onRemove }: FileDropZoneProps) {
  return (
    <View>
      <View className="border-2 border-dashed border-white/10 rounded-xl p-6 items-center">
        <Text className="text-white/30 text-sm text-center">
          File attachments available on web
        </Text>
      </View>
      {attachments.length > 0 && (
        <View className="mt-3 gap-2">
          {attachments.map(a => (
            <View key={a.id} className="flex-row items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10">
              <View className="flex-1">
                <Text className="text-sm text-white/80">{a.name}</Text>
                <Text className="text-xs text-white/30">{formatFileSize(a.size)}</Text>
              </View>
              <Pressable onPress={() => onRemove(a.id)} className="p-2">
                <Text className="text-xs text-red-400">✕</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
