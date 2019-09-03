/**
 * Media Wall Component
 */
import React from 'react';
import styled from 'styled-components/native';
import { MediaEntity } from 'twitter-d';
import { getPhotoUrl } from '@utils/helpers';

const ViewWrapper = styled.View``;
const ImageMedia = styled.Image``;

interface MediaWallProps {
  data: MediaEntity[];
}

const MediaWall = (props: MediaWallProps) => {
  return (
    <ViewWrapper>
      {props.data.map(media => {
        return (
          <ImageMedia
            key={media.id_str}
            style={{ width: media.sizes.small.w, height: media.sizes.small.h }}
            source={{
              uri: getPhotoUrl(media, 'small'),
            }}
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
