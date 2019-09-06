import React from 'react';
import Video, { VideoProperties } from 'react-native-video';
import styled from 'styled-components/native';
import { MediaEntity } from 'twitter-d';
import { VideoVariant } from 'twitter-d/types/video_variant';
import { find, pathOr, propEq, reduce } from 'ramda';
import { getPhotoUrl } from '@utils/helpers';

const StyledVideo = styled(Video)<{
  width: number;
  height: number;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
`;

enum VIDEO_QUALITY {
  HIGHEST,
  LOWEST,
  STREAM,
}

interface VideoPlayerProps extends Partial<VideoProperties> {
  media: MediaEntity;
  width: number;
  height: number;
  quality: VIDEO_QUALITY;
}

const getVariantMethod = (quality: VIDEO_QUALITY) => {
  switch (quality) {
    case VIDEO_QUALITY.STREAM:
      return find<VideoVariant>(
        propEq('content_type', 'application/x-mpegURL')
      );
    case VIDEO_QUALITY.HIGHEST:
      return reduce<VideoVariant, VideoVariant | null>((acc, elem) => {
        if (!elem.bitrate) {
          return acc;
        }
        if (!acc || !acc.bitrate) {
          return elem;
        }
        if (acc.bitrate < elem.bitrate) {
          return elem;
        }
        return acc;
      }, null);
    case VIDEO_QUALITY.LOWEST:
    default:
      return reduce<VideoVariant, VideoVariant | null>((acc, elem) => {
        if (!elem.bitrate) {
          return acc;
        }
        if (!acc || !acc.bitrate) {
          return elem;
        }
        if (elem.bitrate < acc.bitrate) {
          return elem;
        }
        return acc;
      }, null);
  }
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const getVariant = getVariantMethod(props.quality);
  const variant = getVariant(
    pathOr<VideoVariant[]>([], ['video_info', 'variants'])(props.media)
  );
  return (
    <StyledVideo
      source={{
        uri: variant ? variant.url : props.media.media_url_https,
      }}
      width={props.width}
      height={props.height}
      poster={getPhotoUrl(props.media, 'small')}
    />
  );
};

VideoPlayer.defaultProps = {
  quality: VIDEO_QUALITY.LOWEST,
};

export default VideoPlayer;
