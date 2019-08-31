import styled from 'styled-components/native';

interface ImageProps {
  size: number;
}

export default styled.Image<ImageProps>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size / 2};
`;
