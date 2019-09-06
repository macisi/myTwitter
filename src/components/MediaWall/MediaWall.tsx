/**
 * Media Wall Component
 */
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { MediaEntity } from 'twitter-d';
import { getPhotoUrl } from '@utils/helpers';
import dimensionContext from '@utils/dimensionContext';
import { pathOr } from 'ramda';
import VideoPlayer from '@components/VideoPlayer';

const ViewWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const ImageMedia = styled.Image``;

interface MediaWallProps {
  data: MediaEntity[];
}

const getMediaSize = (size: number) => (width: number) => {
  const divide = size >= 3 ? 3 : size;
  return width / divide;
};
const getVideoSizeByAspect = (width: number) => (aspect: [number, number]) => {
  const height = (width * aspect[1]) / aspect[0];
  return {
    width,
    height,
  };
};
const getAspect = pathOr<[number, number]>(
  [1, 1],
  ['video_info', 'aspect_ratio']
);

const MediaWall = (props: MediaWallProps) => {
  const dimension = useContext(dimensionContext);
  const getSize = getMediaSize(props.data.length);
  const getVideoSize = getVideoSizeByAspect(dimension.width);
  const size = getSize(dimension.width);
  return (
    <ViewWrapper>
      {props.data.map(media => {
        if (media.type === 'video' || media.type === 'animated_gif') {
          return (
            <VideoPlayer
              key={media.id_str}
              media={media}
              muted
              {...getVideoSize(getAspect(media))}
            />
          );
        }
        return (
          <ImageMedia
            key={media.id_str}
            style={{ width: size, height: size }}
            source={{
              uri: getPhotoUrl(media, 'small'),
            }}
            resizeMode="cover"
          />
        );
      })}
    </ViewWrapper>
  );
};

MediaWall.defaultProps = {
  data: [],
};

export default MediaWall;
