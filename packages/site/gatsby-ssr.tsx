/* eslint-disable @typescript-eslint/naming-convention */
import LayoutComponent from './wrapPageElement';

export const wrapPageElement = LayoutComponent;

const HtmlAttributes = {
  lang: 'en',
};

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes(HtmlAttributes);
};
