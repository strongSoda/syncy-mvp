import React, { useEffect, useState } from 'react';

import TemplateNameWrapper from './TemplateName.styles';

// declare interface ITemplateNameProps {}

const TemplateName: React.FC = () => {
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    setTemp(true);
  }, []);
  
  return (
  <TemplateNameWrapper data-testid="TemplateName">
    <span>TemplateName Component</span>
  </TemplateNameWrapper>
)};

export default TemplateName;
