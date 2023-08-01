import { atom, useRecoilState } from 'recoil';

// Recoilの状態を作成
export const isMusicPlayingState = atom({
  key: 'isMusicPlaying',
  default: false,
});