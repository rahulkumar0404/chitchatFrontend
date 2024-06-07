import { Skeleton, keyframes, styled } from '@mui/material';
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

export const RemoveImageButton = styled('button')`
  margin-left: 0.5rem;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: bold ';
  color:rgb(87,78,83)';
  border: 1px solid #9f7aea;
  padding: 0 0.75rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  '&:hover': {
    background-color: #9f7aea;
    color: #ffffff;
  }
`;

export const RemoveRejectedButton = styled('button')`
  margin-top: 7px;
  padding-top: 7px;
  text-transform: uppercase;
  font-weight: bold;
  font-weight: 500;
  border-radius: 25px;
  '&:hover': {
    background-color: #3490dc;
    color: #ffffff;
  }
`;

export const RemoveFileButton = styled('button')`
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #d1d5db;
  background-color: #d1d5db;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  transition: background-color 0.2s;
  '&:hover': {
    background-color: '#ffffff';
  }
`;

export const AcceptedFileUnorderedList = styled('ul')`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const DialogButtons = styled('button')`
  font: 400 13px/13px sans-serif, serif;
  width: 50%;
  height: 90%;
  border: none;
  text-align: center;
`;

const bounceAnimation = keyframes`
0% {transform: scale(1);}
50% {transform: scale(1.5);}
100% {transform: scale(1);}
`;
export const BouncingSkleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));
