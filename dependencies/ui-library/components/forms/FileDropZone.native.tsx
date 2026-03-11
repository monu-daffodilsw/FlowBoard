import { View } from '../../core/View';
import { Text } from '../../core/Text';

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  base64: string;
}

interface FileDropZoneProps {
  attachments: FileAttachment[];
  onAdd: (attachment: FileAttachment) => void;
  onRemove: (id: string) => void;
  dropText?: string;
  browseText?: string;
}

/** NATIVE: file drag-drop is not available — placeholder */
export function FileDropZone({ attachments, onAdd, onRemove }: FileDropZoneProps) {
  return (
    <View className="p-6 rounded-xl border border-dashed border-white/10 items-center justify-center">
      <Text className="text-white/30 text-sm text-center">File attachments are available on web</Text>
    </View>
  );
}
