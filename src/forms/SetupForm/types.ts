export type Media = {
  src: string;
  poster: string;
  title: string;
  engine: 'html5' | 'youtube';
};

export type ControlsProps = {
  show: 'auto' | 'always' | 'never';
  hide: number;
  overlay: boolean;
  play: boolean;
  seek: boolean;
  seeking: boolean;
  volume: boolean;
  fullscreen: boolean;
  title: boolean;
  time: boolean;
  loadingText: string;
};

export type SettingsProps = {
  responsive: boolean;
  width: number;
  height: number;
  volume: number;
  preload: boolean;
  autoplay: boolean;
  loop: boolean;
  playlist: boolean;
  controls: ControlsProps;
};

export type SetupFormProps = {
  settings: SettingsProps;
  media: Media[];
};
