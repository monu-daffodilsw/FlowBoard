import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Pressable } from '@ultra-ui-library';
import { useRouter } from '@/router';

export default function NotFound() {
  const { navigate } = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-[#0a0f1e] px-4">
      <Text className="text-8xl font-bold text-indigo-500" style={{ fontFamily: 'Space Mono, monospace' }}>
        404
      </Text>
      <Text className="text-2xl font-bold text-white mt-4 mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
        Page Not Found
      </Text>
      <Text className="text-center text-white/50 mb-8">
        The page you're looking for doesn't exist.
      </Text>
      <Pressable
        onPress={() => navigate('dashboard')}
        className="px-6 py-3 bg-indigo-500 rounded-xl"
      >
        <Text className="text-white font-medium">Go to Dashboard</Text>
      </Pressable>
    </View>
  );
}
