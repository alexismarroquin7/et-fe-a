import styled from "styled-components";

const StyledGrid = styled.div`
  width: ${({width, container, item}) => {
    let widthToUse = 'auto';
    
    if(width){
      widthToUse = width;
    } else if(container){
      widthToUse = '100%';
    } else if(item){
      widthToUse = 'auto';
    }

    return widthToUse;
  }};

  display: flex;

  flex-flow: ${({ff}) => {
    let ffToUse = 'row wrap';
    
    if(ff === 'row'){
      ffToUse = 'row wrap';
      
    } else if(ff === 'col'){
      ffToUse = 'column wrap';

    }

    return ffToUse;
  }};
  
  align-items: ${({ai}) => {
    let aiToUse = 'flex-start';
    
    if(ai){
      aiToUse = ai; 
    }

    return aiToUse;
  }};
  
  justify-content: ${({jc}) => {
    let jcToUse = 'flex-start';
    
    if(jc){
      jcToUse = jc; 
    }

    return jcToUse;
  }};
  
  border: ${({border}) => {
    let borderToUse = '0';
    
    if(border){
      borderToUse = border; 
    }

    return borderToUse;
  }};
  
  border-radius: ${({borderRadius}) => {
    let borderRadiusToUse = '0';
    
    if(borderRadius){
      borderRadiusToUse = borderRadius; 
    }

    return borderRadiusToUse;
  }};
  
  color: ${({color}) => {
    let colorToUse = 'black';
    
    if(color){
      colorToUse = color; 
    }

    return colorToUse;
  }};
  
  background-color: ${({bgColor}) => {
    let bgColorToUse = 'auto';
    
    if(bgColor){
      bgColorToUse = bgColor; 
    }

    return bgColorToUse;
  }};
  
  padding: ${({padding}) => {
    let paddingToUse = '0';
    
    if(padding){
      paddingToUse = padding; 
    }

    return paddingToUse;
  }};
  
  gap: ${({gap}) => {
    let gapToUse = '0';
    
    if(gap){
      gapToUse = gap; 
    }

    return gapToUse;
  }};
  
  height: ${({height}) => {
    let heightToUse = 'auto';
    
    if(height){
      heightToUse = height; 
    }

    return heightToUse;
  }};
  
  position: ${({position}) => {
    let positionToUse = 'auto';
    
    if(position){
      positionToUse = position; 
    }

    return positionToUse;
  }};
  
  top: ${({top}) => {
    let topToUse = 'auto';
    
    if(top){
      topToUse = top; 
    }

    return topToUse;
  }};
  
  bottom: ${({bottom}) => {
    let bottomToUse = 'auto';
    
    if(bottom){
      bottomToUse = bottom; 
    }

    return bottomToUse;
  }};
  
  left: ${({left}) => {
    let leftToUse = 'auto';
    
    if(left){
      leftToUse = left; 
    }

    return leftToUse;
  }};
  
  right: ${({right}) => {
    let rightToUse = 'auto';
    
    if(right){
      rightToUse = right; 
    }

    return rightToUse;
  }};
  
  z-index: ${({zIndex}) => {
    let zIndexToUse = 'auto';
    
    if(zIndex){
      zIndexToUse = zIndex; 
    }

    return zIndexToUse;
  }};
  
`

export const Grid = (props) => {
  return <StyledGrid
    {...props}
  >{props.children}</StyledGrid>
}