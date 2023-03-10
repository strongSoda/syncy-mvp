import React from 'react';

import TemplateNameWrapper from './TemplateName.styles';

// declare interface ITemplateNameProps {}

const TemplateName: React.FC = () => (
  <TemplateNameWrapper data-testid="TemplateName">
    <span>TemplateName Component</span>
  </TemplateNameWrapper>
);

export default TemplateName;
