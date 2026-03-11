import { ReactNode } from 'react';
import { Modal as RNModal } from 'react-native';
import { View } from '../../core/View';
import { Text } from '../../core/Text';
import { Pressable } from '../../core/Pressable';
import { ScrollView } from '../../core/ScrollView';
import { cn } from '../../utils/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

/** NATIVE: React Native Modal sheet */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <RNModal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/60 justify-end"
        onPress={onClose}
      >
        <Pressable
          className={cn('bg-[#0d1526] border-t border-white/10 rounded-t-2xl max-h-[90%]', className)}
          onPress={() => {}}
        >
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1 rounded-full bg-white/20" />
          </View>
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-white/10">
            <Text className="text-base font-semibold text-white">{title}</Text>
            <Pressable
              onPress={onClose}
              className="w-8 h-8 items-center justify-center rounded-lg bg-white/5"
            >
              <Text className="text-white/60 text-lg">✕</Text>
            </Pressable>
          </View>
          <ScrollView className="p-5">{children}</ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
