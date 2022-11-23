import { ReactElement, useEffect } from 'react';
import CodoPlayer from './../../../vendor/CodoPlayerPro/CodoPlayer';
import { SetupFormProps } from '../../forms/SetupForm/types';

interface Props {
  configuration: SetupFormProps;
}

export const Player = ({ configuration }: Props): ReactElement => {
  const { settings, media } = configuration;

  useEffect(() => {
    const player = CodoPlayer(media, settings, '#player');
    return () => {
      player.destroy();
    };
  }, [media, settings]);

  return <div id="player" />;
};
