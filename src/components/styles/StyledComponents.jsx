import { styled } from '@mui/material';
import { Link as LinkComponent } from 'react-router-dom';
import {
  BLACK_COLOR,
  GRAY_COLOR,
  POWDER_BLUE_COLOR,
} from '../../constants/color';
export const VisuallyHidden = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #0000001a;
  }
`;

export const InputBox = styled('input')`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 7px;
  background-color: ${GRAY_COLOR};
`;

export const DashboardLink = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: ${BLACK_COLOR};
  &:hover: {
    color: ${POWDER_BLUE_COLOR};
  }
`;

export const SearchField = styled('input')`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
`;

export const CurvedButton = styled('button')`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
