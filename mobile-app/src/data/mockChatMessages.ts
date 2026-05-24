import type { ChatMessage } from '../types/cooking';

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'assistant',
    message: 'Mình đang ở bước xào cà chua. Hãy để lửa vừa để cà chua ra nước ngọt tự nhiên.',
    timestamp: '09:41',
  },
  {
    id: '2',
    sender: 'user',
    message: 'Nếu không có hành lá thì thay bằng gì?',
    timestamp: '09:42',
  },
  {
    id: '3',
    sender: 'assistant',
    message: 'Bạn có thể bỏ qua hành lá hoặc thay bằng ít hành tím phi để tăng mùi thơm.',
    timestamp: '09:42',
  },
];
