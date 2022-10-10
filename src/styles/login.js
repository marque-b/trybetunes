import { Box, styled } from '@mui/material';

export const CustomContentLogin = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const CustomAssideLogin = styled('aside')`
  display: flex;
  width: 70%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const CustomFormLogin = styled(Box)`
  display: flex;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 20px;
`;

export const CustomImageLogin = styled('img')`
  animation: animate 10s linear infinite;

  @keyframes animate {
    0% {
      filter: hue-rotate(0deg);
      transform: translateX(0px);
    }  
    25% {
      transform: skewX(1deg) translateX(5px);      
    }
    75% {
      transform: skewX(-1deg) translateX(5px);
    }
    100% {
      filter: hue-rotate(360deg);
      transform: translateX(0px);
    }
  }

`;

export const CustomLogoImg = styled('img')`
  padding-bottom: 20px;
  width: 50%;
  border-radius: 50%;
`;
